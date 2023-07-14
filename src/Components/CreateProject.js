import React, { useState } from "react";

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [assignedTeamLead, setAssignedTeamLead] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateProject = async () => {
    try {
      const response = await fetch("http://localhost:8000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: projectName,
          assignedTeamLead: assignedTeamLead,
          token: token,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        console.error("Project creation failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Assigned Team Lead"
        value={assignedTeamLead}
        onChange={(e) => setAssignedTeamLead(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleCreateProject}>Create Project</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateProject;
