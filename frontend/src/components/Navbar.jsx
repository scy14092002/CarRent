import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            setUser(null);
            return;
        }

        api.get("/user/profile")
            .then((response) => {
                console.log("USER PROFILE:", response.data);
                setUser(response.data.user);
            })
            .catch((error) => {
                console.log("PROFILE ERROR:", error);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="border-b bg-white px-8 py-4 shadow-sm">

            <div className="mx-auto flex max-w-7xl items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-gray-900"
                >
                    CarRent
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6">

                    <Link
                        to="/cars"
                        className="font-medium text-gray-600 hover:text-black"
                    >
                        Cars
                    </Link>

                    {user && (
                        <Link
                            to="/my-leases"
                            className="font-medium text-gray-600 hover:text-black"
                        >
                            My Leases
                        </Link>
                    )}

                    {/* Admin link */}
                    {user?.role === "admin" && (
                        <Link
                            to="/admin/leases"
                            className="font-medium text-gray-600 hover:text-black"
                        >
                            Admin
                        </Link>
                    )}

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="font-medium text-gray-600 hover:text-black"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="rounded-lg bg-black px-4 py-2 font-semibold text-white transition hover:bg-gray-800"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">

                            {/* User name */}
                            <span className="font-semibold text-gray-700">
                                {user.name}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100"
                            >
                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;