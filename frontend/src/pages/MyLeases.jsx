import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyLeases() {
    const [leases, setLeases] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/lease/my")
            .then((response) => {
                console.log("MY LEASES:", response.data);

                setLeases(response.data.leases || []);
            })
            .catch((error) => {
                console.log("MY LEASES ERROR:", error);

                setError(
                    error.response?.data?.msg ||
                    "Failed to load leases"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const cancelLease = async (leaseId) => {
        try {
            const response = await api.put(
                `/lease/${leaseId}/cancel`
            );

            console.log("CANCEL RESPONSE:", response.data);

            // Update the lease on the page
            setLeases((currentLeases) =>
                currentLeases.map((lease) =>
                    lease._id === leaseId
                        ? {
                            ...lease,
                            status: "cancelled"
                        }
                        : lease
                )
            );

        } catch (error) {
            console.log("CANCEL ERROR:", error);

            setError(
                error.response?.data?.msg ||
                "Failed to cancel lease"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p className="text-gray-500">
                    Loading your leases...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-8 py-12">

            <div className="mx-auto max-w-6xl">

                <div className="mb-10">

                    <Link
                        to="/cars"
                        className="text-sm font-semibold text-gray-600 hover:text-black"
                    >
                        ← Back to Cars
                    </Link>

                    <h1 className="mt-6 text-4xl font-bold text-gray-900">
                        My Leases
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View and manage your car leases
                    </p>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
                        {error}
                    </div>
                )}

                {/* No leases */}
                {leases.length === 0 ? (

                    <div className="rounded-2xl bg-white p-10 text-center shadow">

                        <h2 className="text-2xl font-semibold text-gray-900">
                            No leases yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            You haven't submitted any lease requests.
                        </p>

                        <Link
                            to="/cars"
                            className="mt-6 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                        >
                            Browse Cars
                        </Link>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2">

                        {leases.map((lease) => (

                            <div
                                key={lease._id}
                                className="rounded-2xl bg-white p-6 shadow-md"
                            >

                                {/* Car */}
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {lease.car?.brand}{" "}
                                    {lease.car?.model}
                                </h2>

                                <p className="mt-1 text-gray-500">
                                    {lease.car?.variant}
                                </p>

                                {/* Deal */}
                                <div className="mt-6 border-t border-gray-200 pt-5">

                                    <p className="text-sm text-gray-500">
                                        Provider
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {lease.deal?.provider}
                                    </p>

                                </div>

                                {/* Dates */}
                                <div className="mt-5 grid grid-cols-2 gap-4">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Start Date
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {new Date(
                                                lease.startDate
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            End Date
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            {new Date(
                                                lease.endDate
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                </div>

                                {/* Status */}
                                <div className="mt-6">

                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>

                                    <p className="mt-1 font-bold uppercase text-gray-900">
                                        {lease.status}
                                    </p>

                                </div>

                                {/* Cancel */}
                                {(lease.status === "pending" ||
                                    lease.status === "active") && (

                                    <button
                                        onClick={() =>
                                            cancelLease(lease._id)
                                        }
                                        className="mt-6 w-full rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                                    >
                                        Cancel Lease
                                    </button>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default MyLeases;