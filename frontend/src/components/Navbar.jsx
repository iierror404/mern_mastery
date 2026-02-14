import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <div>
          <h1>MERN Mastery</h1>
        </div>
        <div className="flex justify-end items-center gap-4">
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link
                className="px-3 py-2 rounded-lg transition-all duration-300 bg-bg/40 hover:bg-secondary/30"
                to="/products"
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                className="px-3 py-2 rounded-lg transition-all duration-300 bg-bg/40 hover:bg-secondary/30"
                to="/addProduct"
              >
                Add Product
              </Link>
            </li>
          </ul>
          {user ? (
            <div className="flex items-center justify-center gap-4">
              <h1 className="bg-bg px-3 py-1.5 rounded-xl">{user.name}</h1>
              <button onClick={logout} className="bg-red-500/50 px-2 py-1.5 rounded-xl cursor-pointer">Logout</button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <Link to="/auth" className="bg-blue-500/50 px-4 py-1.5 rounded-md cursor-pointer">login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
