import { Link } from "react-router";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src="../../assets/logo-dark.svg" alt="logo" className="logo" />
        <div className="footer-links">
          <Link to="/teams">Teams</Link>
          <Link to="/profile">profile</Link>
          <Link to="/contactus">Contact Us</Link>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Team Connect. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
