import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="navbar">
      <img
        src="../../assets/logo.svg"
        alt="logo"
        className="logo"
        onClick={() => navigate("/")}
      />
      <div className="links">
        {isAuthenticated ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <>
            <Link to="/signin" className="signin">
              Sign in
            </Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}

        <Link to="/teams">Teams</Link>
        <Link to="/contactus">Contact Us</Link>
        {isAuthenticated && (
          <button
            className="logout"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
