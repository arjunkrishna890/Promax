import React, { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [userlist,setuserlist] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleLogin = (username, password) => {

    fetch("http://localhost:8000/users")
      .then((response) => response.json())
      .then((data) => {
        setuserlist(data)
        const loggedInUser = data.find(
          (user) => user.username === username && user.password === password
        );
        setUser(loggedInUser);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleTaskCreate = (projectID, taskName, assignedEmployee) => {

    fetch(`http://localhost:8000/projects/${projectID}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName,
        assignedEmployee,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task added successfully:", data);
      })
      .catch((error) => console.error("Error:", error));
  };


  const handleProjectCreate = (projectName, assignedTeamLead) => {

    fetch("http://localhost:8000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectName,
        assignedTeamLead,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Project created successfully:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {

    fetch("http://localhost:8000/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const renderLogin = () => {
    return (
      <div>
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            handleLogin(username, password);
          }}
        >
          <input type="text" name="username" placeholder="Username" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  const renderProjectCreate = () => {
    if (user.role !== "admin") {
      return null;
    }

    return (
      <div>
        <h1>Create Project</h1>
        {console.log(userlist)}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const projectName = e.target.projectName.value;
            const assignedTeamLead = e.target.assignedTeamLead.value;
            handleProjectCreate(projectName, assignedTeamLead);
          }}
        >
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            required
          />

          <input
            type="text"
            name="assignedTeamLead"
            placeholder="Assigned Team Lead"
            required
          />
          <select >
          <option value="">Select an option</option>
            {userlist.map((userl)=>(
              userl.role ==="teamlead"?( <option value="">{userl.username}</option>):("")
           
            ))}
       
       
      </select>
          <button type="submit">Create Project</button>
        </form>
      </div>
    );
  };

  const renderProjects = () => {
    return (
      <div>
        <h1>Projects</h1>
        {console.log(user)}
        {projects.map((project) => (
          <div key={project.projectID}>
            <h2>{project.projectName}</h2>
            <ul>
              {project.tasks && project.tasks.map((task) => (
                <li key={task.taskID}>{task.taskName}</li>
              ))}
              {console.log(user.role)}
            </ul>
            {user.role === "teamlead" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const taskName = e.target.taskName.value;
                  const assignedEmployee = e.target.assignedEmployee.value;
                  handleTaskCreate(
                    project.id,
                    taskName,
                    assignedEmployee
                  );
                  e.target.reset();
                }}
              >
                <input
                  type="text"
                  name="taskName"
                  placeholder="Task Name"
                  required
                />
                <input
                  type="text"
                  name="assignedEmployee"
                  placeholder="Assigned Employee"
                  required
                />
                <button type="submit">Add Task</button>
              </form>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderApp = () => {
    if (!user) {
      return renderLogin();
    }

    return (
      <div>
        <h1>Welcome, {user.username}!</h1>
        <button onClick={handleLogout}>Logout</button>
        {renderProjectCreate()}
        {renderProjects()}
      </div>
    );
  };

  return <div className="App">{renderApp()}</div>;
}

export default App;
