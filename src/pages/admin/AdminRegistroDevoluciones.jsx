import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminRegistroDevoluciones = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire('Procesado', 'El libro ha sido marcado como Devuelto', 'success').then(() => navigate('/admin/devoluciones'));
    };

    return (
        <>
            <div className="header-content">
                <div>
                    <h1>Procesar Devolución</h1>
                    <p className="breadcrumb">Home / Principal / Devoluciones / Nueva</p>
                </div>
                <Link to="/admin/devoluciones" className="btn btn-secondary">
                    <i className="fas fa-arrow-left icon-btn"></i>Volver
                </Link>
            </div>

            <div className="add-edit-form-container">
                <form className="add-edit-form" onSubmit={handleSubmit}>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>ID del Préstamo o Libro</label>
                            <input type="text" placeholder="Escanea o escribe código..." required />
                        </div>
                        <div className="form-group">
                            <label>Observaciones (Daños, retrasos)</label>
                            <input type="text" placeholder="Opcional..." />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-warning">
                            <i className="fas fa-check icon-btn"></i>Confirmar Devolución
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminRegistroDevoluciones;
