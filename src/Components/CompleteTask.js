import React, { useState } from "react";

function CompleteTask() {
  const [taskID, setTaskID] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleCompleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${taskID}/complete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        console.error("Task completion failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Complete Task</h1>
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
      <button onClick={handleCompleteTask}>Complete Task</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CompleteTask;
