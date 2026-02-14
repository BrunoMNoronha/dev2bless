# Arquitetura - dev2bless

Documentação técnica detalhada sobre a arquitetura da aplicação dev2bless.

## 📐 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      App.jsx (Raiz)                         │
│          Configura rotas com React Router                   │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────▼────────────────┐
        │    StudyProvider (Context)      │
        │  Fornece estado global (dados)  │
        └────────────────┬────────────────┘
                         │
        ┌────────────────▼────────────────────────────┐
        │       DashboardLayout                       │
        │  Layout compartilhado (estrutura da página) │
        ├─────────────────────────────────────────────┤
        │  ┌──────────────┐   ┌─────────────────────┐ │
        │  │   Sidebar    │   │     Topbar          │ │
        │  │ (Navegação)  │   │  (Cabeçalho/Usuário)│ │
        │  └──────────────┘   └─────────────────────┘ │
        │  ┌────────────────────────────────────────┐  │
        │  │         <Outlet /> (Conteúdo)          │  │
        │  │   Renderiza página ativa dinamicamente │  │
        │  └────────────────────────────────────────┘  │
        └─────────────────────────────────────────────┘
                         │
        ┌────────────────▼────────────────┐
        │      Páginas (lazy-loaded)      │
        ├─────────────────────────────────┤
        │ • DashboardPage                 │
        │ • ContributionsPage             │
        │ • StudyPlansPage                │
        │ • ResultsPage                   │
        │ • NoticesPage                   │
        │ • AgendaPage                    │
        │ • EnrollmentPage                │
        │ • PauseModulePage               │
        │ • LogoutPage                    │
        └─────────────────────────────────┘
```

## 📊 Fluxo de Dados

### Fluxo Unidirecional (React Flow)

```
StudyContext (Dados)
      │
      ▼
useStudy() Hook
      │
      ├─────────────────────────┬──────────────────┬──────────────┐
      ▼                         ▼                  ▼              ▼
Componentes           Páginas                 Sidebar          Topbar
(CoursesList,    (consomem dados     (lista navegação)  (mostra usuário)
FinancialCards)   via useStudy())
```

### Exemplo de Consumo de Dados

```javascript
// Componente FinancialCards.jsx
import { useStudy } from '../context/StudyContext'

export function FinancialCards() {
  const { financas } = useStudy()  // ← Acessa dados do contexto
  
  return (
    <div>
      <p>A Contribuir: R$ {financas.aContribuir}</p>
      <p>Contribuído: R$ {financas.contribuido}</p>
    </div>
  )
}
```

## 🗂️ Organização de Arquivos

### Diretório `src/components/`

Componentes reutilizáveis e agnósticos à página. Cada componente é independente e pode ser usado em qualquer página.

```
components/
├── Sidebar.jsx              # Navegação lateral
├── Topbar.jsx               # Barra superior
├── Hero.jsx                 # Seção hero/banner
├── CoursesList.jsx          # Lista de cursos
├── FinancialCards.jsx       # Cards financeiros
├── InstructorsPanel.jsx     # Lista de instrutores
├── NoticesPanel.jsx         # Avisos/notificações
├── PagePlaceholder.jsx      # Placeholder genérico
└── index.js                 # Exportações centralizadas
```

**Princípios:**
- Componentes "burros" (não acessam Context diretamente quando possível)
- Props bem definidas para flexibilidade
- Reutilizáveis em múltiplas páginas

### Diretório `src/pages/`

Páginas completas da aplicação. Cada página é uma rota e geralmente compõe componentes menores.

```
pages/
├── dashboard/
│   └── DashboardPage.jsx
├── contributions/
│   └── ContributionsPage.jsx
├── study-plans/
│   └── StudyPlansPage.jsx
├── results/
│   └── ResultsPage.jsx
├── notices/
│   └── NoticesPage.jsx
├── agenda/
│   └── AgendaPage.jsx
├── enrollment/
│   └── EnrollmentPage.jsx
├── pause-module/
│   └── PauseModulePage.jsx
└── logout/
    └── LogoutPage.jsx
