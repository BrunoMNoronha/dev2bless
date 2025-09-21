import { useMemo } from 'react'
import { Sidebar, Topbar, Hero, FinancialCards, CoursesList, InstructorsPanel, NoticesPanel } from './components/index.js'
import { StudyProvider, useStudy } from './context/StudyContext.jsx'

/**
 * Container principal do dashboard, responsável por orquestrar os componentes de apresentação.
 *
 * @returns {import('react').JSX.Element} Estrutura do dashboard.
 */
function Dashboard () {
  const study = useStudy()

  const currentDate = useMemo(() => new Date(), [])

  const financialCards = useMemo(() => ([
    { icon: '💰', title: 'A contribuir', amount: study.financas.aContribuir },
    { icon: '🧾', title: 'Contribuído no mês', amount: study.financas.contribuido, highlight: true },
    { icon: '📈', title: 'Outros', amount: study.financas.outros }
  ]), [
    study.financas.aContribuir,
    study.financas.contribuido,
    study.financas.outros
  ])

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Topbar usuario={study.usuario} />
        <Hero username={study.usuario.nome} currentDate={currentDate} />
        <div className="grid">
          <div>
            <FinancialCards cards={financialCards} />
            <CoursesList courses={study.cursos} />
          </div>
          <aside>
            <InstructorsPanel instructors={study.instrutores} />
            <NoticesPanel notices={study.avisos} />
          </aside>
        </div>
      </main>
    </div>
  )
}

/**
 * Componente raiz do aplicativo, responsável por prover o contexto de estudos.
 *
 * @returns {import('react').JSX.Element} Aplicação com provedor de contexto.
 */
export default function App () {
  return (
    <StudyProvider>
      <Dashboard />
    </StudyProvider>
  )
}
