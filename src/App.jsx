import { useRoutes } from 'react-router-dom'
import { StudyProvider } from './context/StudyContext.jsx'
import { routes } from './routes/index.jsx'

/**
 * Componente raiz responsável por registrar as rotas da aplicação.
 *
 * @returns {import('react').JSX.Element} Árvore de rotas renderizada dentro do provedor de dados.
 */
export default function App () {
  const element = useRoutes(routes)

  if (!element) {
    throw new Error('Nenhuma rota ativa encontrada. Verifique a configuração de rotas.')
  }

  return (
    <StudyProvider>
      {element}
    </StudyProvider>
  )
}
