import { Link } from "react-router";

function Signup() {
  return (
    <div className="auth-container">
      <h2>Sign up</h2>
      <form className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="repeat-password">Repeat Password</label>
          <input
            type="password"
            id="repeat-password"
            name="repeat-password"
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
      <p className="auth-link">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
}

export default Signup;
