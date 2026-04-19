import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminRegistroCategorias = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre) {
            Swal.fire('Error', 'El nombre es obligatorio', 'error');
            return;
        }
        
        Swal.fire({
            title: '¡Guardado!',
            text: 'Categoría agregada exitosamente',
            icon: 'success'
        }).then(() => {
            navigate('/admin/categorias');
        });
    };

    return (
        <>
            <div className="header-content">
                <div>
                    <h1>Registrar Categoría</h1>
                    <p className="breadcrumb">Home / Libros / Categorías / Nueva</p>
                </div>
                <Link to="/admin/categorias" className="btn btn-secondary">
                    <i className="fas fa-arrow-left icon-btn"></i>Volver
                </Link>
            </div>

            <div className="add-edit-form-container">
                <h4>Detalles de la Categoría</h4>
                <form className="add-edit-form" onSubmit={handleSubmit}>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Nombre de Categoría <span className="text-danger">*</span></label>
                            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Aventura" />
                        </div>
                    </div>
                    
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea rows="4" value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Agrega una breve descripción de los libros aquí..."></textarea>
                        </div>
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            <i className="fas fa-save icon-btn"></i>Guardar Categoría
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminRegistroCategorias;
