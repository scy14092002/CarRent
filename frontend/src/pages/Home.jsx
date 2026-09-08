import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Hero */}
            <section className="flex min-h-[75vh] items-center justify-center px-8">

                <div className="mx-auto max-w-4xl text-center">

                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                        Welcome to CarRent
                    </p>

                    <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-7xl">
                        Find the right car.
                        <br />
                        Drive with confidence.
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">
                        Browse available cars, compare leasing deals,
                        and choose a plan that works for you.
                    </p>

                    <div className="mt-10 flex justify-center gap-4">

                        <Link
                            to="/cars"
                            className="rounded-xl bg-black px-7 py-4 font-semibold text-white transition hover:bg-gray-800"
                        >
                            Browse Cars
                        </Link>

                        <Link
                            to="/signup"
                            className="rounded-xl border border-gray-300 bg-white px-7 py-4 font-semibold text-gray-800 transition hover:bg-gray-50"
                        >
                            Create Account
                        </Link>

                    </div>

                </div>

            </section>


            {/* Features */}
            <section className="border-t bg-white px-8 py-16">

                <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">

                    <div className="rounded-2xl bg-gray-50 p-8">

                        <div className="mb-5 text-4xl">
                            🚗
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">
                            Quality Cars
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Browse a selection of cars with
                            detailed specifications.
                        </p>

                    </div>


                    <div className="rounded-2xl bg-gray-50 p-8">

                        <div className="mb-5 text-4xl">
                            💰
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">
                            Compare Deals
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Compare monthly payments,
                            initial costs and contract terms.
                        </p>

                    </div>


                    <div className="rounded-2xl bg-gray-50 p-8">

                        <div className="mb-5 text-4xl">
                            🔒
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">
                            Easy Leasing
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Submit your lease request and
                            track its status from your account.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;