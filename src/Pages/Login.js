import React, { useState } from "react";
import users from "../Api/user.json";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        const user = users.find((u) => u.username === username);
        if (user && user.password === password) {
            login();
            navigate('/quiz')
        } else {
            e.preventDefault()
            setErrorMessage("Username atau password salah");
        }
    };

    return (
        <main className="flex h-screen justify-center items-center">
            <div className="bg-slate-500 w-[900px] h-[555px] p-10 rounded-xl">
                <h1 className="text-center text-[48px] text-white font-bold">LOGIN</h1>
                <form method="POST" className="mt-[56px] space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-lg text-white">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="mt-3 w-full h-10 px-4 text-lg rounded-lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="mt-3 w-full h-10 px-4 text-lg rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        className="bg-blue-900 text-white mt-3 w-full h-10 px-4 text-base rounded-lg"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
                {errorMessage && <p className="text-white text-lg">{errorMessage}</p>}
            </div>
        </main>
    );
}

export default LoginPage;
