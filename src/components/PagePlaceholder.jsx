import { memo } from 'react'
import { Link } from 'react-router-dom'

/**
 * @typedef {Object} PagePlaceholderProps
 * @property {string} icon Emoji ou ícone que representa o módulo.
 * @property {string} title Título do placeholder exibido ao usuário.
 * @property {string} description Mensagem explicando o estado atual.
 * @property {{ label: string, to: string } | null} [action] Ação sugerida para o usuário.
 */

/**
 * Componente reutilizável para indicar páginas ainda em construção.
 *
 * @param {PagePlaceholderProps} props Propriedades do componente.
 * @returns {import('react').JSX.Element} Seção com mensagem orientativa.
 */
function PagePlaceholderComponent ({ icon, title, description, action = null }) {
  return (
    <section className="panel">
      <div className="placeholder" role="status" aria-live="polite">
        <div className="placeholder-icon" aria-hidden="true">{icon}</div>
        <div className="placeholder-body">
          <h1 className="page-title">{title}</h1>
          <p className="page-description">{description}</p>
          {action ? (
            <Link className="btn" to={action.to}>
              {action.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}

const PagePlaceholder = memo(PagePlaceholderComponent)
PagePlaceholder.displayName = 'PagePlaceholder'

export default PagePlaceholder
