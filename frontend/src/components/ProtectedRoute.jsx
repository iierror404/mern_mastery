import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  if (role && role === "admin") {
    if (user.role !== "admin") {
      console.warn("Unauthorized access attempt! ⛔");
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