```

**Princípios:**
- Uma pasta por página/rota
- Páginas podem ter lógica complexa
- Acessam Context via `useStudy()`
- Compõem componentes menores

### Diretório `src/context/`

Gerenciamento de estado global da aplicação.

```
context/
└── StudyContext.jsx
    ├── StudyContext (criado com createContext)
    ├── STUDY_DATA (dados mock/iniciais)
    ├── StudyProvider (componente provider)
    └── useStudy() (hook para consumir context)
```

### Diretório `src/layouts/`

Layouts compartilhados entre múltiplas páginas.

```
layouts/
└── DashboardLayout.jsx
    ├── Estrutura base (Sidebar + Topbar + Outlet)
    ├── Aplicado em todas as páginas
    └── Renderiza página ativa via <Outlet />
```

### Diretório `src/routes/`

Configuração de roteamento.

```
routes/
└── index.jsx
    ├── Importações lazy dos componentes
    ├── Função withSuspense()
    └── Array routes (definição de rotas)
```

## 🔄 Ciclo de Vida de uma Página

### 1. Usuário Clica no Link

```javascript
// Sidebar.jsx
<Link to="/planos">Planos de Estudo</Link>
```

### 2. React Router Intercepta e Renderiza

```javascript
// routes/index.jsx
{ path: 'planos', element: withSuspense(<StudyPlansPage />) }
```

### 3. Suspense Exibe Fallback se Necessário

```javascript
// Enquanto o componente é carregado:
<Suspense fallback={<div>Carregando...</div>}>
  <StudyPlansPage />
</Suspense>
```

### 4. Componente Renderiza e Acessa Dados

```javascript
// StudyPlansPage.jsx
function StudyPlansPage() {
  const { cursos } = useStudy()  // ← Acessa dados
  return <CoursesList courses={cursos} />
}
```

### 5. Layout Mantém Estado (Sidebar e Topbar Persistem)

```javascript
// DashboardLayout.jsx
return (
  <div className="app">
    <Sidebar />              {/* ← Permanece igual */}
    <main className="main">
      <Topbar />            {/* ← Permanece igual */}
      <Outlet />            {/* ← Renderiza nova página */}
    </main>
  </div>
)
```

## 🏛️ Padrões de Código

### Padrão: Componente Funcional com Memo

```javascript
// Componente que não muda frequentemente é memoizado
import { memo } from 'react'

/**
 * Descrição do componente
 * @param {Object} props - Props do componente
 * @returns {JSX.Element}
 */
function ComponenteComponent(props) {
  return <div>{/* conteúdo */}</div>
}

const Componente = memo(ComponenteComponent)
Componente.displayName = 'Componente'

export default Componente
```

### Padrão: Página com Context

```javascript
// Página que consome dados globais
import { useStudy } from '../context/StudyContext'

export default function MinhaPaginaPage() {
  const { usuario, financas } = useStudy()
  
  return (
    <div className="panel">
      <h1>Olá, {usuario.nome}</h1>
      {/* Use os dados */}
    </div>
  )
}
```

### Padrão: Componente com Props

```javascript
// Componente reutilizável que recebe dados via props
import { memo } from 'react'

function MeuComponentComponent({ titulo, conteudo }) {
  return (
    <div>
      <h2>{titulo}</h2>
      <p>{conteudo}</p>
    </div>
  )
}

const MeuComponente = memo(MeuComponentComponent)
MeuComponente.displayName = 'MeuComponente'

export default MeuComponente
```

## 🔌 Integração com Backend

### Modificação Necessária no StudyContext

Para integrar com um backend, substitua `STUDY_DATA` por requisições HTTP:

```javascript
// Antes (dados mock)
const STUDY_DATA = { ... }
export function StudyProvider({ children }) {
  return <StudyContext.Provider value={STUDY_DATA}>{children}</StudyContext.Provider>
}

