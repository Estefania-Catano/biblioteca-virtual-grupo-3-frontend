import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminRegistroPrestamo = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        libro: '',
        usuario: '',
        fechaPrestamo: '',
        fechaLimite: '',
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.libro.trim() || !form.usuario.trim()) {
            Swal.fire({ title: 'Faltan datos', text: 'Indica libro y usuario.', icon: 'warning' });
            return;
        }
        Swal.fire({
            title: 'Préstamo registrado',
            text: 'El préstamo quedó registrado correctamente.',
            icon: 'success',
        }).then(() => navigate('/admin/prestamos'));
    };

    return (
        <>
            <div className="header-content">
                <div>
                    <h1>Nuevo préstamo</h1>
                    <p className="breadcrumb">Home / Principal / Préstamos / Registrar</p>
                </div>
                <Link to="/admin/prestamos" className="btn btn-secondary">
                    <i className="fas fa-arrow-left icon-btn"></i>Volver
                </Link>
            </div>

            <div className="add-edit-form-container">
                <h4>Datos del préstamo</h4>
                <form className="add-edit-form" onSubmit={handleSubmit}>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Libro <span className="text-danger">*</span></label>
                            <input
                                name="libro"
                                type="text"
                                required
                                placeholder="Título o código del libro"
                                value={form.libro}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Usuario <span className="text-danger">*</span></label>
                            <input
                                name="usuario"
                                type="text"
                                required
                                placeholder="Nombre o ID del usuario"
                                value={form.usuario}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Fecha de préstamo</label>
                            <input type="date" name="fechaPrestamo" value={form.fechaPrestamo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Fecha límite de devolución</label>
                            <input type="date" name="fechaLimite" value={form.fechaLimite} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            <i className="fas fa-save icon-btn"></i>Guardar préstamo
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminRegistroPrestamo;
