import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/admin/global.css';
import AdminLogo from '../assets/Logo.png';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className={sidebarOpen ? 'wrapper sidebar-open' : 'wrapper'}>
            {sidebarOpen && (
                <button
                    type="button"
                    className="admin-sidebar-overlay"
                    aria-label="Cerrar menú"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src={AdminLogo} alt="Logo" className="logo-sidebar" />
                    Biblioteca
                </div>
                <nav className="sidebar-nav">
                    <div className="sidebar-section-title">PRINCIPAL</div>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeSidebar}>
                        <i className="fas fa-th-large icon"></i>Dashboard
                    </NavLink>
                    <NavLink to="/admin/prestamos" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeSidebar}>
                        <i className="fas fa-handshake icon"></i>Préstamos
                    </NavLink>
                    <NavLink to="/admin/devoluciones" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeSidebar}>
                        <i className="fas fa-undo icon"></i>Devoluciones
                    </NavLink>

                    <div className="sidebar-section-title mt-3">LIBROS</div>
                    <NavLink to="/admin/catalogo" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeSidebar}>
                        <i className="fas fa-book icon"></i>Libros
                    </NavLink>
                    <NavLink to="/admin/categorias" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeSidebar}>
                        <i className="fas fa-bookmark icon"></i>Categorías
                    </NavLink>

                    <div className="sidebar-section-title mt-3">USUARIOS</div>
                    <NavLink to="/admin/estudiantes" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} onClick={closeSidebar}>
                        <i className="fas fa-users icon"></i>Usuarios
                    </NavLink>
                </nav>
            </aside>

            <div className="page-content">
                <header className="navbar">
                    <button
                        type="button"
                        className="menu-toggle"
                        aria-label={sidebarOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
                        aria-expanded={sidebarOpen}
                        onClick={() => setSidebarOpen((o) => !o)}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <nav className="navbar-nav">
                        <span className="nav-link"><i className="fas fa-bell icon-lg text-primary"></i></span>
                        <span className="nav-link"><i className="fas fa-user-circle icon-lg text-secondary"></i></span>
                        <span className="nav-link">Admin</span>
                    </nav>
                </header>

                <div className="container admin-layout-stack">
                    <main className="admin-layout-main">
                        <Outlet />
                    </main>
                    <footer className="footer admin-layout-footer">
                        <p>&copy; Reservados todos los derechos</p>
                        <p>Designed by <a href="#">BIBLIOTECA VIRTUAL</a></p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
