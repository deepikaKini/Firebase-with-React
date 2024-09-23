// src/components/Auth.js
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => console.log("Logged in", userCredential))
        .catch((error) => console.error("Login error", error));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => console.log("Registered", userCredential))
        .catch((error) => console.error("Registration error", error));
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Sign Up" : "Switch to Login"}
      </button>
    </div>
  );
};

export default Auth;
