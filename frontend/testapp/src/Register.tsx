// Register.tsx
import React, { useState } from "react";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                setSuccess("Registration successful! You can now log in.");
                setError("");
                // Optionally, redirect to login or auto-login
            } else {
                const data = await response.json();
                setError(data.detail || "Registration failed.");
                setSuccess("");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError("An error occurred during registration. Please try again.");
            setSuccess("");
        }
    };

    return (
<div className="w-100">
      <div className="row justify-content-center">
        <div className="">
          <h2 className="text-center mb-4">Register</h2>
          {success && <p className="text-success">{success}</p>}
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="form-group mb-3">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn custom-btn w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
    );
};

export default Register;
