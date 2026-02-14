import { memo } from 'react'
import { Link, NavLink } from 'react-router-dom'

/**
 * @typedef {Object} SidebarLink
 * @property {string} icon Símbolo exibido ao lado do texto.
 * @property {string} label Rótulo amigável para a navegação.
 * @property {string} to Caminho interno que o link aponta.
 * @property {boolean} [end] Define se a correspondência deve ser exata.
 */

/** @type {SidebarLink[]} */
const SIDEBAR_LINKS = [
  { icon: '🏠', label: 'Painel', to: '/dashboard', end: true },
  { icon: '💳', label: 'Contribuições', to: '/contribuicoes' },
  { icon: '📝', label: 'Inscrição', to: '/inscricao' },
  { icon: '📚', label: 'Planos de estudo', to: '/planos' },
  { icon: '🗂️', label: 'Pausar módulo', to: '/pausar-modulo' },
  { icon: '🎯', label: 'Resultados', to: '/resultados' },
  { icon: '🔔', label: 'Avisos', to: '/avisos' },
  { icon: '📅', label: 'Agenda', to: '/agenda' },
  { icon: '📖', label: 'Documentação', to: '/documentacao' }
]

/** @type {{ icon: string, label: string, to: string }} */
const LOGOUT_LINK = { icon: '🚪', label: 'Sair', to: '/logout' }

/**
 * Renderiza a barra lateral de navegação do painel.
 *
 * @returns {import('react').JSX.Element} Estrutura JSX da barra lateral.
 */
function SidebarComponent () {
  return (
    <aside className="sidebar">
      <Link className="brand" aria-label="Ir para o painel" to="/dashboard">
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M12 2 1 7l11 5 9-4.09V14h2V7L12 2zm-7 9.27V17c0 2.76 3.5 8 5 8 5s8-2.24 8-5v-2.73l-8 3.64-8-3.64z" />
        </svg>
      </Link>
      <nav className="nav" aria-label="Navegação principal">
        {SIDEBAR_LINKS.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span className="icon" aria-hidden="true">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="spacer" />
      <Link className="nav-link logout" to={LOGOUT_LINK.to}>
        <span className="icon" aria-hidden="true">{LOGOUT_LINK.icon}</span>
        {LOGOUT_LINK.label}
      </Link>
    </aside>
  )
}

const Sidebar = memo(SidebarComponent)
Sidebar.displayName = 'Sidebar'

export default Sidebar
