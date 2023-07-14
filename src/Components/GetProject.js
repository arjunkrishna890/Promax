import React, { useState, useEffect } from "react";

function GetProject() {
  const [projectID, setProjectID] = useState("");
  const [token, setToken] = useState("");
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/projects/${projectID}`, {
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
          setProject(data);
        } else {
          console.error("Failed to fetch project");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (projectID && token) {
      fetchProject();
    }
  }, [projectID, token]);

  return (
    <div>
      <h1>Get Project</h1>
      <input
        type="text"
        placeholder="Project ID"
        value={projectID}
        onChange={(e) => setProjectID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      {project ? (
        <div>
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
        </div>
      ) : (
        <p>No project found</p>
      )}
    </div>
  );
}

export default GetProject;
