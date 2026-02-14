import { useEffect, useState } from "react";
import api from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AuthPage = () => {
  // Login State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [tab, setTab] = useState("login");

  const navigate = useNavigate();
  const {setUser, user} = useAuth();

  const handelRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim())
      return setMsg("Please Fill All Inputs.");

    try {
      setLoading(true);
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log(res.data);

      if (res.status !== 201) return setMsg(res.data.message);

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("token", res.data.user.token);
      localStorage.setItem("createdAt", res.data.user.createdAt);

      setUser(res.data.user);

      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setMsg(error.response?.data?.message || "Some Think Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handelLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim())
      return setMsg("Please Fill All Inputs.");

    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(res.data);

      if (res.status !== 200) return setMsg(res.data.message);

      localStorage.setItem("name", res.data.user.name);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("token", res.data.user.token);
      localStorage.setItem("createdAt", res.data.user.createdAt);
      
      setUser(res.data.user)
      console.log(user)
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setMsg(error.response?.data?.message || "Some Think Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const msgTimer = setTimeout(() => {
      setMsg("");
    }, 3000);

    return () => clearTimeout(msgTimer);
  }, [msg]);

  return (
    <div>
      {/* Header */}
      <div className="min-h-[calc(100vh-56px)] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-black my-6 mb-8">
          {tab === "register" ? "Register" : "Login"}
        </h1>
        <form
          onSubmit={(e) =>
            tab === "login" ? handelLogin(e) : handelRegister(e)
          }
          className="flex flex-col gap-4 justify-center items-center"
        >
          {tab === "register" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              className="w-100 border border-secondary/70 mb-3 px-2 py-2 rounded-md focus:ring-2 focus:ring-secondary/70 outline-none"
              placeholder="Enter your name"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="w-100 border border-secondary/70 mb-3 px-2 py-2 rounded-md focus:ring-2 focus:ring-secondary/70 outline-none"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            minLength="6"
            className="w-100 border border-secondary/70 mb-3 px-2 py-2 rounded-md focus:ring-2 focus:ring-secondary/70 outline-none"
            placeholder="Enter your password."
          />
          <span>{msg}</span>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-700 px-6 py-3 rounded-xl text-xl cursor-pointer hover:bg-blue-700/70 transform-all duration-300"
          >
            {tab === "register" ? "Register" : "Login"}
          </button>
        </form>
        <span className="text-gray-400/90 text-xs">
          {tab === "login" ? "Don't Have Account?" : "Already Have Account?"}
          <button
            onClick={() => {
              setTab(tab === "login" ? "register" : "login");
              setMsg("");
            }}
            className="cursor-pointer underline text-blue-700/80 transition-all duration-300 hover:text-blue-700 text-base"
          >
            {tab === "login" ? "register" : "Login"}
          </button>
        </span>
      </div>
    </div>
  );
};

export default AuthPage;
