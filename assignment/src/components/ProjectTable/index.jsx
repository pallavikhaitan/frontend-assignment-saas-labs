import React from "react";

// Table component to display project details
const ProjectTable = ({ projects }) => {
    return (
        <table className="project-table">
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Percentage funded</th>
                    <th>Amount pledged</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <tr key={project["s.no"]}>
                        <td>{project["s.no"]}</td>
                        <td>{project["percentage.funded"]}</td>
                        <td>{project["amt.pledged"].toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProjectTable;
