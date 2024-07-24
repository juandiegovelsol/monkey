import React, { useState, useEffect } from "react";
import TaskLog from "./TaskLog";
import "./app.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      project: "Project A",
      grade: 3,
      feedback: "Good work, but could be more concise.",
    },
    {
      id: 2,
      project: "Project B",
      grade: 5,
      feedback: "Excellent job! Very thorough.",
    },
    {
      id: 3,
      project: "Project A",
      grade: 2,
      feedback: "Needs improvement. Follow instructions more closely.",
    },
    {
      id: 4,
      project: "Project C",
      grade: 4,
      feedback: "Great effort! A few minor errors.",
    },
    // ... more tasks
  ]);
  const [ackTasks, setAckTasks] = useState([]);

  const [uniqueProjects, setUniqueProjects] = useState([
    ...new Set(tasks.map((task) => task.project)),
  ]);
  const [ackUniqueProjects, setAckUniqueProjects] = useState([]);

  const [filter, setFilter] = useState("");
  const [ackFilter, setAckFilter] = useState("");

  const handleAcknowledge = (taskId) => {
    const taskToAcknowledge = tasks.find((task) => task.id === taskId);
    setAckTasks([...ackTasks, taskToAcknowledge]);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    setUniqueProjects([...new Set(tasks.map((task) => task.project))]);
  }, [tasks]);

  useEffect(() => {
    setAckUniqueProjects([...new Set(ackTasks.map((task) => task.project))]);
  }, [ackTasks]);

  return (
    <div className="app-container">
      <h1>Task Log</h1>
      <div className="filter-container">
        <label htmlFor="projectFilter">Filter by Project:</label>
        <select
          id="projectFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Projects</option>
          {uniqueProjects.map((project) => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      <h2>Pending Tasks</h2>
      <TaskLog
        tasks={tasks}
        filter={filter}
        onAcknowledge={handleAcknowledge}
      />

      <label htmlFor="projectFilter">Filter by Project:</label>
      <select
        id="projectFilter"
        value={ackFilter}
        onChange={(e) => setAckFilter(e.target.value)}
      >
        <option value="">All Projects</option>
        {ackUniqueProjects.map((project) => (
          <option key={`1${project}`} value={project}>
            {project}
          </option>
        ))}
      </select>

      <h2>Acknowledged Tasks</h2>
      <TaskLog tasks={ackTasks} filter={ackFilter} />
    </div>
  );
}

export default App

import React from 'react'

function TaskLog({ tasks, filter, onAcknowledge }) {
  const filteredTasks = filter
    ? tasks.filter((task) => task.project === filter)
    : tasks;
  const sortedTasks = [...filteredTasks].sort((a, b) => a.grade - b.grade);
  const averageGrade = (
    sortedTasks.reduce((sum, task) => sum + task.grade, 0) / sortedTasks.length
  ).toFixed(2);
  return (
    <div className="task-log">
      <h2>{filter ? `${filter} Tasks` : "All Tasks"}</h2>
      <h3>Average Grade: {averageGrade}</h3>
      {tasks.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        <ul>
          {sortedTasks.map((task) => (
            <li key={task.id}>
              <div>
                <strong>Project:</strong> {task.project}
                <br />
                <strong>Grade:</strong> {task.grade}
                <br />
                <strong>Feedback:</strong> {task.feedback}
              </div>
              {onAcknowledge && (
                <button onClick={() => onAcknowledge(task.id)}>
                  Acknowledge
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskLog;
