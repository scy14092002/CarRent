import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            setLoading(false);
            return;
        }

        api.get("/user/profile")
            .then((response) => {
                const user = response.data.user;

                if (user.role === "admin") {
                    setIsAdmin(true);
                }
            })
            .catch((error) => {
                console.log("ADMIN CHECK ERROR:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Checking access...</p>
            </div>
        );
    }

    if (!localStorage.getItem("access_token")) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/cars" replace />;
    }

    return children;
}

export default AdminRoute;