import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLibros } from '../../services/api';

const AdminCatalogo = () => {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDatos = async () => {
            const data = await getLibros();
            setLibros(data);
            setLoading(false);
        };
        fetchDatos();
    }, []);

    return (
        <>
            <div className="header-content">
                <div>
                    <h1>Catálogo Interno (Admin)</h1>
                    <p className="breadcrumb">Home / Libros / Catálogo BD</p>
                </div>
                <Link to="/admin/registro-libros" className="btn btn-primary">
                    <i className="fas fa-plus icon-btn"></i>Añadir Libro
                </Link>
            </div>

            <div className="table-container">
                <div className="table-actions">
                    <div className="search-input">
                        <i className="fas fa-search search-icon"></i>
                        <input type="text" placeholder="Buscar tíulo..." />
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5">Cargando catálogo...</td></tr>
                        ) : (
                            libros.map(libro => (
                                <tr key={libro.id}>
                                    <td>{libro.id}</td>
                                    <td>{libro.titulo.substring(0, 20)}</td>
                                    <td>{libro.descripcion.substring(0, 30)}...</td>
                                    <td><span className={`badge ${libro.disponible ? 'bg-success' : 'bg-warning'}`}>
                                        {libro.disponible ? 'Disponible' : 'Ocupado'}    
                                    </span></td>
                                    <td className="actions">
                                        <button className="btn btn-sm btn-info icon-btn"><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-sm btn-danger icon-btn"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminCatalogo;
