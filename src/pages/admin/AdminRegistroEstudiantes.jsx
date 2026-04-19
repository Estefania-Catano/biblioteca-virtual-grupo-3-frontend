import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminRegistroEstudiantes = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombres: '',
        apellidos: '',
        matricula: '',
        email: '',
        rol: 'lector',
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Usuario registrado',
            text: `${form.nombres} ${form.apellidos}`.trim() || 'El usuario se guardó correctamente.',
            icon: 'success',
        }).then(() => navigate('/admin/estudiantes'));
    };

    return (
        <>
            <div className="header-content">
                <div>
                    <h1>Registro de Usuario</h1>
                    <p className="breadcrumb">Home / Usuarios / Nuevo usuario</p>
                </div>
                <Link to="/admin/estudiantes" className="btn btn-secondary">
                    <i className="fas fa-arrow-left icon-btn"></i>Volver
                </Link>
            </div>

            <div className="add-edit-form-container">
                <h4>Datos del usuario</h4>
                <form className="add-edit-form" onSubmit={handleSubmit}>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Nombre(s) <span className="text-danger">*</span></label>
                            <input
                                name="nombres"
                                type="text"
                                required
                                placeholder="Nombre del usuario"
                                value={form.nombres}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellidos <span className="text-danger">*</span></label>
                            <input
                                name="apellidos"
                                type="text"
                                required
                                placeholder="Apellidos"
                                value={form.apellidos}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Identificador / ID</label>
                            <input
                                name="matricula"
                                type="text"
                                placeholder="Ej. U-100234"
                                value={form.matricula}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Correo electrónico <span className="text-danger">*</span></label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="usuario@correo.com"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Rol en la plataforma</label>
                            <select name="rol" value={form.rol} onChange={handleChange}>
                                <option value="lector">Lector</option>
                                <option value="bibliotecario">Bibliotecario</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            <i className="fas fa-save icon-btn"></i>Guardar usuario
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminRegistroEstudiantes;
