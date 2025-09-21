import { PagePlaceholder } from '../../components/index.js'

/**
 * Página de confirmação de encerramento de sessão.
 *
 * @returns {import('react').JSX.Element} Orientação para efetuar logout seguro.
 */
export default function LogoutPage () {
  return (
    <PagePlaceholder
      icon="🚪"
      title="Deseja sair?"
      description="Por questões de segurança, confirme sua saída utilizando o menu do canto superior direito."
      action={{ label: 'Voltar ao painel', to: '/dashboard' }}
    />
  )
}
