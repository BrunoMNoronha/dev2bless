import { memo } from 'react'

/**
 * @typedef {Object} SidebarLink
 * @property {string} icon Emoji or icon representing the action.
 * @property {string} label Visible label for the link.
 * @property {string} href Target URL for the link.
 * @property {boolean} [isActive] Flag indicating whether the link is currently active.
 */

/** @type {SidebarLink[]} */
const SIDEBAR_LINKS = [
  { icon: '🏠', label: 'Painel', href: '#', isActive: true },
  { icon: '💳', label: 'Contribuições', href: '#' },
  { icon: '📝', label: 'Inscrição', href: '#' },
  { icon: '📚', label: 'Planos de estudo', href: '#' },
  { icon: '🗂️', label: 'Pausar módulo', href: '#' },
  { icon: '🎯', label: 'Resultados', href: '#' },
  { icon: '🔔', label: 'Avisos', href: '#' },
  { icon: '📅', label: 'Agenda', href: '#' }
]

/** @type {SidebarLink} */
const LOGOUT_LINK = { icon: '🚪', label: 'Sair', href: '#' }

/**
 * Renderiza a barra lateral de navegação do painel.
 *
 * @returns {import('react').JSX.Element} Estrutura JSX da barra lateral.
 */
function SidebarComponent () {
  return (
    <aside className="sidebar">
      <div className="brand" aria-label="Logo">
        <svg viewBox="0 0 24 24" role="img" aria-label="cap">
          <path d="M12 2 1 7l11 5 9-4.09V14h2V7L12 2zm-7 9.27V17c0 2.76 3.5 8 5 8 5s8-2.24 8-5v-2.73l-8 3.64-8-3.64z" />
        </svg>
      </div>
      <nav className="nav">
        {SIDEBAR_LINKS.map((link) => (
          <a
            key={link.label}
            className={link.isActive ? 'active' : undefined}
            href={link.href}
          >
            <span className="icon">{link.icon}</span>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="spacer" />
      <a className="nav logout" href={LOGOUT_LINK.href}>
        <span className="icon">{LOGOUT_LINK.icon}</span>
        {LOGOUT_LINK.label}
      </a>
    </aside>
  )
}

const Sidebar = memo(SidebarComponent)
Sidebar.displayName = 'Sidebar'

export default Sidebar
