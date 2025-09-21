import { useStudy } from '../../context/StudyContext.jsx'

/**
 * Página com a listagem completa de avisos recentes.
 *
 * @returns {import('react').JSX.Element} Lista expandida de comunicados.
 */
export default function NoticesPage () {
  const { avisos } = useStudy()

  return (
    <section className="panel">
      <header className="page-header">
        <h1 className="page-title">Avisos</h1>
        <p className="page-description">Acompanhe as comunicações mais recentes da coordenação e dos orientadores.</p>
      </header>
      <ul className="notice-list">
        {avisos.map((notice) => (
          <li key={notice.titulo} className="notice-entry">
            <h3 className="notice-entry-title">{notice.titulo}</h3>
            <p className="notice-entry-text">{notice.texto}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
