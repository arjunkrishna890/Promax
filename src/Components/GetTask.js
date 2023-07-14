import React, { useState, useEffect } from "react";

function GetTask() {
  const [taskID, setTaskID] = useState("");
  const [token, setToken] = useState("");
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:8000/tasks/${taskID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTask(data);
        } else {
          console.error("Failed to fetch task");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (taskID && token) {
      fetchTask();
    }
  }, [taskID, token]);

  return (
    <div>
      <h1>Get Task</h1>
      <input
        type="text"
        placeholder="Task ID"
        value={taskID}
        onChange={(e) => setTaskID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      {task ? (
        <div>
          <p>Task ID: {task.taskID}</p>
          <p>Task Name: {task.taskName}</p>
          <p>Assigned Employee: {task.assignedEmployee}</p>
          <p>Completed: {task.completed.toString()}</p>
        </div>
      ) : (
        <p>No task found</p>
      )}
    </div>
  );
}

export default GetTask;
