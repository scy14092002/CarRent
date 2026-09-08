import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function CarDeals() {
    const { id } = useParams();

    const [deals, setDeals] = useState([]);

    useEffect(() => {
        api.get("/deal")
            .then((response) => {
                console.log("DEALS RESPONSE:", response.data);

                const allDeals = response.data.deals || [];

                const carDeals = allDeals.filter((deal) => {
                    const dealCarId =
                        typeof deal.car === "object"
                            ? deal.car._id
                            : deal.car;

                    return dealCarId === id;
                });

                setDeals(carDeals);
            })
            .catch((error) => {
                console.log("DEALS ERROR:", error);
            });
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 px-8 py-12">

            <div className="mx-auto max-w-5xl">

                <Link
                    to={`/cars/${id}`}
                    className="text-sm font-semibold text-gray-600 hover:text-black"
                >
                    ← Back to Car
                </Link>

                <div className="mb-10 mt-6">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Available Deals
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Choose a deal for this car
                    </p>

                </div>

                {deals.length === 0 ? (

                    <div className="rounded-2xl bg-white p-10 text-center shadow">

                        <p className="text-gray-500">
                            No deals available for this car.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2">

                        {deals.map((deal) => (

                            <div
                                key={deal._id}
                                className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl"
                            >

                                <h2 className="text-2xl font-bold text-gray-900">
                                    {deal.provider}
                                </h2>

                                <div className="mt-6 space-y-3 text-gray-600">

                                    <p>
                                        Monthly Price:{" "}
                                        <span className="font-semibold text-gray-900">
                                            ৳{deal.monthlyPrice}
                                        </span>
                                    </p>

                                    <p>
                                        Initial Payment:{" "}
                                        <span className="font-semibold text-gray-900">
                                            ৳{deal.initialPayment}
                                        </span>
                                    </p>

                                    <p>
                                        Contract:{" "}
                                        <span className="font-semibold text-gray-900">
                                            {deal.contractMonths} months
                                        </span>
                                    </p>

                                    <p>
                                        Annual Mileage:{" "}
                                        <span className="font-semibold text-gray-900">
                                            {deal.annualMileage} km
                                        </span>
                                    </p>

                                </div>

                                {/* Choose Deal */}
                                <Link
                                    to={`/lease/${id}/${deal._id}`}
                                    className="mt-6 block w-full rounded-xl bg-black px-5 py-3 text-center font-semibold text-white transition hover:bg-gray-800"
                                >
                                    Choose Deal
                                </Link>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default CarDeals;