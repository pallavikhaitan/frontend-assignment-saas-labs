import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  // Import jest-dom matchers
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
    it('should render pagination buttons correctly', () => {
        render(
            <Pagination
                totalItems={10}
                itemsPerPage={5}
                currentPage={1}
                paginate={() => { }}
            />
        );

        // Check if pagination buttons are rendered
        expect(screen.getByText(/First/)).toBeInTheDocument();
        expect(screen.getByText(/Prev/)).toBeInTheDocument();
        expect(screen.getByText(/Next/)).toBeInTheDocument();
        expect(screen.getByText(/Last/)).toBeInTheDocument();
    });

    it('should disable "Prev" and "First" buttons on the first page', () => {
        render(
            <Pagination
                totalItems={10}
                itemsPerPage={5}
                currentPage={1}
                paginate={() => { }}
            />
        );

        const firstButton = screen.getByText(/First/);
        const prevButton = screen.getByText(/Prev/);
        expect(firstButton).toBeDisabled();
        expect(prevButton).toBeDisabled();
    });

    it('should correctly show the ellipsis when there are more pages', () => {
        render(
            <Pagination
                totalItems={100}
                itemsPerPage={5}
                currentPage={5}
                paginate={() => { }}
            />
        );

        // Ellipsis should be visible between pages
        const ellipses = screen.queryAllByText(/.../);
        expect(ellipses.length).toBeGreaterThan(0);
    });

    it('should call paginate when clicking on page numbers', () => {
        const mockPaginate = jest.fn();
        render(
            <Pagination
                totalItems={10}
                itemsPerPage={5}
                currentPage={1}
                paginate={mockPaginate}
            />
        );

        fireEvent.click(screen.getByText('2'));
        expect(mockPaginate).toHaveBeenCalledWith(2);
    });

    it('should call paginate with next page on clicking "Next"', () => {
        const mockPaginate = jest.fn();
        render(
            <Pagination
                totalItems={10}
                itemsPerPage={5}
                currentPage={1}
                paginate={mockPaginate}
            />
        );

        fireEvent.click(screen.getByText(/Next/));
        expect(mockPaginate).toHaveBeenCalledWith(2);
    });

    it('should call paginate with last page on clicking "Last"', () => {
        const mockPaginate = jest.fn();
        render(
            <Pagination
                totalItems={10}
                itemsPerPage={5}
                currentPage={1}
                paginate={mockPaginate}
            />
        );

        fireEvent.click(screen.getByText(/Last/));
        expect(mockPaginate).toHaveBeenCalledWith(2);
    });
});
