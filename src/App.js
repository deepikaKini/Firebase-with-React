
// src/App.js
import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from './config/firebase';
import TaskManager from './components/TaskManager';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user ? <TaskManager /> : <Login onLogin={() => setUser(true)} />}
    </div>
  );
}

export default App;
