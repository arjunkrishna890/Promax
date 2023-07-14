import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateTask = async () => {
    try {
      const taskID = uuidv4(); // Generate a unique task ID

      const response = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskID: taskID,
          taskName: taskName,
          assignedEmployee: assignedEmployee,
          token: token,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        console.error("Task creation failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Create Task</h1>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Assigned Employee"
        value={assignedEmployee}
        onChange={(e) => setAssignedEmployee(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleCreateTask}>Create Task</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateTask;
