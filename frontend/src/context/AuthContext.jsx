import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedEmail = localStorage.getItem("email");
    const savedToken = localStorage.getItem("token");
    const savedCreatedAt = localStorage.getItem("createdAt");

    if (savedName && savedEmail && savedToken) {
      setUser({
        name: savedName,
        email: savedEmail,
        token: savedToken,
        createdAt: savedCreatedAt,
      });
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const value = { logout, user, setUser, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
