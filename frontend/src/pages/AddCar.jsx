import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddCar() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        variant: "",
        fuelType: "",
        transmission: "",
        bodyType: "",
        seats: "",
        image: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/cars/addCar", {
                ...formData,
                seats: Number(formData.seats)
            });

            setMessage(response.data.msg || "Car added successfully");

            setFormData({
                brand: "",
                model: "",
                variant: "",
                fuelType: "",
                transmission: "",
                bodyType: "",
                seats: "",
                image: ""
            });

        } catch (error) {
            console.log("ADD CAR ERROR:", error);

            setError(
                error.response?.data?.msg ||
                "Failed to add car"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-12">

            <div className="mx-auto max-w-3xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Add New Car
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Add a new car to your fleet.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-white p-8 shadow-md"
                >

                    {/* Brand */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Brand
                        </label>

                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="e.g. Toyota"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    {/* Model */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Model
                        </label>

                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            placeholder="e.g. Corolla"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    {/* Variant */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Variant
                        </label>

                        <input
                            type="text"
                            name="variant"
                            value={formData.variant}
                            onChange={handleChange}
                            placeholder="e.g. XLi"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    {/* Fuel Type */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Fuel Type
                        </label>

                        <select
                            name="fuelType"
                            value={formData.fuelType}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
                        >
                            <option value="">
                                Select fuel type
                            </option>

                            <option value="Petrol">
                                Petrol
                            </option>

                            <option value="Diesel">
                                Diesel
                            </option>

                            <option value="Hybrid">
                                Hybrid
                            </option>

                            <option value="Electric">
                                Electric
                            </option>
                        </select>
                    </div>

                    {/* Transmission */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Transmission
                        </label>

                        <select
                            name="transmission"
                            value={formData.transmission}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
                        >
                            <option value="">
                                Select transmission
                            </option>

                            <option value="Manual">
                                Manual
                            </option>

                            <option value="Automatic">
                                Automatic
                            </option>
                        </select>
                    </div>

                    {/* Body Type */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Body Type
                        </label>

                        <select
                            name="bodyType"
                            value={formData.bodyType}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
                        >
                            <option value="">
                                Select body type
                            </option>

                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Estate">Estate</option>
                            <option value="MPV">MPV</option>
                        </select>
                    </div>

                    {/* Seats */}
                    <div className="mb-5">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Number of Seats
                        </label>

                        <input
                            type="number"
                            name="seats"
                            value={formData.seats}
                            onChange={handleChange}
                            min="1"
                            max="20"
                            placeholder="e.g. 5"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    {/* Image */}
                    <div className="mb-6">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Image URL
                        </label>

                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/car.jpg"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                        />
                    </div>

                    {/* Success */}
                    {message && (
                        <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                            {message}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Adding Car..." : "Add Car"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddCar;