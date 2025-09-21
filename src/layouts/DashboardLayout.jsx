import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, Topbar } from '../components/index.js'
import { useStudy } from '../context/StudyContext.jsx'

/**
 * Layout principal do dashboard, responsável por aplicar a navegação lateral e a barra superior.
 *
 * @returns {import('react').JSX.Element} Estrutura base compartilhada entre as páginas do painel.
 */
function DashboardLayoutComponent () {
  const { usuario } = useStudy()

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Topbar usuario={usuario} />
        <Outlet />
      </main>
    </div>
  )
}

const DashboardLayout = memo(DashboardLayoutComponent)
DashboardLayout.displayName = 'DashboardLayout'

export default DashboardLayout
