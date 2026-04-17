import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="container py-5">
      <h1 className="h4 mb-3">Registro</h1>
      <p className="text-muted mb-3">Esta vista está pendiente de implementación.</p>
      <Link to="/login" className="btn btn-outline-secondary">
        Volver al inicio de sesión
      </Link>
    </div>
  )
}

export default Register
