import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { crearLibro } from '../../services/api';

const AdminRegistroLibros = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ titulo: '', categoria: 'Ficción', descripcion: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await crearLibro(formData);
            Swal.fire('¡Éxito!', 'Libro registrado', 'success').then(() => navigate('/admin/catalogo'));
        } catch {
            Swal.fire('Error', 'Fallo al guardar', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="header-content">
                <div>
                    <h1>Añadir Libro</h1>
                    <p className="breadcrumb">Home / Libros / Catálogo / Insertar</p>
                </div>
                <Link to="/admin/catalogo" className="btn btn-secondary">
                    <i className="fas fa-arrow-left icon-btn"></i>Volver
                </Link>
            </div>

            <div className="add-edit-form-container">
                <form className="add-edit-form" onSubmit={handleSubmit}>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Título del Libro <span className="text-danger">*</span></label>
                            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Categoría <span className="text-danger">*</span></label>
                            <select name="categoria" value={formData.categoria} onChange={handleChange}>
                                <option>Ficción</option><option>Ciencia</option><option>Historia</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Descripción / Reseña <span className="text-danger">*</span></label>
                            <textarea rows="3" name="descripcion" value={formData.descripcion} onChange={handleChange} required></textarea>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            <i className="fas fa-save icon-btn"></i>Registrar Libro a BD
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminRegistroLibros;
