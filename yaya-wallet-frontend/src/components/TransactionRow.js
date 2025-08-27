import React from 'react';

// Define the "current user" for consistent logic
const CURRENT_USER_ACCOUNT = "Yaya Wallet Pii";
const CURRENT_USER_ACCOUNT_ALT = "YaYa PII SC";

/**
 * Renders a single, clickable row in the transaction table.
 * It is designed to be resilient and will not crash if data is incomplete.
 * @param {object} props The component props.
 * @param {object} props.transaction The transaction object for this row.
 * @param {function} props.onRowClick The function to call when the row is clicked.
 */
const TransactionRow = ({ transaction, onRowClick }) => {
  // --- Resilient Data Handling ---
  // Safely check for receiver and sender to prevent crashes
  const isReceiverUser = 
    transaction?.receiver?.name === CURRENT_USER_ACCOUNT || 
    transaction?.receiver?.name === CURRENT_USER_ACCOUNT_ALT;
  
  const isTopUp = transaction?.sender?.name === transaction?.receiver?.name;
  const isIncoming = isReceiverUser || isTopUp;
  
  // Safely format the date, providing a fallback if the timestamp is missing
  const formattedDate = transaction?.created_at_time 
    ? new Date(transaction.created_at_time * 1000).toLocaleString() 
    : 'No Date';

  // The entire table row is wrapped in an onClick handler
  return (
    <tr onClick={() => onRowClick(transaction)}>
      <td className="direction-cell">
        {isIncoming ? (
          <span className="direction-incoming"><i className="fa fa-arrow-down"></i> In</span>
        ) : (
          <span className="direction-outgoing"><i className="fa fa-arrow-up"></i> Out</span>
        )}
      </td>
      {/* Use optional chaining and fallbacks for every piece of data */}
      <td>{transaction?.id?.substring(0, 8) || 'N/A'}...</td>
      <td>{transaction?.sender?.name || 'Unknown Sender'}</td>
      <td>{transaction?.receiver?.name || 'Unknown Receiver'}</td>
      <td>{transaction?.amount_with_currency || '0.00 ETB'}</td>
      <td>{transaction?.cause || 'N/A'}</td>
      <td>{formattedDate}</td>
    </tr>
  );
};

export default TransactionRow;