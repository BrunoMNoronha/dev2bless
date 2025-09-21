import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout.jsx'

const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage.jsx'))
const ContributionsPage = lazy(() => import('../pages/contributions/ContributionsPage.jsx'))
const EnrollmentPage = lazy(() => import('../pages/enrollment/EnrollmentPage.jsx'))
const StudyPlansPage = lazy(() => import('../pages/study-plans/StudyPlansPage.jsx'))
const PauseModulePage = lazy(() => import('../pages/pause-module/PauseModulePage.jsx'))
const ResultsPage = lazy(() => import('../pages/results/ResultsPage.jsx'))
const NoticesPage = lazy(() => import('../pages/notices/NoticesPage.jsx'))
const AgendaPage = lazy(() => import('../pages/agenda/AgendaPage.jsx'))
const LogoutPage = lazy(() => import('../pages/logout/LogoutPage.jsx'))

/**
 * Envolve um nó em <Suspense> aplicando um fallback padrão do painel.
 *
 * @param {import('react').ReactNode} node Elemento que deve aguardar carregamento dinâmico.
 * @returns {import('react').JSX.Element} Elemento protegido por suspense.
 */
function withSuspense (node) {
  return (
    <Suspense fallback={<div className="panel loading-state" role="status" aria-live="polite">Carregando...</div>}>
      {node}
    </Suspense>
  )
}

/** @type {import('react-router-dom').RouteObject[]} */
export const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: withSuspense(<DashboardPage />) },
      { path: 'contribuicoes', element: withSuspense(<ContributionsPage />) },
      { path: 'inscricao', element: withSuspense(<EnrollmentPage />) },
      { path: 'planos', element: withSuspense(<StudyPlansPage />) },
      { path: 'pausar-modulo', element: withSuspense(<PauseModulePage />) },
      { path: 'resultados', element: withSuspense(<ResultsPage />) },
      { path: 'avisos', element: withSuspense(<NoticesPage />) },
      { path: 'agenda', element: withSuspense(<AgendaPage />) },
      { path: 'logout', element: withSuspense(<LogoutPage />) }
    ]
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> }
]
