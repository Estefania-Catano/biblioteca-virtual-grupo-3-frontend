import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import Footer from '../../components/Footer'
import { end_points } from '../../config/endPoints'
import { esRolAdmin } from '../../helpers/roles'
import { guardarSesion } from '../../helpers/session'
import { notifyApiResult, showError, showSuccess, showWarning, showInfo } from '../../helpers/alerts'
import { useAuth } from '../../contexts/AuthContext'
import './Login.css'

const Login = () => {
  const authContext = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState(() => localStorage.getItem('rememberedUser') ?? '')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => Boolean(localStorage.getItem('rememberedUser')))
  const [usuarios, setUsuarios] = useState([])
  const [loadingUsuarios, setLoadingUsuarios] = useState(true)
  const avisoSinUsuarios = useRef(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const response = await fetch(end_points.usuarios)
        let data = {}
        try {
          data = await response.json()
        } catch {
          data = {}
        }
        if (!response.ok) {
          if (!cancelled) {
            setUsuarios([])
            await notifyApiResult(response, data)
          }
          return
        }
        if (cancelled) return
        const list = Array.isArray(data) ? data : data?.usuarios ?? data?.content ?? []
        const arr = Array.isArray(list) ? list : []
        setUsuarios(arr)
        if (arr.length === 0 && !avisoSinUsuarios.current) {
          avisoSinUsuarios.current = true
          await showInfo(
            'AÃºn no hay usuarios registrados. Debes crear primero la cuenta del administrador.',
            'ConfiguraciÃ³n inicial',
          )
          navigate('/register?registroInicial=1', { replace: true })
        }
      } catch (error) {
        console.error(error)
        if (!cancelled) {
          setUsuarios([])
          await showError(
            error instanceof Error ? error.message : 'Comprueba tu conexiÃ³n e intÃ©ntalo de nuevo.',
            'Sin conexiÃ³n',
          )
        }
      } finally {
        if (!cancelled) setLoadingUsuarios(false)
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [navigate])

  function buscarUsuario() {
    const emailTrim = email.trim()
    return usuarios.find((item) => emailTrim === (item.email ?? '').trim() && password === item.password)
  }

  async function signIn(e) {
    e.preventDefault()
    if (email.trim() === '' || password === '') {
      await showWarning('Completa el correo y la contraseÃ±a para continuar.', 'Campos vacÃ­os')
      return
    }
    if (usuarios.length === 0) {
      await showWarning('No hay usuarios registrados. Registra primero al administrador.', 'AcciÃ³n requerida')
      navigate('/register?registroInicial=1')
      return
    }

    const authUser = buscarUsuario()
    if (authUser) {
      const rolDesc = (authUser.rol?.descripcion ?? '').toString()
      authContext.login({
        id: authUser.id,
        email: (authUser.email ?? '').trim(),
        name: authUser.perfil?.nombre ?? authUser.email?.split('@')[0] ?? 'Usuario',
        rolDescripcion: rolDesc,
      })

      if (remember) localStorage.setItem('rememberedUser', email.trim())
      else localStorage.removeItem('rememberedUser')

      guardarSesion({
        id: authUser.id,
        email: (authUser.email ?? '').trim(),
        rolDescripcion: rolDesc,
      })

      await showSuccess(`Bienvenido, ${authUser.email ?? email}.`, 'Inicio de sesiÃ³n')
      if (esRolAdmin(authUser.rol)) {
        navigate('/admin/dashboard')
      } else {
        navigate('/usuario/perfil')
      }
      return
    }

    await showError('Correo o contraseÃ±a incorrectos.', 'No se pudo iniciar sesiÃ³n')
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg border-bottom bg-light">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <img
              src={Logo}
              alt="Logo"
              width={70}
              height={50}
              className="d-inline-block align-text-top me-2"
            />
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
            <h2 className="text-center mb-4">Iniciar sesiÃ³n</h2>
            {loadingUsuarios && <div className="text-muted small mb-2">Cargandoâ€¦</div>}
            <form id="loginForm" onSubmit={signIn}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Correo electrÃ³nico
                </label>
                <input
                  id="username"
                  type="email"
                  className="form-control"
                  autoComplete="username"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  ContraseÃ±a
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseÃ±a"
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
                <button type="submit" className="btn btn-info" disabled={loadingUsuarios}>
                  Iniciar sesiÃ³n
                </button>
              </div>
              <div className="d-grid mb-3">
                <Link to="/register" className="btn btn-outline-info">
                  Registrarse
                </Link>
              </div>
              <div className="text-center mt-3">
                <a href="#" className="text-decoration-none" onClick={(e) => e.preventDefault()}>
                  Â¿Olvidaste tu contraseÃ±a?
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
