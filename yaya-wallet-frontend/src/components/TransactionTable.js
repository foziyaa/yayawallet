import React from 'react';
import TransactionRow from './TransactionRow';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = () => (
  <tbody>
    {Array(10).fill(0).map((_, index) => (
      <tr key={index}><td colSpan="7"><Skeleton height={35} /></td></tr>
    ))}
  </tbody>
);

const TransactionTable = ({ transactions, loading, onRowClick }) => {
  return (
    <div className="table-scroll-container">
      <table>
        <thead>
          <tr>
            <th>Type</th><th>ID</th><th>Sender</th><th>Receiver</th><th>Amount</th><th>Cause</th><th>Date</th>
          </tr>
        </thead>
        {loading ? <SkeletonLoader /> : (
          <tbody>
            {transactions.length > 0 ? (
              transactions.map(tx => <TransactionRow key={tx.id} transaction={tx} onRowClick={onRowClick} />)
            ) : (
              <tr><td colSpan="7" style={{ textAlign: 'center' }}>No transactions found.</td></tr>
            )}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TransactionTable;