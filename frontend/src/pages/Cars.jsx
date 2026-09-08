import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Cars() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        api.get("/cars")
            .then(async (response) => {
                const carsData = response.data.cars;

                const carsWithAvailability = await Promise.all(
                    carsData.map(async (car) => {
                        try {
                            const availability = await api.get(
                                `/lease/availability/${car._id}`
                            );

                            return {
                                ...car,
                                availability: availability.data
                            };
                        } catch (error) {
                            console.log(
                                `Availability error for ${car._id}:`,
                                error
                            );

                            return {
                                ...car,
                                availability: {
                                    available: true
                                }
                            };
                        }
                    })
                );

                setCars(carsWithAvailability);
            })
            .catch((error) => {
                console.log("API ERROR:", error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 px-8 py-12">

            {/* Heading */}
            <div className="mb-12 text-center">
                <h1 className="mb-2 text-4xl font-bold text-gray-900">
                    Available Cars
                </h1>

                <p className="text-gray-500">
                    {cars.length} cars available
                </p>
            </div>

            {/* Cars */}
            <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-8">

                {cars.map((car) => (

                    <div
                        key={car._id}
                        className="w-full overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[45%] lg:w-[23%]"
                    >

                        {/* Car placeholder */}
                        <div className="flex h-36 items-center justify-center bg-gray-200">
                            <span className="text-6xl">
                                🚗
                            </span>
                        </div>

                        {/* Car information */}
                        <div className="p-5">

                            <h2 className="text-xl font-bold text-gray-900">
                                {car.brand} {car.model}
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {car.variant}
                            </p>

                            {/* Availability */}
                            <div className="mt-4">

                                {car.availability?.available ? (
                                    <div className="rounded-lg bg-green-50 px-3 py-2">
                                        <p className="text-sm font-semibold text-green-700">
                                            🟢 Available
                                        </p>
                                    </div>
                                ) : (
                                    <div className="rounded-lg bg-red-50 px-3 py-2">
                                        <p className="text-sm font-semibold text-red-700">
                                            🔴 Currently Occupied
                                        </p>

                                        <p className="mt-1 text-xs text-red-600">
                                            {new Date(
                                                car.availability.startDate
                                            ).toLocaleDateString()}{" "}
                                            →{" "}
                                            {new Date(
                                                car.availability.endDate
                                            ).toLocaleDateString()}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-600">
                                            Available from{" "}
                                            {new Date(
                                                car.availability.endDate
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}

                            </div>

                            {/* Specifications */}
                            <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 text-sm text-gray-600">

                                <p>⛽ {car.fuelType}</p>

                                <p>⚙️ {car.transmission}</p>

                                <p>🚙 {car.bodyType}</p>

                                <p>👤 {car.seats} seats</p>

                            </div>

                            {/* View Details */}
                            <Link
                                to={`/cars/${car._id}`}
                                className="mt-6 block w-full rounded-lg bg-black px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                            >
                                View Details
                            </Link>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Cars;