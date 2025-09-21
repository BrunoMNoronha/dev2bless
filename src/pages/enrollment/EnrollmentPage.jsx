import { PagePlaceholder } from '../../components/index.js'

/**
 * Página de gerenciamento de inscrição do aluno.
 *
 * @returns {import('react').JSX.Element} Placeholder indicando implementação futura.
 */
export default function EnrollmentPage () {
  return (
    <PagePlaceholder
      icon="📝"
      title="Inscrição"
      description="Gerencie seus dados acadêmicos e documentações. Em breve você poderá atualizar informações diretamente pelo painel."
      action={{ label: 'Voltar para o painel', to: '/dashboard' }}
    />
  )
}
