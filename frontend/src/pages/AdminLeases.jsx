import { useEffect, useState } from "react";
import api from "../services/api";

function AdminLeases() {
    const [leases, setLeases] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const loadLeases = async () => {
        try {
            const response = await api.get("/lease");

            console.log("ADMIN LEASES:", response.data);

            setLeases(response.data.leases || []);
        } catch (error) {
            console.log("ADMIN LEASE ERROR:", error);

            setError(
                error.response?.data?.msg ||
                "Failed to load leases"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLeases();
    }, []);

    const approveLease = async (leaseId) => {
        try {
            await api.put(`/lease/${leaseId}/approve`);

            loadLeases();
        } catch (error) {
            console.log("APPROVE ERROR:", error);

            setError(
                error.response?.data?.msg ||
                "Failed to approve lease"
            );
        }
    };

    const rejectLease = async (leaseId) => {
        try {
            await api.put(`/lease/${leaseId}/rejected`);

            loadLeases();
        } catch (error) {
            console.log("REJECT ERROR:", error);

            setError(
                error.response?.data?.msg ||
                "Failed to reject lease"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p className="text-gray-500">
                    Loading leases...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-8 py-12">

            <div className="mx-auto max-w-6xl">

                <h1 className="text-4xl font-bold text-gray-900">
                    Lease Management
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage customer lease requests
                </p>

                {error && (
                    <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {leases.length === 0 ? (

                    <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow">
                        <p className="text-gray-500">
                            No leases found.
                        </p>
                    </div>

                ) : (

                    <div className="mt-10 grid gap-6 md:grid-cols-2">

                        {leases.map((lease) => (

                            <div
                                key={lease._id}
                                className="rounded-2xl bg-white p-6 shadow-md"
                            >

                                <h2 className="text-2xl font-bold text-gray-900">
                                    {lease.car?.brand}{" "}
                                    {lease.car?.model}
                                </h2>

                                <p className="mt-1 text-gray-500">
                                    {lease.car?.variant}
                                </p>

                                <div className="mt-5 space-y-2 text-gray-600">

                                    <p>
                                        Customer:{" "}
                                        <span className="font-semibold text-gray-900">
                                            {lease.user?.username}
                                        </span>
                                    </p>

                                    <p>
                                        Provider:{" "}
                                        <span className="font-semibold text-gray-900">
                                            {lease.deal?.provider}
                                        </span>
                                    </p>

                                    <p>
                                        Start Date:{" "}
                                        <span className="font-semibold text-gray-900">
                                            {new Date(
                                                lease.startDate
                                            ).toLocaleDateString()}
                                        </span>
                                    </p>

                                    <p>
                                        End Date:{" "}
                                        <span className="font-semibold text-gray-900">
                                            {new Date(
                                                lease.endDate
                                            ).toLocaleDateString()}
                                        </span>
                                    </p>

                                </div>

                                <div className="mt-5">
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>

                                    <p className="font-bold uppercase">
                                        {lease.status}
                                    </p>
                                </div>

                                {lease.status === "pending" && (

                                    <div className="mt-6 flex gap-3">

                                        <button
                                            onClick={() =>
                                                approveLease(lease._id)
                                            }
                                            className="flex-1 rounded-xl bg-black px-4 py-3 font-semibold text-white hover:bg-gray-800"
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() =>
                                                rejectLease(lease._id)
                                            }
                                            className="flex-1 rounded-xl border border-red-500 px-4 py-3 font-semibold text-red-600 hover:bg-red-500 hover:text-white"
                                        >
                                            Reject
                                        </button>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminLeases;