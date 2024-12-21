import React from "react";

// Pagination component to navigate between pages
const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Create an array of page numbers to display
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Handle the "First" and "Last" buttons
    const handlePrev = () => paginate(currentPage - 1);
    const handleNext = () => paginate(currentPage + 1);

    return (
        <div className="pagination">
            <button
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
                aria-label="Go to first page"
            >
                &laquo;&laquo; First
            </button>
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
            >
                &lsaquo; Prev
            </button>

            <button
                onClick={() => paginate(currentPage)}
                className="active"
                aria-label={`Go to page ${currentPage}`}
            >
                {currentPage} of {totalPages}
            </button>


            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
            >
                Next &rsaquo;
            </button>
            <button
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
                aria-label="Go to last page"
            >
                Last &raquo;&raquo;
            </button>
        </div>
    );
};

export default Pagination;