// Depois (dados de API)
export function StudyProvider({ children }) {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/study-data')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])
  
  if (!data) return <div>Carregando...</div>
  
  return <StudyContext.Provider value={data}>{children}</StudyContext.Provider>
}
```

### Estrutura Esperada da API

```javascript
GET /api/study-data
{
  "usuario": { "nome": "Bruno", "periodo": "3º ano" },
  "financas": { "aContribuir": 120, "contribuido": 80, "outros": 15 },
  "instrutores": [{ "nome": "Pr. Ana Silva" }, ...],
  "avisos": [{ "titulo": "...", "texto": "..." }, ...],
  "cursos": [{ "titulo": "...", "desc": "..." }, ...]
}
```

## ⚡ Otimizações Implementadas

### Code Splitting com Lazy Loading

```javascript
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage.jsx'))
```

- Cada página é carregada apenas quando necessário
- Reduz tamanho do bundle inicial
- Melhora tempo de carregamento

### Memoização de Componentes

```javascript
const Componente = memo(ComponenteComponent)
```

- Evita re-renderizações desnecessárias
- Especialmente importante para componentes compartilhados

### Suspense com Fallback

```javascript
withSuspense(<Componente />)
```

- Exibe fallback enquanto componente está sendo carregado
- Melhora experiência do usuário

## 🧩 Extensibilidade

### Adicionar Novo Tipo de Dado

1. Adicionar tipo no StudyContext:

```javascript
/**
 * @typedef {Object} NovoTipo
 * @property {string} campo1
 * @property {number} campo2
 */
```

2. Adicionar ao STUDY_DATA:

```javascript
const STUDY_DATA = {
  // ...
  novosDados: { campo1: 'valor', campo2: 123 }
}
```

3. Usar em componentes:

```javascript
const { novosDados } = useStudy()
```

### Adicionar Novo Componente

1. Criar arquivo em `components/`
2. Exportar em `components/index.js`
3. Importar em páginas onde necessário

### Adicionar Nova Página

1. Criar pasta em `pages/`
2. Criar componente com nome `{NomePagina}Page.jsx`
3. Importar como lazy em `routes/index.jsx`
4. Adicionar rota ao array `routes`
5. Adicionar link no `Sidebar.jsx`

## 📈 Escalabilidade

A arquitetura suporta crescimento:

- **Componentes**: Facilmente reutilizáveis
- **Páginas**: Padrão claro para adicionar novas
- **Estado**: Context pode ser expandido ou substituído por Redux
- **API**: Pronto para integração com backend
- **Testes**: Estrutura favorece testes unitários

## 🔒 Considerações de Segurança

Quando implementar backend:

- Validar todos os inputs no servidor
- Sanitizar dados antes de renderizar
- Usar HTTPS para comunicação
- Implementar autenticação robusta
- Proteger informações sensíveis
- Implementar CORS apropriadamente

## 📚 Dependências e Versões

| Pacote | Versão | Propósito |
|--------|--------|----------|
| react | ^18.3.1 | Biblioteca UI principal |
| react-dom | ^18.3.1 | Renderização no DOM |
| react-router-dom | ^7.9.1 | Roteamento e navegação |
| @vitejs/plugin-react | ^4.3.1 | Plugin React para Vite |
| vite | ^5.4.0 | Build tool e dev server |

## 🚀 Próximos Passos Arquiteturais

1. **Autenticação**: Adicionar provedor de autenticação
2. **Estado Complexo**: Considerar Redux/Zustand se crescer
3. **API Client**: Criar layer para requisições HTTP
4. **Error Boundary**: Adicionar tratamento de erros global
5. **Logging**: Sistema de logs para debug
6. **Testing**: Framework de testes (Jest, Vitest)
7. **Tipo de Dados**: Migrar para TypeScript
