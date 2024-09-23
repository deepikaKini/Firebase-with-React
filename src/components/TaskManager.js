// src/components/TaskManager.js
import React, { useEffect, useState } from "react";
import { collection, addDoc, query, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  
  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setTasks(tasksData);
    });
    
    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    await addDoc(collection(db, "tasks"), {
      task: newTask,
      completed: false,
      userId: auth.currentUser.uid
    });
    setNewTask("");
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const toggleCompletion = async (id, completed) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, {
      completed: !completed
    });
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id, task.completed)}
            />
            {task.task}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
