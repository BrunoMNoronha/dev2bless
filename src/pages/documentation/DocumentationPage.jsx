import { useState, useEffect, memo } from 'react'
import { useParams } from 'react-router-dom'
import './DocumentationPage.css'

/**
 * @typedef {Object} DocumentationSection
 * @property {string} id Identificador único da documentação
 * @property {string} title Título exibido na interface
 * @property {string} file Nome do arquivo markdown
 * @property {string} icon Emoji representativo
 * @property {string} description Descrição breve da documentação
 */

/** @type {DocumentationSection[]} */
const DOCUMENTATION_SECTIONS = [
  {
    id: 'readme',
    title: 'Guia Principal',
    file: 'README.md',
    icon: '📘',
    description: 'Visão geral do projeto, estrutura e instruções de uso'
  },
  {
    id: 'development',
    title: 'Guia de Desenvolvimento',
    file: 'DESENVOLVIMENTO.md',
    icon: '⚙️',
    description: 'Como adicionar features, componentes e padrões de código'
  },
  {
    id: 'architecture',
    title: 'Arquitetura do Projeto',
    file: 'ARQUITETURA.md',
    icon: '🏗️',
    description: 'Estrutura técnica, fluxo de dados e integração com backend'
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    file: 'ROADMAP.md',
    icon: '🗺️',
    description: 'Funcionalidades planejadas e timeline de desenvolvimento'
  }
]

/**
 * Renderiza o conteúdo markdown formatado
 * @param {string} content Conteúdo markdown
 * @returns {import('react').JSX.Element}
 */
function renderMarkdown (content) {
  // Converter markdown simples para HTML estruturado
  const lines = content.split('\n')
  const elements = []
  let currentList = []
  let inCodeBlock = false
  let codeBlockContent = ''
  let codeBlockLanguage = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Blocos de código
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className="code-block">
            <code className={`language-${codeBlockLanguage}`}>{codeBlockContent}</code>
          </pre>
        )
        inCodeBlock = false
        codeBlockContent = ''
      } else {
        inCodeBlock = true
        codeBlockLanguage = line.slice(3).trim() || 'plaintext'
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockContent += line + '\n'
      continue
    }

    // Títulos
    if (line.startsWith('### ')) {
      if (currentList.length > 0) {
        elements.push(<ul key={`list-${i}`}>{currentList}</ul>)
        currentList = []
      }
      elements.push(
        <h3 key={`h3-${i}`} className="doc-h3">{line.slice(4)}</h3>
      )
      continue
    }

    if (line.startsWith('## ')) {
      if (currentList.length > 0) {
        elements.push(<ul key={`list-${i}`}>{currentList}</ul>)
        currentList = []
      }
      elements.push(
        <h2 key={`h2-${i}`} className="doc-h2">{line.slice(3)}</h2>
      )
      continue
    }

    if (line.startsWith('# ')) {
      if (currentList.length > 0) {
        elements.push(<ul key={`list-${i}`}>{currentList}</ul>)
        currentList = []
      }
      elements.push(
        <h1 key={`h1-${i}`} className="doc-h1">{line.slice(2)}</h1>
      )
      continue
    }

    // Listas
    if (line.startsWith('- ') || line.startsWith('• ')) {
      currentList.push(
        <li key={`item-${i}`}>{line.slice(2)}</li>
      )
      continue
    }

    // Linha vazia (parágrafo)
    if (line.trim() === '') {
      if (currentList.length > 0) {
        elements.push(<ul key={`list-${i}`}>{currentList}</ul>)
        currentList = []
      }
      elements.push(<br key={`br-${i}`} />)
      continue
    }

    // Parágrafo normal
    if (currentList.length > 0) {
      elements.push(<ul key={`list-${i}`}>{currentList}</ul>)
      currentList = []
    }

    // Transformar inline code, bold e links
    let processedLine = line
    processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    processedLine = processedLine.replace(/`(.*?)`/g, '<code className="inline-code">$1</code>')
    processedLine = processedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

    elements.push(
      <p key={`p-${i}`} className="doc-paragraph" dangerouslySetInnerHTML={{ __html: processedLine }} />
    )
  }

  if (currentList.length > 0) {
    elements.push(<ul key="final-list">{currentList}</ul>)
  }

  if (inCodeBlock) {
    elements.push(
      <pre key="final-code" className="code-block">
        <code className={`language-${codeBlockLanguage}`}>{codeBlockContent}</code>
      </pre>
    )
  }

  return elements
}

