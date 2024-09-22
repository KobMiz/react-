import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "./logo";
import { useAuth } from "../contexts/auth.context";

const Navbar = ({ toggleDarkMode, isDarkMode, onSearch }) => {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm ${
        isDarkMode ? "navbar-dark-mode" : ""
      }`}
    >
      <div className="container">
        <Link className="nav-item nav-link" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/about">
                About
              </NavLink>
            </li>
            {user && user.biz && (
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/my-cards">
                  My Cards
                </NavLink>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/favorite-cards">
                  Favorite Cards
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button
                onClick={toggleDarkMode}
                className="btn btn-outline-secondary"
              >
                {isDarkMode ? (
                  <i className="bi bi-brightness-high"></i>
                ) : (
                  <i className="bi bi-moon-stars"></i>
                )}
              </button>
            </li>
            <li className="nav-item">
              <input
                type="text"
                className="form-control"
                placeholder="Search cards..."
                value={query}
                onChange={handleSearchChange}
              />
            </li>
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/signin">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/biz-signup">
                    Biz Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="nav-item">
                  <span className={`nav-item nav-link welcome-message`}>
                    Welcome, {user.name || "Guest"}
                  </span>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
