import React, { useState, useEffect } from 'react';
import './navbar.css';
import Logo from '../assets/Logo.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem('theme') === 'dark'
    );
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        const next = !isDarkMode;
        setIsDarkMode(next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    const closeNav = () => setNavOpen(false);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <img src={Logo} alt="" width="56" height="40" className="d-inline-block me-2" />
                    <span className="navbar-brand mb-0 fs-5">Biblioteca Virtual</span>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setNavOpen((o) => !o)}
                    aria-expanded={navOpen}
                    aria-controls="navbarMain"
                    aria-label="Menú"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    id="navbarMain"
                    className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`}
                >
                    <div className="navbar-nav mx-lg-auto py-2 py-lg-0 text-center">
                        <NavLink className={({ isActive }) => `nav-link px-3 ${isActive ? 'active fw-bold' : ''}`} to="/" onClick={closeNav}>
                            Home
                        </NavLink>
                        <NavLink className={({ isActive }) => `nav-link px-3 ${isActive ? 'active fw-bold' : ''}`} to="/catalog" onClick={closeNav}>
                            Catálogo
                        </NavLink>
                        <NavLink className={({ isActive }) => `nav-link px-3 ${isActive ? 'active fw-bold' : ''}`} to="/admin/dashboard" onClick={closeNav}>
                            Admin Panel
                        </NavLink>
                    </div>
                    <div className="d-flex justify-content-center justify-content-lg-end pb-3 pb-lg-0 ms-lg-2">
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={toggleTheme}>
                            {isDarkMode ? '🌞 Claro' : '🌚 Oscuro'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
