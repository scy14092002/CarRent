import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/user/login", {
                username,
                password
            });

            console.log("LOGIN RESPONSE:", response.data);

            // Save JWT
            localStorage.setItem(
                "access_token",
                response.data.access_token
            );

            // Go back to cars
            navigate("/cars");

        } catch (error) {
            console.log("LOGIN ERROR:", error);

            setError(
                error.response?.data?.msg ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="text-3xl font-bold text-gray-900">
                    Login
                </h1>

                <p className="mt-2 text-gray-500">
                    Login to your CarRent account
                </p>

                <form
                    onSubmit={handleLogin}
                    className="mt-8 space-y-5"
                >

                    {/* Username */}
                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />

                    </div>

                    {/* Password */}
                    <div>

                        <label className="mb-2 block font-semibold text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />

                    </div>

                    {/* Error */}
                    {error && (
                        <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;