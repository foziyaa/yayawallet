import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register all the necessary components for a Line graph
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CURRENT_USER_ACCOUNT = "Yaya Wallet Pii";
const CURRENT_USER_ACCOUNT_ALT = "YaYa PII SC";

/**
 * Renders a line graph showing the account balance trend over time.
 * It is designed to be resilient against incomplete data to prevent crashes.
 * @param {object} props The component props.
 * @param {Array} props.transactions The array of transaction objects to visualize.
 */
const TransactionGraph = ({ transactions }) => {
  // Robustness Check: A trend line is meaningless without at least two data points.
  // This prevents the component from crashing if the data is sparse.
  if (!transactions || transactions.length < 2) {
    return (
      <div className="chart-placeholder">
        <h4>Not Enough Data to Display Trend</h4>
      </div>
    );
  }

  // --- Data Processing: Calculate Balance Over Time ---
  const balanceHistory = 
    // 1. Create a safe copy of the array to avoid mutating props.
    [...transactions]
      // 2. Sort transactions chronologically from oldest to newest.
      .sort((a, b) => a.created_at_time - b.created_at_time)
      // 3. Reduce the sorted array to a history of balance snapshots.
      .reduce((acc, tx) => {
        const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
        let newBalance = lastBalance;

        // Defensive Coding: Use optional chaining (?.) and fallbacks (|| 0)
        // to ensure the code doesn't crash if a transaction object is malformed.
        const isReceiverUser = tx?.receiver?.name === CURRENT_USER_ACCOUNT || tx?.receiver?.name === CURRENT_USER_ACCOUNT_ALT;
        const isTopUp = tx?.sender?.name === tx?.receiver?.name;
        const isIncoming = isReceiverUser || isTopUp;
        const amount = parseFloat(tx?.amount || 0);

        if (isIncoming) {
          newBalance += amount;
        } else {
          newBalance -= amount;
        }

        acc.push({
          time: tx.created_at_time * 1000, // Convert Unix seconds to JS milliseconds
          balance: newBalance,
        });
        return acc;
      }, []);

  const data = {
    labels: balanceHistory.map(item => new Date(item.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })),
    datasets: [{
      data: balanceHistory.map(item => item.balance),
      borderColor: 'var(--accent-purple)',
      borderWidth: 3,
      tension: 0.4, // For smooth curves
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: 'var(--accent-purple)',
    }],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false }, // The card title is sufficient
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => `Balance: ${context.parsed.y.toFixed(2)} ETB`,
        },
      },
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: { autoSkip: true, maxRotation: 45, minRotation: 45 } 
      },
      y: { 
        beginAtZero: false,
        grid: { display: false },
        ticks: { display: true }
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeInOutCubic',
    }
  };
  
  return <Line options={options} data={data} />;
};

export default TransactionGraph;