import { PagePlaceholder } from '../../components/index.js'

/**
 * Página destinada à pausa temporária de módulos.
 *
 * @returns {import('react').JSX.Element} Placeholder com instruções iniciais.
 */
export default function PauseModulePage () {
  return (
    <PagePlaceholder
      icon="🗂️"
      title="Pausar módulo"
      description="Defina pausas estratégicas para reorganizar sua agenda sem perder o acompanhamento do orientador."
    />
  )
}
