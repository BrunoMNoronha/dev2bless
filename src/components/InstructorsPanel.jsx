import { memo } from 'react'

/**
 * @typedef {Object} Instructor
 * @property {string} nome Nome do instrutor.
 */

/**
 * Painel lateral com os instrutores disponíveis.
 *
 * @param {{ instructors: Instructor[] }} props Propriedades contendo a lista de instrutores.
 * @returns {import('react').JSX.Element} Painel de instrutores.
 */
function InstructorsPanelComponent ({ instructors }) {
  return (
    <div className="panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <h3 className="section-title" style={{ margin: 0 }}>Instrutores</h3>
      </div>
      <div className="instructors">
        {instructors.map((instructor) => (
          <div key={instructor.nome} className="dot" title={instructor.nome}></div>
        ))}
      </div>
    </div>
  )
}

const InstructorsPanel = memo(InstructorsPanelComponent)
InstructorsPanel.displayName = 'InstructorsPanel'

export default InstructorsPanel
