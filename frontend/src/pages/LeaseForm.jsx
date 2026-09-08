import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function LeaseForm() {
    const { carId, dealId } = useParams();
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Automatically add /
    const formatDateInput = (value) => {
        let numbers = value.replace(/\D/g, "");

        numbers = numbers.slice(0, 8);

        if (numbers.length > 4) {
            return (
                numbers.slice(0, 2) +
                "/" +
                numbers.slice(2, 4) +
                "/" +
                numbers.slice(4)
            );
        }

        if (numbers.length > 2) {
            return (
                numbers.slice(0, 2) +
                "/" +
                numbers.slice(2)
            );
        }

        return numbers;
    };

    // DD/MM/YYYY → YYYY-MM-DD
    const convertToBackendDate = (date) => {
        if (date.length !== 10) {
            return null;
        }

        const [day, month, year] = date.split("/");

        return `${year}-${month}-${day}`;
    };

    // Validate actual calendar date
    const isValidDate = (date) => {
        if (!date || date.length !== 10) {
            return false;
        }

        const [day, month, year] = date.split("/").map(Number);

        if (!day || !month || !year) {
            return false;
        }

        if (month < 1 || month > 12) {
            return false;
        }

        const testDate = new Date(year, month - 1, day);

        return (
            testDate.getFullYear() === year &&
            testDate.getMonth() === month - 1 &&
            testDate.getDate() === day
        );
    };

    const handleStartDate = (e) => {
        const formatted = formatDateInput(e.target.value);

        setStartDate(formatted);
        setError("");
    };

    const handleEndDate = (e) => {
        const formatted = formatDateInput(e.target.value);

        setEndDate(formatted);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!isValidDate(startDate)) {
            setError("Please enter a valid start date in DD/MM/YYYY format.");
            return;
        }

        if (!isValidDate(endDate)) {
            setError("Please enter a valid end date in DD/MM/YYYY format.");
            return;
        }

        const backendStartDate = convertToBackendDate(startDate);
        const backendEndDate = convertToBackendDate(endDate);

        const start = new Date(backendStartDate);
        const end = new Date(backendEndDate);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) {
            setError("Start date cannot be in the past.");
            return;
        }

        if (end <= start) {
            setError("End date must be after the start date.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/lease", {
                car: carId,
                deal: dealId,
                startDate: backendStartDate,
                endDate: backendEndDate
            });

            console.log("LEASE RESPONSE:", response.data);

            setMessage("Lease request submitted successfully!");

            setTimeout(() => {
                navigate("/my-leases");
            }, 1000);

        } catch (error) {
            console.log("LEASE ERROR:", error);

            setError(
                error.response?.data?.msg ||
                "Failed to submit lease request."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-12">

            <div className="mx-auto max-w-xl">

                {/* Back */}
                <Link
                    to={`/cars/${carId}/deals`}
                    className="text-sm font-semibold text-gray-600 hover:text-black"
                >
                    ← Back to Deals
                </Link>

                {/* Heading */}
                <div className="mb-8 mt-6">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Lease This Car
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Select your lease dates
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-white p-8 shadow-md"
                >

                    {/* Start Date */}
                    <div className="mb-6">

                        <label className="mb-2 block font-semibold text-gray-800">
                            Start Date
                        </label>

                        <input
                            type="text"
                            value={startDate}
                            onChange={handleStartDate}
                            placeholder="DD/MM/YYYY"
                            inputMode="numeric"
                            maxLength={10}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black"
                        />

                    </div>

                    {/* End Date */}
                    <div className="mb-6">

                        <label className="mb-2 block font-semibold text-gray-800">
                            End Date
                        </label>

                        <input
                            type="text"
                            value={endDate}
                            onChange={handleEndDate}
                            placeholder="DD/MM/YYYY"
                            inputMode="numeric"
                            maxLength={10}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-black"
                        />

                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-5 rounded-xl bg-red-100 p-4 text-sm font-medium text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {message && (
                        <div className="mb-5 rounded-xl bg-green-100 p-4 text-sm font-medium text-green-700">
                            {message}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Submitting..."
                            : "Submit Lease Request"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default LeaseForm;