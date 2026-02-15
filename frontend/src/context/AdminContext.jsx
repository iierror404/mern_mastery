import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const {user} = useAuth();

  const fetchUsers = useCallback(async () => {
    try {
      const res = await api.get("/admin/users/all");
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.role === "admin"){
    fetchUsers();}
  }, [fetchUsers]);

  const changeAccountStatus = async (status, id) => {
    // active || banned
    try {
      setLoading(true);
      const res = await api.put(`/admin/users/status/${id}`, {
        accountStatus: status,
      });

      setUsers((prev) =>
        prev.map((user) => (user._id === id ? res.data.user : user)),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/admin/users/delete/${id}`);

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    users,
    loading,
    changeAccountStatus,
    deleteAccount,
    refreshUsers: fetchUsers,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
