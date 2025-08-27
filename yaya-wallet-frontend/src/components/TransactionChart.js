import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CURRENT_USER_ACCOUNT = "Yaya Wallet Pii";

const TransactionChart = ({ transactions }) => {
  const spendingByCause = transactions
    .filter(t => t.sender.name === CURRENT_USER_ACCOUNT)
    .reduce((acc, transaction) => {
      const cause = transaction.cause || 'Uncategorized';
      acc[cause] = (acc[cause] || 0) + parseFloat(transaction.amount);
      return acc;
    }, {});

  if (Object.keys(spendingByCause).length === 0) {
    return (
      <div className="chart-placeholder">
        <h4>Spending Analysis</h4>
        <p>No outgoing transaction data to visualize for this selection.</p>
        <p className="small-text">The chart will appear when viewing multiple outgoing transactions.</p>
      </div>
    );
  }

  const data = {
    labels: Object.keys(spendingByCause),
    datasets: [
      {
        label: 'Spending',
        data: Object.values(spendingByCause),
        backgroundColor: [
          '#3498db', '#e74c3c', '#9b59b6', '#f1c40f', '#2ecc71', '#1abc9c'
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        // --- NEW: HOVER ANIMATION ---
        // This makes the pie slice slightly larger when you hover over it.
        hoverOffset: 12, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Spending by Cause', font: { size: 18 } },
    },
    // --- NEW: INITIAL LOAD ANIMATION ---
    // This block controls how the chart appears on the screen.
    animation: {
      duration: 1500, // Animation duration in milliseconds
      easing: 'easeInOutQuart', // A smooth animation effect
      animateScale: true, // The chart will grow out from the center
      animateRotate: true // The slices will spin into place
    }
  };
  
  return <Pie data={data} options={options} />;
};

export default TransactionChart;