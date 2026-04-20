import React from 'react';
import { Link } from 'react-router-dom';

const AdminDevoluciones = () => {
    return (
        <>
            <div className="header-content">
                <div>
                    <h1>Devoluciones</h1>
                    <p className="breadcrumb">Home / Principal / Devoluciones</p>
                </div>
                <Link to="/admin/registro-devoluciones" className="btn btn-primary">
                    <i className="fas fa-undo icon-btn"></i>Procesar Devolución
                </Link>
            </div>

            <div className="table-container">
                <div className="table-actions">
                    <div className="search-input">
                        <i className="fas fa-search search-icon"></i>
                        <input type="text" placeholder="Buscar libro devuelto..." />
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Préstamo ID</th>
                            <th>Libro</th>
                            <th>Estudiante</th>
                            <th>Fecha Devolución</th>
                            <th>Estado Multas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#9012</td>
                            <td>El Principito</td>
                            <td>Carlos Ramirez</td>
                            <td>12/04/2026</td>
                            <td><span className="badge bg-success">Sin multas</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminDevoluciones;
