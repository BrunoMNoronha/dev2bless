import { memo } from 'react'

/**
 * @typedef {Object} Notice
 * @property {string} titulo Título do aviso.
 * @property {string} texto Conteúdo resumido do aviso.
 */

/**
 * Painel com os avisos do dia.
 *
 * @param {{ notices: Notice[] }} props Propriedades contendo os avisos.
 * @returns {import('react').JSX.Element} Painel de avisos.
 */
function NoticesPanelComponent ({ notices }) {
  return (
    <div className="panel" style={{ marginTop: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <h3 className="section-title" style={{ margin: 0 }}>Avisos do dia</h3>
        <a className="seeall" href="#">Ver todos</a>
      </div>
      <div className="notice">
        {notices.map((notice) => (
          <div key={notice.titulo} className="notice-item">
            <h4>{notice.titulo}</h4>
            <p>{notice.texto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const NoticesPanel = memo(NoticesPanelComponent)
NoticesPanel.displayName = 'NoticesPanel'

export default NoticesPanel
