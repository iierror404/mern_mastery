import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProcuct";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { LogOut } from "lucide-react";

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const isAdminPage = location.pathname.startsWith("/admin");

  const isNavShow = isAuthPage || isAdminPage;
  const { user, loading, logout } = useAuth();

  if (!loading && user?.accountStatus === "banned") {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl">
          You <span className="text-red-400">Banned</span> From Admin.
        </h1>
        <button onClick={logout} className="mt-2 cursor-pointer text-lg bg-red-500 hover:bg-red-500/80 transition-all duration-300 px-2 py-1.5 rounded-md flex items-center">
          Lougout
          <LogOut className="ml-1.5" size={20} />
        </button>
      </div>
    );
  }

  return (
    <div>
      {!isNavShow && <Navbar />}
      <Routes>
        <Route path="/" element="" />
        <Route path="/products" element={<Products />} />

        <Route
          path="/addProduct"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default App;
