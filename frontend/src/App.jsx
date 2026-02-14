import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProcuct";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Profile from "./pages/Profile.jsx";

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  return (
    <div className="">
      {!isAuthPage && <Navbar />}
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

        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default App;
