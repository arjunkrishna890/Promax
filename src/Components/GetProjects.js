import React, { useState, useEffect } from "react";

function GetProjects() {
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects);
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchProjects();
    }
  }, [token]);

  return (
    <div>
      <h1>Get Projects</h1>
      <input
        type="text"
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.projectID}>
              <p>Project ID: {project.projectID}</p>
              <p>Project Name: {project.projectName}</p>
              <p>Assigned Team Lead: {project.assignedTeamLead}</p>
              <ul>
                {project.tasks.map((task) => (
                  <li key={task.taskID}>
                    <p>Task ID: {task.taskID}</p>
                    <p>Task Name: {task.taskName}</p>
                    <p>Assigned Employee: {task.assignedEmployee}</p>
                    <p>Completed: {task.completed.toString()}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found</p>
      )}
    </div>
  );
}

export default GetProjects;