/**
 * Componente de visualização de documentação com abas navegáveis.
 *
 * @returns {import('react').JSX.Element} Página de documentação renderizada.
 */
function DocumentationPageComponent () {
  const { doc } = useParams()
  const [activeDoc, setActiveDoc] = useState(doc || 'readme')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setActiveDoc(doc || 'readme')
  }, [doc])

  useEffect(() => {
    const loadDocumentation = async () => {
      setLoading(true)
      setError(null)

      try {
        const section = DOCUMENTATION_SECTIONS.find(s => s.id === activeDoc)
        if (!section) {
          setError('Documentação não encontrada')
          setContent('')
          return
        }

        // Simular carregamento de arquivo markdown
        // Em produção, isso viria de um servidor real
        const mockContent = getMockDocumentation(section.id)
        setContent(mockContent)
      } catch (err) {
        setError('Erro ao carregar documentação: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDocumentation()
  }, [activeDoc])

  return (
    <div className="documentation-page">
      <header className="doc-header">
        <h1>📖 Documentação</h1>
        <p>Explore a documentação completa do projeto dev2bless</p>
      </header>

      <div className="doc-container">
        {/* Navegação lateral */}
        <aside className="doc-sidebar">
          <h2>Documentos</h2>
          <nav className="doc-nav">
            {DOCUMENTATION_SECTIONS.map(section => (
              <button
                key={section.id}
                className={`doc-nav-link ${activeDoc === section.id ? 'active' : ''}`}
                onClick={() => setActiveDoc(section.id)}
                aria-selected={activeDoc === section.id}
              >
                <span className="doc-icon">{section.icon}</span>
                <div className="doc-nav-content">
                  <div className="doc-nav-title">{section.title}</div>
                  <div className="doc-nav-desc">{section.description}</div>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Conteúdo principal */}
        <main className="doc-content">
          {loading && (
            <div className="doc-loading" role="status" aria-live="polite">
              <div className="spinner"></div>
              <p>Carregando documentação...</p>
            </div>
          )}

          {error && (
            <div className="doc-error" role="alert">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && content && (
            <div className="doc-markdown">
              {renderMarkdown(content)}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

/**
 * Retorna o conteúdo mock da documentação
 * @param {string} docId ID da documentação
 * @returns {string}
 */
function getMockDocumentation (docId) {
  const docs = {
    readme: `# README - dev2bless

## 🎓 Sobre o Projeto

**dev2bless** é uma plataforma de gestão de estudos desenvolvida em React com arquitetura modular e escalável.

## 🚀 Características Principais

- Dashboard intuitivo com painel de controle
- Gestão de contribuições e inscrições
- Sistema de planos de estudo personalizados
- Pausar módulos quando necessário
- Acompanhamento de resultados em tempo real
- Avisos e notificações importantes
- Calendário integrado para agendamento

## 📁 Estrutura de Arquivos

\`\`\`
src/
├── pages/           # Páginas da aplicação
├── components/      # Componentes reutilizáveis
├── layouts/         # Layouts da aplicação
├── context/         # Context API para estado global
├── routes/          # Configuração de rotas
└── App.jsx          # Componente raiz
\`\`\`

## 🛠️ Stack Tecnológico

- **Frontend**: React 18+
- **Roteamento**: React Router v6
- **Styling**: CSS Modular
- **Estado Global**: Context API
- **Build**: Vite

## 📖 Scripts Disponíveis

- \`npm run dev\` - Inicia servidor de desenvolvimento
- \`npm run build\` - Cria build de produção
- \`npm run preview\` - Visualiza build de produção

## 🎯 Próximos Passos

1. Implementar autenticação com JWT
2. Conectar com backend real
3. Adicionar testes automatizados
4. Melhorar UX/UI com animations`,

    development: `# Guia de Desenvolvimento

## 📚 Como Adicionar Novas Páginas

### Passo 1: Criar Arquivo da Página
Crie um novo arquivo em \`src/pages/[feature-name]/[FeatureName]Page.jsx\`:

\`\`\`jsx
import { memo } from 'react'
import './FeaturePage.css'

function FeaturePageComponent () {
  return (
    <div className="panel">
      <h1>Feature Page</h1>
      <p>Conteúdo aqui</p>
    </div>
  )
}

const FeaturePage = memo(FeaturePageComponent)
export default FeaturePage
\`\`\`

### Passo 2: Adicionar Rota
Edite \`src/routes/index.jsx\` e adicione a rota:

\`\`\`jsx
const FeaturePage = lazy(() => import('../pages/feature/FeaturePage.jsx'))

// No array de rotas:
{ path: 'feature', element: withSuspense(<FeaturePage />) }
\`\`\`

## 🧩 Como Adicionar Componentes

Crie em \`src/components/[ComponentName].jsx\` seguindo o padrão:

\`\`\`jsx
import { memo } from 'react'

function ComponentNameComponent (props) {
  return <div>{/* JSX aqui */}</div>
}

const ComponentName = memo(ComponentNameComponent)
export default ComponentName
\`\`\`

## 🔄 Usando o Context

Use o hook \`useStudy\` para acessar dados globais:

\`\`\`jsx
import { useStudy } from '../context/StudyContext'

export default function MyComponent () {
  const { usuario, cursos } = useStudy()
  return <div>{usuario.nome}</div>
}
\`\`\`

## 🎨 Estilos

Cada componente deve ter seu arquivo \`.css\` correspondente com class names semânticos.`,

    architecture: `# Arquitetura do Projeto

## 🏗️ Estrutura Geral

\`\`\`
┌─────────────────────────────┐
│      React App (Root)       │
├─────────────────────────────┤
│    StudyProvider (Context)  │
├─────────────────────────────┤
│    Router (React Router)    │
├─────────────────────────────┤
│  DashboardLayout            │
│  ├── Sidebar (Navegação)    │
│  ├── Topbar (Header)        │
│  └── Outlet (Páginas)       │
└─────────────────────────────┘
\`\`\`

## 🔄 Fluxo de Dados

1. **Dados Globais**: Armazenados no Context
2. **Props**: Componentes recebem dados via props
3. **Callbacks**: Ações são passadas via funções callback
4. **Side Effects**: useEffect para sincronizações

## 📦 Componentes Principais

### Sidebar
Navegação lateral com links para todas as páginas.

### Topbar
Cabeçalho superior com informações do usuário.

### Dashboard
Página inicial com resumo de informações.

## 🔐 Autenticação (Futuro)

Será implementado com JWT tokens e armazenamento seguro.

## 📡 Integração Backend

Endpoints esperados:
- \`GET /api/user\` - Dados do usuário
- \`GET /api/courses\` - Lista de cursos
- \`POST /api/login\` - Autenticação`,

    roadmap: `# Roadmap do Projeto

## Q1 2025 - Fase 1: Autenticação

### Sistema de Autenticação (Semanas 1-3)
- Implementar login/registro com JWT
- Backend com Node.js + Express
- Hash de senhas com bcrypt
- Persistência de sessão

### Gestão de Usuários (Semana 4)
- Perfil de usuário
- Edição de dados pessoais
- Avatar e preferências

## Q2 2025 - Fase 2: Analytics

### Dashboard Avançado (Semanas 5-7)
- Gráficos interativos
- Visualização de progresso
- Relatórios por disciplina

### Sistema de Metas (Semana 8)
- Definir metas pessoais
- Streak de dias
- Badges e conquistas

## Q3 2025 - Fase 3: Comunicação

### Notificações em Tempo Real (Semanas 9-11)
- WebSocket com Socket.io
- 5 tipos de notificações
- Central de notificações

### Sistema de Mensagens (Semana 12)
- Chat com instrutores
- Histórico de mensagens
- Notificações de mensagens

## 📊 Métricas de Sucesso

- ✅ 100% de cobertura de testes
- ✅ Performance < 3s em todas as páginas
- ✅ 90%+ de user satisfaction`
  }

  return docs[docId] || docs.readme
}

const DocumentationPage = memo(DocumentationPageComponent)
DocumentationPage.displayName = 'DocumentationPage'

export default DocumentationPage
