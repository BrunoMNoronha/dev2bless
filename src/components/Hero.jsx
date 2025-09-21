import { memo, useMemo } from 'react'

/**
 * @typedef {Object} HeroProps
 * @property {string} username Nome do usuário exibido na saudação.
 * @property {Date} currentDate Data atual exibida na interface.
 */

/**
 * Seção hero com saudação personalizada e data atual.
 *
 * @param {HeroProps} props Propriedades do componente.
 * @returns {import('react').JSX.Element} Estrutura visual da seção hero.
 */
function HeroComponent ({ username, currentDate }) {
  const formattedDate = useMemo(() => (
    new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(currentDate)
  ), [currentDate])

  return (
    <section className="hero">
      <div>
        <div className="date">{formattedDate}</div>
        <h2>Bem-vindo de volta, {username}!</h2>
        <p>Mantenha o estudo bíblico em dia no seu portal</p>
      </div>
      <div className="hero-illu" aria-hidden="true">
        <div className="blob"></div>
        <svg className="gradcap" width="120" height="120" viewBox="0 0 24 24" fill="#1f1646" opacity=".95">
          <path d="M12 3 1 8l11 5 11-5-11-5Zm-6 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3l-8 3.64L6 12Z" />
        </svg>
      </div>
    </section>
  )
}

const Hero = memo(HeroComponent)
Hero.displayName = 'Hero'

export default Hero
