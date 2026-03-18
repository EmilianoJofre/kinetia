import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import JugadoresList from './pages/jugadores/JugadoresList'
import JugadorDetail from './pages/jugadores/JugadorDetail'
import JugadorForm from './pages/jugadores/JugadorForm'
import EquiposList from './pages/equipos/EquiposList'
import EquipoDetail from './pages/equipos/EquipoDetail'
import EquipoForm from './pages/equipos/EquipoForm'
import PartidosList from './pages/partidos/PartidosList'
import PartidoForm from './pages/partidos/PartidoForm'
import EntrenamientosList from './pages/entrenamientos/EntrenamientosList'
import EntrenamientoForm from './pages/entrenamientos/EntrenamientoForm'
import EvaluacionesList from './pages/evaluaciones/EvaluacionesList'
import EvaluacionForm from './pages/evaluaciones/EvaluacionForm'
import LesionesList from './pages/lesiones/LesionesList'
import LesionForm from './pages/lesiones/LesionForm'
import UsuariosList from './pages/usuarios/UsuariosList'
import UsuarioForm from './pages/usuarios/UsuarioForm'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jugadores" element={<JugadoresList />} />
        <Route path="jugadores/nuevo" element={<JugadorForm />} />
        <Route path="jugadores/:id" element={<JugadorDetail />} />
        <Route path="jugadores/:id/editar" element={<JugadorForm />} />
        <Route path="equipos" element={<EquiposList />} />
        <Route path="equipos/nuevo" element={<EquipoForm />} />
        <Route path="equipos/:id" element={<EquipoDetail />} />
        <Route path="equipos/:id/editar" element={<EquipoForm />} />
        <Route path="partidos" element={<PartidosList />} />
        <Route path="partidos/nuevo" element={<PartidoForm />} />
        <Route path="partidos/:id/editar" element={<PartidoForm />} />
        <Route path="entrenamientos" element={<EntrenamientosList />} />
        <Route path="entrenamientos/nuevo" element={<EntrenamientoForm />} />
        <Route path="entrenamientos/:id/editar" element={<EntrenamientoForm />} />
        <Route path="evaluaciones" element={<EvaluacionesList />} />
        <Route path="evaluaciones/nuevo" element={<EvaluacionForm />} />
        <Route path="evaluaciones/:id/editar" element={<EvaluacionForm />} />
        <Route path="lesiones" element={<LesionesList />} />
        <Route path="lesiones/nuevo" element={<LesionForm />} />
        <Route path="lesiones/:id/editar" element={<LesionForm />} />
        <Route path="usuarios" element={<UsuariosList />} />
        <Route path="usuarios/nuevo" element={<UsuarioForm />} />
        <Route path="usuarios/:id/editar" element={<UsuarioForm />} />
      </Route>
    </Routes>
  )
}
