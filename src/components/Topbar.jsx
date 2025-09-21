import { memo, useCallback } from 'react'

/**
 * @typedef {Object} Usuario
 * @property {string} nome Nome do usuário autenticado.
 * @property {string} periodo Período ou turma do usuário autenticado.
 */

/**
 * Cria manipuladores de foco e blur para destacar o campo de pesquisa.
 *
 * @param {string} focusShadow Valor de sombra aplicado ao focar.
 * @param {string} blurShadow Valor de sombra aplicado ao perder foco.
 * @returns {{
 *   handleFocus: import('react').FocusEventHandler<HTMLInputElement>,
 *   handleBlur: import('react').FocusEventHandler<HTMLInputElement>
 * }} Manipuladores memorizados de foco e blur.
 */
function useFocusShadow (focusShadow, blurShadow) {
  /**
   * @type {import('react').FocusEventHandler<HTMLInputElement>}
   */
  const handleFocus = useCallback((event) => {
    if (event.currentTarget.parentElement) {
      event.currentTarget.parentElement.style.boxShadow = focusShadow
    }
  }, [focusShadow])

  /**
   * @type {import('react').FocusEventHandler<HTMLInputElement>}
   */
  const handleBlur = useCallback((event) => {
    if (event.currentTarget.parentElement) {
      event.currentTarget.parentElement.style.boxShadow = blurShadow
    }
  }, [blurShadow])

  return { handleFocus, handleBlur }
}

/**
 * Barra superior com busca e informações do usuário.
 *
 * @param {{ usuario: Usuario }} props Propriedades do componente.
 * @returns {import('react').JSX.Element} Estrutura visual da barra superior.
 */
function TopbarComponent ({ usuario }) {
  const { handleFocus, handleBlur } = useFocusShadow(
    '0 12px 30px rgba(21,13,57,.12)',
    'var(--shadow)'
  )

  return (
    <div className="topbar">
      <div className="search" role="search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm10 17-5.2-5.2" stroke="#999" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Pesquisar"
          aria-label="search"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div className="profile">
        <div className="badge" title="alertas" />
        <div className="avatar">BR</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{usuario.nome}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{usuario.periodo}</div>
        </div>
      </div>
    </div>
  )
}

const Topbar = memo(TopbarComponent)
Topbar.displayName = 'Topbar'

export default Topbar
