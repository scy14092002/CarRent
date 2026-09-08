import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function CarDetails() {
    const { id } = useParams();

    const [car, setCar] = useState(null);

    useEffect(() => {
        api.get(`/cars/${id}`)
            .then((response) => {
                console.log("CAR RESPONSE:", response.data);
                setCar(response.data.car);
            })
            .catch((error) => {
                console.log("CAR ERROR:", error);
            });
    }, [id]);

    if (!car) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-gray-500">
                    Loading car...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-8 py-12">

            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg">

                {/* Back to cars */}
                <Link
                    to="/cars"
                    className="text-sm font-semibold text-gray-600 hover:text-black"
                >
                    ← Back to Cars
                </Link>

                {/* Car placeholder */}
                <div className="mt-6 flex h-64 items-center justify-center rounded-xl bg-gray-200">
                    <span className="text-8xl">
                        🚗
                    </span>
                </div>

                {/* Car name */}
                <div className="mt-8">

                    <h1 className="text-4xl font-bold text-gray-900">
                        {car.brand} {car.model}
                    </h1>

                    <p className="mt-2 text-lg text-gray-500">
                        {car.variant}
                    </p>

                </div>

                {/* Specifications */}
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">

                    <div className="rounded-xl bg-gray-100 p-4">
                        <p className="text-sm text-gray-500">
                            Fuel Type
                        </p>

                        <p className="mt-1 font-semibold">
                            {car.fuelType}
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-100 p-4">
                        <p className="text-sm text-gray-500">
                            Transmission
                        </p>

                        <p className="mt-1 font-semibold">
                            {car.transmission}
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-100 p-4">
                        <p className="text-sm text-gray-500">
                            Body Type
                        </p>

                        <p className="mt-1 font-semibold">
                            {car.bodyType}
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-100 p-4">
                        <p className="text-sm text-gray-500">
                            Seats
                        </p>

                        <p className="mt-1 font-semibold">
                            {car.seats}
                        </p>
                    </div>

                </div>

                {/* View Deals */}
                <Link
                    to={`/cars/${car._id}/deals`}
                    className="mt-8 block w-full rounded-xl bg-black px-6 py-4 text-center font-semibold text-white transition hover:bg-gray-800"
                >
                    View Deals
                </Link>

            </div>

        </div>
    );
}

export default CarDetails;