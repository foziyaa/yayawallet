import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getTransactions, searchTransactions } from './services/api';

// Component Imports
import TransactionTable from './components/TransactionTable';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import KPICard from './components/KPICard';
import TransactionGraph from './components/TransactionGraph';
import TransactionDetailModal from './components/TransactionDetailModal';
import ThemeSwitcher from './components/ThemeSwitcher'; // The new theme switcher
import './App.css';

const CURRENT_USER_ACCOUNT = "Yaya Wallet Pii";
const CURRENT_USER_ACCOUNT_ALT = "YaYa PII SC";

function App() {
  // --- STATE MANAGEMENT ---

  // State for the dynamic, scrollable transaction table
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  
  // State for the permanent, stable overview (Graph & KPIs)
  const [allTransactionsForGraph, setAllTransactionsForGraph] = useState([]);
  const [overviewLoading, setOverviewLoading] = useState(true);

  // General application state
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // --- DATA FETCHING ---

  // 1. Fetches a large dataset ONCE for the main graph and KPIs.
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const [page1, page2, page3] = await Promise.all([ getTransactions(1), getTransactions(2), getTransactions(3) ]);
        const combinedData = [ ...(page1.data?.data || []), ...(page2.data?.data || []), ...(page3.data?.data || []) ];
        setAllTransactionsForGraph(combinedData);
      } catch (err) { 
        setError('Could not load overview data. Please check your connection and refresh.');
        console.error('Overview Fetch Error:', err);
      } finally { 
        setOverviewLoading(false); 
      }
    };
    fetchOverviewData();
  }, []); // Empty dependency array `[]` ensures this runs only once.

  // 2. Fetches data for the TABLE VIEW when page or search changes.
  const fetchTableData = useCallback(async () => {
    setTableLoading(true);
    try {
      let response = searchQuery ? await searchTransactions(searchQuery) : await getTransactions(currentPage);
      setTotalPages(response.data?.lastPage || 1);
      if (searchQuery) {
        setCurrentPage(1); // Reset to page 1 for a new search
      }
      setDisplayedTransactions(response.data?.data || []);
    } catch (err) {
      setError('Failed to fetch transaction details.');
      console.error('Table Fetch Error:', err);
      setDisplayedTransactions([]);
    } finally { 
      setTableLoading(false); 
    }
  }, [currentPage, searchQuery]);

  useEffect(() => { 
    fetchTableData(); 
  }, [fetchTableData]);

  // --- MEMOIZED CALCULATIONS ---
  // KPIs are calculated from the stable overview dataset.
  const kpiData = useMemo(() => {
    const data = allTransactionsForGraph;
    const initialKPIs = { total: data.length, incoming: 0, outgoing: 0 };
    return data.reduce((acc, tx) => {
      const amount = parseFloat(tx?.amount || 0);
      const isReceiverUser = tx?.receiver?.name === CURRENT_USER_ACCOUNT || tx?.receiver?.name === CURRENT_USER_ACCOUNT_ALT;
      const isTopUp = tx?.sender?.name === tx?.receiver?.name;
      if (isReceiverUser || isTopUp) { acc.incoming += amount; } else { acc.outgoing += amount; }
      return acc;
    }, initialKPIs);
  }, [allTransactionsForGraph]);

  // --- EVENT HANDLERS ---
  const handleSearch = (query) => { setSearchQuery(query); };
  const handlePageChange = (page) => { setCurrentPage(page); };

  return (
    <div className="app-shell">
      <div className="pro-dashboard-layout">
        <header className="main-header">
          <h1>Transactions</h1>
          <div className="header-controls">
            <SearchBar onSearch={handleSearch} />
            <ThemeSwitcher />
          </div>
        </header>
        
        <div className="kpi-container">
            <KPICard title="Total Transactions" value={overviewLoading ? '...' : kpiData.total} />
            <KPICard title="Total Incoming (ETB)" value={overviewLoading ? '...' : kpiData.incoming.toFixed(2)} className="kpi-incoming" />
            <KPICard title="Total Spending (ETB)" value={overviewLoading ? '...' : kpiData.outgoing.toFixed(2)} className="kpi-outgoing" />
        </div>
        
        <div className="main-content dashboard-card">
            <TransactionTable transactions={displayedTransactions} loading={tableLoading} onRowClick={setSelectedTransaction} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>

        <div className="sidebar dashboard-card">
          {overviewLoading ? 
            <div className="chart-placeholder"><h4>Loading Graph...</h4></div> : 
            <TransactionGraph transactions={allTransactionsForGraph} />
          }
        </div>
        
        {error && <p style={{ color: 'red', gridColumn: '1 / -1', textAlign: 'center' }}>{error}</p>}
        
        <TransactionDetailModal transaction={selectedTransaction} onClose={() => setSelectedTransaction(null)} />
      </div>
    </div>
  );
}

export default App;