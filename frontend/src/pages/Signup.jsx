import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await api.post("/user/signup", {
                name,
                username,
                password
            });

            console.log("SIGNUP RESPONSE:", response.data);

            setSuccess("Account created successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            console.log("SIGNUP ERROR:", error);

            setError(
                error.response?.data?.msg ||
                "Signup failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="text-3xl font-bold text-gray-900">
                    Create Account
                </h1>

                <p className="mt-2 text-gray-500">
                    Create your CarRent account
                </p>

                <form
                    onSubmit={handleSignup}
                    className="mt-8 space-y-5"
                >

                    {/* Name */}
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="mb-2 block font-semibold text-gray-700">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
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
                            placeholder="Create a password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="rounded-lg bg-green-100 p-3 text-sm text-green-700">
                            {success}
                        </div>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>

                </form>

                {/* Login link */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-black hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Signup;