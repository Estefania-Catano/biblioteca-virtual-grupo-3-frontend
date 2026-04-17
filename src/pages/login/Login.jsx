import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBook } from 'react-icons/fa'
import Footer from '../../components/Footer'
import { end_points } from '../../config/endPoints'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => localStorage.getItem('rememberedUser') ?? '')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => Boolean(localStorage.getItem('rememberedUser')))
  const [users, setUsers] = useState([])
  const [loadError, setLoadError] = useState('')
  const [loadingUsers, setLoadingUsers] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch(end_points.users)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data) => {
        if (cancelled) return
        const list = Array.isArray(data) ? data : data?.users ?? data?.content ?? []
        setUsers(Array.isArray(list) ? list : [])
      })
      .catch((error) => {
        console.error(error)
        if (cancelled) return
        setLoadError('No se pudo cargar la lista de usuarios. Revisa la API o VITE_API_URL.')
        setUsers([])
      })
      .finally(() => {
        if (!cancelled) setLoadingUsers(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  function findUser() {
    return users.find((item) => user === item.username && password === item.password)
  }

  function signIn(e) {
    e.preventDefault()
    if (user === '' || password === '') {
      alert('El usuario o la contraseña están vacíos.')
      return
    }
    const auth = findUser()
    if (auth) {
      if (remember) localStorage.setItem('rememberedUser', user)
      else localStorage.removeItem('rememberedUser')
      alert(`Bienvenido, ${auth.username ?? user}`)
      navigate('/')
      return
    }
    alert('Usuario o contraseña incorrectos.')
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg border-bottom bg-light">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <FaBook className="me-2 text-info" size={40} aria-hidden />
            <span className="navbar-brand mb-0 h1">Biblioteca Virtual</span>
          </div>
          <div className="d-flex">
            <Link to="/" className="btn btn-secondary">
              Regresar
            </Link>
          </div>
        </div>
      </nav>

      <div id="bannerLogin" className="flex-grow-1">
        <div className="container">
          <div className="login-container bg-white rounded shadow-sm mx-auto">
            <h2 className="text-center mb-4">Iniciar sesión</h2>
            {loadError && <div className="alert alert-warning small">{loadError}</div>}
            {loadingUsers && !loadError && (
              <div className="text-muted small mb-2">Cargando usuarios…</div>
            )}
            <form id="loginForm" onSubmit={signIn}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  autoComplete="username"
                  placeholder="Ingresa tu usuario"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  id="remember"
                  type="checkbox"
                  className="form-check-input"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="remember">
                  Recordarme
                </label>
              </div>
              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-info" disabled={loadingUsers}>
                  Iniciar sesión
                </button>
              </div>
              <div className="d-grid mb-3">
                <Link to="/register" className="btn btn-outline-info">
                  Registrarse
                </Link>
              </div>
              <div className="text-center mt-3">
                <a href="#" className="text-decoration-none" onClick={(e) => e.preventDefault()}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Login
