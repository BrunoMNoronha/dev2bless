import { useMemo } from 'react'
import { CoursesList, FinancialCards, Hero, InstructorsPanel, NoticesPanel } from '../../components/index.js'
import { useStudy } from '../../context/StudyContext.jsx'

/**
 * Página principal do painel com visão consolidada de estudos e finanças.
 *
 * @returns {import('react').JSX.Element} Conteúdo da rota de dashboard.
 */
export default function DashboardPage () {
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
    <>
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
    </>
  )
}
