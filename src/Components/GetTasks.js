import React, { useState, useEffect } from "react";

function GetTasks() {
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/tasks", {
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
          setTasks(data.tasks);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token]);

  return (
    <div>
      <h1>Get Tasks</h1>
      <input
        type="text"
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.taskID}>
              <p>Task ID: {task.taskID}</p>
              <p>Task Name: {task.taskName}</p>
              <p>Assigned Employee: {task.assignedEmployee}</p>
              <p>Completed: {task.completed.toString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  );
}

export default GetTasks;
