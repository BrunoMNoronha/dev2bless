import { memo, useMemo } from 'react'

/**
 * @typedef {Object} FinancialCardDescriptor
 * @property {string} icon Ícone exibido no cartão.
 * @property {string} title Título do indicador.
 * @property {number} amount Valor numérico a ser formatado como moeda.
 * @property {boolean} [highlight] Indica se o cartão deve receber destaque visual.
 */

/**
 * Cria um formatador de moeda memorizado para evitar alocações repetidas.
 *
 * @param {string} locale Locale utilizado para a formatação.
 * @param {string} currency Código da moeda.
 * @returns {(value: number) => string} Função que formata números para moeda.
 */
function useCurrencyFormatter (locale, currency) {
  return useMemo(() => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    })
    return (value) => formatter.format(value)
  }, [locale, currency])
}

/**
 * Cartão individual de informações financeiras.
 *
 * @param {FinancialCardDescriptor} props Propriedades do cartão.
 * @returns {import('react').JSX.Element} Cartão renderizado.
 */
function FinancialCardComponent ({ icon, title, amount, highlight = false }) {
  const formatCurrency = useCurrencyFormatter('pt-BR', 'BRL')

  return (
    <div className="card" style={highlight ? { outline: '3px solid var(--primary-200)' } : undefined}>
      <div className="kpi">
        <div className="kpi-icon">{icon}</div>
        <div>
          <div className="kpi-value">{formatCurrency(amount)}</div>
          <div className="kpi-title">{title}</div>
        </div>
      </div>
    </div>
  )
}

const FinancialCard = memo(FinancialCardComponent)
FinancialCard.displayName = 'FinancialCards.Card'

/**
 * Lista de cartões financeiros, implementada com o padrão de componentes compostos
 * para permitir variações futuras sem alterar o container.
 *
 * @param {{ cards: FinancialCardDescriptor[], children?: import('react').ReactNode }} props Propriedades do container.
 * @returns {import('react').JSX.Element} Container renderizado dos cartões financeiros.
 */
function FinancialCardsComponent ({ cards, children }) {
  return (
    <section>
      <h3 className="section-title">Finanças</h3>
      <div className="cards">
        {cards.map((card) => (
          <FinancialCard key={card.title} {...card} />
        ))}
        {children}
      </div>
    </section>
  )
}

const FinancialCards = memo(FinancialCardsComponent)
FinancialCards.displayName = 'FinancialCards'
FinancialCards.Card = FinancialCard

export default FinancialCards
