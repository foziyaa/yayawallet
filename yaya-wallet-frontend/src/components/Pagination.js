import React from 'react';

/**
 * Renders a redesigned, presentable set of pagination controls.
 * Uses icons for navigation and has a clean, modern aesthetic.
 * @param {object} props The component props.
 * @param {number} props.currentPage The current active page number.
 * @param {number} props.totalPages The total number of pages available.
 * @param {function} props.onPageChange A callback function to be invoked when a page button is clicked.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null; // Don't render if there's only one page
  }

  return (
    <div className="pagination">
      <button 
        onClick={handlePrevious} 
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <i className="fa fa-chevron-left"></i>
      </button>
      
      <span className="page-indicator">
        Page {currentPage} of {totalPages}
      </span>

      <button 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;