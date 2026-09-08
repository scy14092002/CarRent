import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import CarDeals from "./pages/CarDeals";
import LeaseForm from "./pages/LeaseForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyLeases from "./pages/MyLeases";
import AdminLeases from "./pages/AdminLeases";
import AddCar from "./pages/AddCar"; // 1. Import your new AddCar page

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            {/* Quick action button container for testing/global access */}
            <div style={{ padding: "10px", textAlign: "right" }}>
                <Link to="/admin/add-car">
                    <button style={{ padding: "8px 16px", cursor: "pointer" }}>
                        + Add New Car (Admin)
                    </button>
                </Link>
            </div>

            <Routes>
                {/* PUBLIC */}
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/cars/:id/deals" element={<CarDeals />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* USER ONLY */}
                <Route
                    path="/lease/:carId/:dealId"
                    element={
                        <ProtectedRoute>
                            <LeaseForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-leases"
                    element={
                        <ProtectedRoute>
                            <MyLeases />
                        </ProtectedRoute>
                    }
                />

                {/* ADMIN ONLY */}
                <Route
                    path="/admin/leases"
                    element={
                        <AdminRoute>
                            <AdminLeases />
                        </AdminRoute>
                    }
                />
                {/* 2. Add the route here */}
                <Route
                    path="/admin/add-car"
                    element={
                        <AdminRoute>
                            <AddCar />
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
//CarRent project
//Car search feature is in progress
export default App;