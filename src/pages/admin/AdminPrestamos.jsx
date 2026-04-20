import React from 'react';
import { Link } from 'react-router-dom';

const AdminPrestamos = () => {
    return (
        <>
            <div className="header-content">
                <div>
                    <h1>Préstamos</h1>
                    <p className="breadcrumb">Home / Principal / Préstamos</p>
                </div>
                <Link to="/admin/registro-prestamo" className="btn btn-primary">
                    <i className="fas fa-plus icon-btn"></i>Registrar préstamo
                </Link>
            </div>

            <div className="table-container">
                <div className="table-actions">
                    <div className="search-input">
                        <i className="fas fa-search search-icon"></i>
                        <input type="search" placeholder="Buscar por libro o usuario..." />
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Libro</th>
                            <th>Usuario</th>
                            <th>Fecha préstamo</th>
                            <th>Fecha límite</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#P-9012</td>
                            <td>El Principito</td>
                            <td>Carlos Ramírez</td>
                            <td>01/04/2026</td>
                            <td>15/04/2026</td>
                            <td><span className="badge bg-success">Activo</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminPrestamos;
