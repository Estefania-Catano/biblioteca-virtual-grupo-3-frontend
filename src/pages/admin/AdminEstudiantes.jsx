import React from 'react';
import { Link } from 'react-router-dom';

const AdminEstudiantes = () => {
    return (
        <>
            <div className="header-content">
                <div>
                    <h1>Usuarios</h1>
                    <p className="breadcrumb">Home / Usuarios</p>
                </div>
                <Link to="/admin/registro-estudiantes" className="btn btn-primary">
                    <i className="fas fa-user-plus icon-btn"></i>Nuevo usuario
                </Link>
            </div>

            <div className="table-container">
                <div className="table-actions">
                    <div className="search-input">
                        <i className="fas fa-search search-icon"></i>
                        <input type="search" placeholder="Buscar por nombre o correo..." />
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>U-2021001</td>
                            <td>Carlos Ramírez</td>
                            <td>carlos@ejemplo.com</td>
                            <td>Lector</td>
                            <td><span className="badge bg-success">Activo</span></td>
                            <td className="actions">
                                <button type="button" className="btn btn-sm btn-info icon-btn" title="Editar usuario">
                                    <i className="fas fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminEstudiantes;
