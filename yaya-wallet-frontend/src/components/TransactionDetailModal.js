import React, { useState, useEffect } from 'react';

const CURRENT_USER_ACCOUNT = "Yaya Wallet Pii";
const CURRENT_USER_ACCOUNT_ALT = "YaYa PII SC";

/**
 * Renders an animated slide-in panel with detailed information about a single transaction.
 * It is designed to be resilient against incomplete data to prevent application crashes.
 * @param {object} props The component props.
 * @param {object | null} props.transaction The transaction object to display, or null to hide the modal.
 * @param {function} props.onClose The function to call to close the modal.
 */
const TransactionDetailModal = ({ transaction, onClose }) => {
  // State to manage the slide-out animation class
  const [isClosing, setIsClosing] = useState(false);
  // State to manage the text of the "Copy ID" button for user feedback
  const [copyText, setCopyText] = useState('Copy ID');

  // This effect ensures the slide-out animation plays before the component is removed
  useEffect(() => {
    if (!transaction) {
      setIsClosing(true);
      // Wait for the animation to finish before truly unmounting
      const timer = setTimeout(() => setIsClosing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [transaction]);

  // If there is no transaction and it's not in the middle of closing, render nothing.
  if (!transaction && !isClosing) return null;

  // --- EVENT HANDLERS ---

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to finish before calling the parent's onClose function
    setTimeout(onClose, 300);
  };

  const handleCopyId = () => {
    if (transaction?.id) {
      navigator.clipboard.writeText(transaction.id);
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy ID'), 2000);
    }
  };

  // --- DATA PREPARATION (with Defensive Coding) ---
  const isReceiverUser = transaction?.receiver?.name === CURRENT_USER_ACCOUNT || transaction?.receiver?.name === CURRENT_USER_ACCOUNT_ALT;
  const isTopUp = transaction?.sender?.name === transaction?.receiver?.name;
  const isIncoming = isReceiverUser || isTopUp;
  const statusClass = isIncoming ? 'status-incoming' : 'status-outgoing';
  const statusText = isIncoming ? 'Incoming Transfer' : 'Outgoing Transfer';

  return (
    <>
      {/* The semi-transparent background overlay */}
      <div 
        className={`modal-overlay ${transaction && !isClosing ? 'visible' : ''}`} 
        onClick={handleClose}
      ></div>
      
      {/* The main panel that slides in from the right */}
      <div className={`modal-panel ${transaction && !isClosing ? 'visible' : ''}`}>
        <div className="modal-header">
          <h2>Transaction Details</h2>
          <button onClick={handleClose} className="close-btn" aria-label="Close modal">&times;</button>
        </div>
        <div className="modal-content">
          <div className="detail-row status-row">
            <strong>Status</strong>
            <span className={`status-badge ${statusClass}`}>{statusText}</span>
          </div>
          <div className="detail-row">
            <strong>Transaction ID</strong>
            <div className="copy-wrapper">
              <span>{transaction?.id || 'N/A'}</span>
              <button onClick={handleCopyId}>{copyText}</button>
            </div>
          </div>
          <div className="party-details">
            <div className="party">
              <strong>Sender</strong>
              <p>{transaction?.sender?.name || 'Unknown'}</p>
              <small>{transaction?.sender?.account || 'N/A'}</small>
            </div>
            <div className="party-arrow">&rarr;</div>
            <div className="party">
              <strong>Receiver</strong>
              <p>{transaction?.receiver?.name || 'Unknown'}</p>
              <small>{transaction?.receiver?.account || 'N/A'}</small>
            </div>
          </div>
          <div className="fee-breakdown">
            <h4>Financials</h4>
            <div className="detail-row"><span>Amount</span><span>{(transaction?.amount || 0).toFixed(2)} {transaction?.currency || ''}</span></div>
            <div className="detail-row"><span>Service Fee</span><span>{(transaction?.fee_before_vat || 0).toFixed(2)} {transaction?.currency || ''}</span></div>
            <div className="detail-row"><span>VAT (15%)</span><span>{(transaction?.fee_vat || 0).toFixed(2)} {transaction?.currency || ''}</span></div>
            <div className="detail-row total"><strong>Total Debited</strong><strong>{((transaction?.amount || 0) + (transaction?.fee || 0)).toFixed(2)} {transaction?.currency || ''}</strong></div>
          </div>
          <div className="detail-row timestamp">
            <strong>Timestamp</strong>
            <span>
              {transaction?.created_at_time 
                ? new Date(transaction.created_at_time * 1000).toLocaleString() 
                : 'No Date'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetailModal;