// A simple vulnerable web app in React + Node.js for ZAP testing (intentionally insecure)

import React, { useState } from "react";
import axios from "axios";

export default function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // This endpoint will echo input without sanitization (vulnerable to XSS)
            const res = await axios.post("http://localhost:4000/api/search", { username });
            setResult(res.data);
        } catch (error) {
            setResult("Login Error occurred");
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Insecure Login App</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" className="border p-2 w-full" value={username} onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input type="password" className="border p-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                    Login
                </button>
            </form>
            {result && (
            <div className="mt-6">
                <h2 className="text-lg font-semibold">Server Response:</h2>
                {/* Intentionally unsafe rendering to simulate XSS */}
                <div dangerouslySetInnerHTML={{ __html: result }}></div>
            </div>
            )}
        </div>
    );
}
