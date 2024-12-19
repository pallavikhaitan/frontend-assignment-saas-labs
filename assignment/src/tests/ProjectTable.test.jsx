import React from 'react';
import { render, screen } from "@testing-library/react";
import ProjectTable from "../components/ProjectTable";

// Sample project data
const mockProjects = [
    { "s.no": 1, "percentage.funded": "75%", "amt.pledged": 500000 },
    { "s.no": 2, "percentage.funded": "50%", "amt.pledged": 300000 },
    { "s.no": 3, "percentage.funded": "85%", "amt.pledged": 750000 },
];

describe("ProjectTable Component", () => {
    it("should render the table headers correctly", () => {
        render(<ProjectTable projects={mockProjects} />);

        // Check if table headers are rendered correctly
        expect(screen.getByText("S.No.")).toBeInTheDocument();
        expect(screen.getByText("Percentage funded")).toBeInTheDocument();
        expect(screen.getByText("Amount pledged")).toBeInTheDocument();
    });

    it("should render the correct number of projects", () => {
        render(<ProjectTable projects={mockProjects} />);

        // Check if table rows match the number of projects passed
        const rows = screen.getAllByRole("row");
        // Rows include header row, so the number of data rows should be the length of projects
        expect(rows.length).toBe(mockProjects.length + 1); // Including the header row
    });

    it("should display project details correctly", () => {
        render(<ProjectTable projects={mockProjects} />);

        // Check if project details are rendered correctly for each project
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("75%")).toBeInTheDocument();
        expect(screen.getByText("500,000")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("50%")).toBeInTheDocument();
        expect(screen.getByText("300,000")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("85%")).toBeInTheDocument();
        expect(screen.getByText("750,000")).toBeInTheDocument();
    });

    it("should format the amount pledged correctly (with commas)", () => {
        render(<ProjectTable projects={mockProjects} />);

        // Check if the amount is formatted with commas
        expect(screen.getByText("500,000")).toBeInTheDocument();
        expect(screen.getByText("300,000")).toBeInTheDocument();
        expect(screen.getByText("750,000")).toBeInTheDocument();
    });

    it("should not render any rows if no projects are passed", () => {
        render(<ProjectTable projects={[]} />);

        // Check that no project rows are rendered when no projects are passed
        const rows = screen.queryAllByRole("row");
        expect(rows.length).toBe(1); // Only the header row should be rendered
    });
});
