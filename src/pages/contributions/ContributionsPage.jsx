import { useMemo } from 'react'
import { FinancialCards } from '../../components/index.js'
import { useStudy } from '../../context/StudyContext.jsx'

/**
 * @typedef {Object} ContributionHighlight
 * @property {string} icon Emoji exibido no cartão.
 * @property {string} title Título do indicador.
 * @property {number} amount Valor numérico associado.
 * @property {boolean} [highlight] Indica se o cartão deve ter ênfase visual.
 */

/**
 * @typedef {Object} ContributionTimelineEntry
 * @property {string} title Título da linha do tempo.
 * @property {string} description Descrição detalhando o item.
 * @property {string} amount Valor formatado a ser exibido ao usuário.
 */

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

/**
 * Formata valores numéricos para moeda brasileira.
 *
 * @param {number} value Valor a ser formatado.
 * @returns {string} Valor formatado em BRL.
 */
function formatCurrency (value) {
  return currencyFormatter.format(value)
}

/**
 * Monta o resumo principal de contribuições em formato de cartões.
 *
 * @param {import('../../context/StudyContext.jsx').Financas} financas Dados financeiros do contexto.
 * @returns {ContributionHighlight[]} Cartões resumidos.
 */
function useContributionHighlights (financas) {
  return useMemo(() => ([
    { icon: '💰', title: 'A contribuir', amount: financas.aContribuir },
    { icon: '🧾', title: 'Contribuído no mês', amount: financas.contribuido, highlight: true },
    { icon: '📦', title: 'Outros compromissos', amount: financas.outros }
  ]), [
    financas.aContribuir,
    financas.contribuido,
    financas.outros
  ])
}

/**
 * Página com visão detalhada das contribuições e compromissos financeiros.
 *
 * @returns {import('react').JSX.Element} Estrutura da rota de contribuições.
 */
export default function ContributionsPage () {
  const { financas } = useStudy()
  const highlights = useContributionHighlights(financas)

  /** @type {ContributionTimelineEntry[]} */
  const timeline = useMemo(() => ([
    {
      title: 'Próxima contribuição',
      description: 'Planeje-se para manter seus compromissos em dia.',
      amount: formatCurrency(financas.aContribuir)
    },
    {
      title: 'Total contribuído em 2024',
      description: 'Soma do que já foi aportado no ano letivo.',
      amount: formatCurrency(financas.contribuido + financas.outros)
    },
    {
      title: 'Outros investimentos',
      description: 'Materiais, livros e ofertas pontuais.',
      amount: formatCurrency(financas.outros)
    }
  ]), [
    financas.aContribuir,
    financas.contribuido,
    financas.outros
  ])

  return (
    <section className="panel">
      <header className="page-header">
        <h1 className="page-title">Contribuições</h1>
        <p className="page-description">
          Acompanhe seus compromissos financeiros com o seminário e mantenha-se em dia.
        </p>
      </header>

      <div className="cards cards--compact">
        {highlights.map((card) => (
          <FinancialCards.Card key={card.title} {...card} />
        ))}
      </div>

      <ul className="contribution-list">
        {timeline.map((item) => (
          <li key={item.title} className="contribution-item">
            <div>
              <h3 className="contribution-title">{item.title}</h3>
              <p className="contribution-description">{item.description}</p>
            </div>
            <span className="contribution-amount">{item.amount}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
