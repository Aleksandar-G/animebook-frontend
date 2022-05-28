import Link from "next/link";
import { removeCookies } from "cookies-next";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Animebook</a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link href="/profile">
            <a className="navbar-item">Profile</a>
          </Link>
        </div>
      </div>
      <a
        className="nav-item nav-link active float-end"
        onClick={() => {
          removeCookies("token");
          window.location.href = "/";
        }}
      >
        Logout
      </a>
    </nav>
  );
};

export default Navbar;
