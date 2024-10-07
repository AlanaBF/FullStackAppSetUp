// Login.tsx
import React, { useState } from "react";

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                setError("Invalid username or password.");
                return;
            }

            const data = await response.json();
            const accessToken = data.access_token;
            localStorage.setItem("accessToken", accessToken);
            setError("");
            onLogin(); // Notify the App component that login was successful
        } catch (error) {
            console.error("Error during login:", error);
            setError("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className="w-100">
            <div className="row justify-content-center"></div>
            <div className="">
                <h2 className="text-center mb-4">Login</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label>Username:</label>
                        <input
                            title="Login"
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Password:</label>
                        <input
                            title="Login"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn custom-btn w-100" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
