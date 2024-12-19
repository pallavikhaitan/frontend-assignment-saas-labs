import React, { useState, useEffect } from "react";
import ProjectTable from "./components/ProjectTable";
import Pagination from "./components/Pagination";
import "./App.css";

// Function to fetch data from the given API with error handling
export const fetchData = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return []; // Return empty array on failure
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchData()
      .then((data) => {
        setProjects(data);
        setLoading(false); // Data successfully loaded
      })
      .catch(() => {
        setError(true); // Handle error state
        setLoading(false);
      });
  }, []);

  // Function to paginate through the data
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the projects for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>Error loading data. Please try again later.</div>; // Display error message
  }

  return (
    <div className="app-container">
      <h1>Kickstarter Projects</h1>
      <ProjectTable projects={currentProjects} />
      <Pagination
        totalItems={projects.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
