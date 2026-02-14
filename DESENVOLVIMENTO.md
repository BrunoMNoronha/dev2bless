# Guia de Desenvolvimento - dev2bless

Documentação técnica para desenvolvedores que trabalham no projeto dev2bless.

## 🎯 Objetivo da Aplicação

dev2bless é um **dashboard educacional** para uma instituição de ensino. A plataforma facilita o acompanhamento de alunos em seus estudos, fornecendo:

- Visão consolidada do progresso acadêmico
- Gestão de contribuições financeiras
- Comunicação com instrutores
- Agendamento de atividades
- Notificações e avisos importantes

## 🏗️ Arquitetura

### Estrutura em Camadas

```
App (Raiz)
│
├─ StudyProvider (Context Global)
│  └─ DashboardLayout (Layout Principal)
│     ├─ Sidebar (Navegação)
│     ├─ Topbar (Cabeçalho)
│     └─ Outlet (Conteúdo Dinâmico)
│        └─ Páginas Específicas
```

### Fluxo de Dados

1. **App.jsx**: Registra rotas com React Router
2. **StudyProvider**: Envolve toda a árvore com contexto global
3. **DashboardLayout**: Aplica layout compartilhado
4. **Páginas**: Consomem dados via `useStudy()`

## 🔧 Como Adicionar uma Nova Página

### Passo 1: Criar o Arquivo da Página

```javascript
// src/pages/nova-pagina/NovaPageName.jsx

import { useStudy } from '../../context/StudyContext.jsx'

/**
 * Página Nova
 * @returns {import('react').JSX.Element}
 */
export default function NovaPaginaPage() {
  const { usuario } = useStudy()
  
  return (
    <div className="panel">
      <h1>Bem-vindo, {usuario.nome}!</h1>
      <p>Conteúdo da página aqui...</p>
    </div>
  )
}
```

### Passo 2: Adicionar a Rota

```javascript
// src/routes/index.jsx

// 1. Importar lazy
const NovaPaginaPage = lazy(() => import('../pages/nova-pagina/NovaPageName.jsx'))

// 2. Adicionar na lista de rotas
export const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      // ... outras rotas ...
      { path: 'nova-pagina', element: withSuspense(<NovaPaginaPage />) }
    ]
  }
]
```

### Passo 3: Adicionar Link no Sidebar

```javascript
// src/components/Sidebar.jsx

// Adicionar novo item de navegação
<nav>
  {/* ... links existentes ... */}
  <Link to="/nova-pagina">Nova Página</Link>
</nav>
```

## 📊 Como Adicionar um Novo Componente

### Exemplo: Novo Componente de Card

```javascript
// src/components/NewCard.jsx

import { memo } from 'react'

/**
 * Componente de Card customizado
 * @param {{ title: string, content: string }} props
 * @returns {import('react').JSX.Element}
 */
function NewCardComponent({ title, content }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  )
}

const NewCard = memo(NewCardComponent)
NewCard.displayName = 'NewCard'

export default NewCard
```

### Adicionar ao index.js de componentes

```javascript
// src/components/index.js

export { default as NewCard } from './NewCard.jsx'
```

## 🔄 Como Consumir Dados do Context

```javascript
// Qualquer componente dentro de StudyProvider

import { useStudy } from '../context/StudyContext.jsx'

export function MeuComponente() {
  const { 
    usuario, 
    financas, 
    instrutores, 
    avisos, 
    cursos 
  } = useStudy()
  
  return (
    <div>
      <h2>{usuario.nome} - {usuario.periodo}</h2>
      <p>Faltam pagar: R$ {financas.aContribuir}</p>
    </div>
  )
}
```

## 🔌 Como Conectar a um Backend

### Modificar StudyContext para Requisições HTTP

```javascript
// src/context/StudyContext.jsx

import { createContext, useContext, useState, useEffect } from 'react'

export const StudyContext = createContext(null)

export function StudyProvider ({ children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Buscar dados da API
    fetch('/api/study-data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro ao carregar dados</div>

  return (
    <StudyContext.Provider value={data}>
      {children}
    </StudyContext.Provider>
  )
}
```

## 🎨 Personalização de Estilos

Os estilos estão centralizados em `src/styles.css`. Para adicionar novos estilos:

```css
/* src/styles.css */

.novo-componente {
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## 🧪 Padrões de Desenvolvimento

### Nomenclatura de Componentes

- **Componentes**: `PascalCase` (ex: `DashboardPage.jsx`)
- **Funções**: `camelCase` (ex: `calculateTotal()`)
- **Constantes**: `UPPER_SNAKE_CASE` (ex: `STUDY_DATA`)
- **Classes CSS**: `kebab-case` (ex: `.main-panel`)

### JSDoc para Documentação

```javascript
/**
 * Descrição breve do componente.
 * 
 * Descrição mais detalhada se necessário.
 * 
 * @param {{ prop1: string, prop2: number }} props - Props do componente
 * @returns {import('react').JSX.Element} Elemento renderizado
 */
export function MeuComponente({ prop1, prop2 }) {
  // ...
}
```

### Memo para Performance

Componentes que não dependem de mudanças frequentes devem ser envolvidos em `memo()`:

```javascript
import { memo } from 'react'

function ComponenteComponent() {
  // ...
}

const Componente = memo(ComponenteComponent)
Componente.displayName = 'Componente'

export default Componente
```

## 📱 Responsividade

A aplicação deve funcionar em:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

Use CSS Media Queries em `styles.css`:

```css
@media (max-width: 768px) {
  .main {
    margin-left: 0;
  }
  
  .sidebar {
    width: 100%;
  }
}
```

## 🐛 Tratamento de Erros

### Erros no Context

```javascript
export function useStudy() {
  const context = useContext(StudyContext)
  if (!context) {
    throw new Error('useStudy deve ser utilizado dentro de um StudyProvider')
  }
  return context
}
```

### Erros em Rotas

```javascript
if (!element) {
  throw new Error('Nenhuma rota ativa encontrada. Verifique a configuração de rotas.')
}
```

### Tratamento em Componentes

```javascript
try {
  const { usuario } = useStudy()
  // usar dados
} catch (error) {
  return <div>Erro: {error.message}</div>
}
```

## 📦 Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| react | ^18.3.1 | Biblioteca UI |
| react-dom | ^18.3.1 | Renderização no DOM |
| react-router-dom | ^7.9.1 | Roteamento |
| vite | ^5.4.0 | Build tool |

## 🚀 Deploy

### Preparar para Produção

```bash
npm run build
```

Isso cria uma pasta `dist/` com os arquivos otimizados.

### Testar Build Localmente

```bash
npm run preview
```

## 📚 Recursos Úteis

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)

## 💡 Boas Práticas

1. **Componentes pequenos**: Cada componente deve ter responsabilidade única
2. **Reutilização**: Use componentes compartilhados quando possível
3. **Props**: Prefira props simples a estado complexo
4. **Performance**: Use `memo()` para componentes caros
5. **Documentação**: Sempre documente código complexo
6. **Commits**: Mensagens claras e objetivas
7. **Testes**: Teste comportamentos críticos

## 🔐 Segurança

Quando implementar backend real:

- Validar todos os inputs no servidor
- Usar HTTPS em produção
- Implementar autenticação segura (JWT, sessions)
- Sanitizar dados antes de renderizar
- Usar CORS apropriadamente
- Proteger dados sensíveis

## 📞 Suporte

Para dúvidas sobre o desenvolvimento, consulte:

- Documentação deste arquivo
- Comentários no código (JSDoc)
- Estrutura de pastas e convenções
