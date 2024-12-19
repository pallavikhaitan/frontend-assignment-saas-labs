import React from "react";

// Pagination component to navigate between pages
const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Create an array of page numbers to display
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Determine how many pages to show in the middle
    const maxPagesToShow = 5;
    const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    const visiblePages = pageNumbers.slice(startPage - 1, endPage);

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

            {visiblePages[0] > 1 && (
                <button onClick={() => paginate(1)} aria-label="Go to first page">
                    1
                </button>
            )}
            {visiblePages[0] > 2 && <span>...</span>}

            {visiblePages.map((number) => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={currentPage === number ? "active" : ""}
                    aria-label={`Go to page ${number}`}
                >
                    {number}
                </button>
            ))}

            {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span>...</span>}

            {visiblePages[visiblePages.length - 1] < totalPages && (
                <button onClick={() => paginate(totalPages)} aria-label="Go to last page">
                    {totalPages}
                </button>
            )}

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
