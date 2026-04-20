import React from 'react';
import { Link } from 'react-router-dom';

const AdminCategorias = () => {
    return (
        <>
            <div className="header-content">
                <div>
                    <h1>Categorías</h1>
                    <p className="breadcrumb">Home / Libros / Categorías</p>
                </div>
                <Link to="/admin/registro-categorias" className="btn btn-primary">
                    <i className="fas fa-plus icon-btn"></i>Nueva Categoría
                </Link>
            </div>

            <div className="table-container">
                <div className="table-actions">
                    <div className="search-input">
                        <i className="fas fa-search search-icon"></i>
                        <input type="text" placeholder="Buscar categoría..." />
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID Categoría</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Ficción</td>
                            <td>Libros que contienen historias irreales</td>
                            <td className="actions">
                                <button className="btn btn-sm btn-info icon-btn" title="Editar"><i className="fas fa-edit"></i></button>
                                <button className="btn btn-sm btn-danger icon-btn" title="Eliminar"><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Ciencia</td>
                            <td>Divulgación y material científico</td>
                            <td className="actions">
                                <button className="btn btn-sm btn-info icon-btn" title="Editar"><i className="fas fa-edit"></i></button>
                                <button className="btn btn-sm btn-danger icon-btn" title="Eliminar"><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminCategorias;
