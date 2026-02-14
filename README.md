# dev2bless

Um dashboard educacional moderno construído com React, Vite e React Router. Plataforma de gerenciamento de estudo com suporte a contribuições financeiras, planos de estudo, agendas e avisos.

## 📋 Visão Geral

**dev2bless** é uma aplicação web responsiva que funciona como um portal de aprendizado para alunos. A plataforma oferece funcionalidades para:

- **Dashboard interativo** com resumo de dados do usuário
- **Gestão financeira** com visualização de contribuições
- **Planos de estudo** personalizados
- **Sistema de avisos** e notificações
- **Painel de instrutores** e contatos
- **Agenda de eventos** educacionais
- **Sistema de resultados** e acompanhamento

## 🚀 Tecnologias Utilizadas

- **React 18.3.1** - Biblioteca UI
- **Vite 5.4.0** - Build tool e dev server
- **React Router 7.9.1** - Roteamento de páginas
- **CSS Moderno** - Estilos customizados

## 📁 Estrutura do Projeto

```
dev2bless/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── CoursesList.jsx
│   │   ├── FinancialCards.jsx
│   │   ├── Hero.jsx
│   │   ├── InstructorsPanel.jsx
│   │   ├── NoticesPanel.jsx
│   │   ├── PagePlaceholder.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   └── index.js
│   ├── context/              # Context API para estado global
│   │   └── StudyContext.jsx
│   ├── layouts/              # Layouts principais
│   │   └── DashboardLayout.jsx
│   ├── pages/                # Páginas da aplicação
│   │   ├── agenda/
│   │   ├── contributions/
│   │   ├── dashboard/
│   │   ├── enrollment/
│   │   ├── logout/
│   │   ├── notices/
│   │   ├── pause-module/
│   │   ├── results/
│   │   └── study-plans/
│   ├── routes/               # Configuração de rotas
│   │   └── index.jsx
│   ├── App.jsx               # Componente raiz
│   ├── main.jsx              # Ponto de entrada
│   └── styles.css            # Estilos globais
├── index.html                # HTML principal
├── package.json              # Dependências e scripts
├── vite.config.js            # Configuração do Vite
└── README.md                 # Este arquivo
```

## 🔗 Sistema de Rotas

A aplicação utiliza React Router com code-splitting para otimizar o carregamento. Todas as rotas são envolvidas em um `Suspense` que exibe "Carregando..." enquanto o componente está sendo carregado.

### Rotas Disponíveis

| Caminho | Página | Descrição |
|---------|--------|-----------|
| `/dashboard` | Dashboard | Página inicial com resumo de dados |
| `/contribuicoes` | Contribuições | Gestão de pagamentos e contribuições |
| `/inscricao` | Inscrição | Processo de matrícula |
| `/planos` | Planos de Estudo | Visualização de cursos e planos |
| `/pausar-modulo` | Pausar Módulo | Interface para pausar estudos |
| `/resultados` | Resultados | Histórico de resultados e notas |
| `/avisos` | Avisos | Notificações e comunicados |
| `/agenda` | Agenda | Calendário de eventos |
| `/logout` | Logout | Saída do sistema |

## 📦 Componentes Principais

### Componentes Compartilhados

#### **Sidebar**
Navegação lateral com links para todas as páginas principais. Gerenciada via `useStudy()` para acessar dados do usuário.

#### **Topbar**
Barra superior com informações do usuário autenticado. Recebe dados do usuário como props.

#### **Hero**
Componente de apresentação na página inicial.

#### **FinancialCards**
Exibe informações financeiras do usuário:
- Valor a contribuir
- Valor já contribuído
- Outros valores

#### **CoursesList**
Lista de cursos em andamento com títulos e descrições.

#### **InstructorsPanel**
Painel com lista de instrutores disponíveis.

#### **NoticesPanel**
Exibe avisos e notificações importantes do dia.

#### **PagePlaceholder**
Componente genérico para páginas em desenvolvimento.

## 🎯 Context API - StudyContext

Gerencia o estado global da aplicação através do contexto `StudyContext`.

### Tipos de Dados

```javascript
{
  usuario: {
    nome: string,        // Nome do usuário
    periodo: string      // Período/turma (ex: "3º ano")
  },
  financas: {
    aContribuir: number,  // Valor pendente
    contribuido: number,  // Valor já pago no mês
    outros: number        // Outros valores
  },
  instrutores: Array<{
    nome: string
  }>,
  avisos: Array<{
    titulo: string,
    texto: string
  }>,
  cursos: Array<{
    titulo: string,
    desc: string
  }>
}
```

### Hook `useStudy()`

Use este hook em qualquer componente para acessar os dados de estudo:

```javascript
import { useStudy } from '../context/StudyContext.jsx'

export function MeuComponente() {
  const { usuario, financas, instrutores, avisos, cursos } = useStudy()
  return <div>{usuario.nome}</div>
}
```

## 🛠️ Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Pré-visualizar build de produção
npm run preview
```

## 📝 Dados Mock

Os dados da aplicação são atualmente armazenados em `STUDY_DATA` no arquivo `StudyContext.jsx`. Para conectar com um backend real, modifique o arquivo para fazer requisições HTTP.

### Exemplo de Dados Atuais

```javascript
const STUDY_DATA = {
  usuario: { nome: 'Bruno', periodo: '3º ano' },
  financas: {
    aContribuir: 120.00,
    contribuido: 80.00,
    outros: 15.00
  },
  instrutores: [
    { nome: 'Pr. Ana Silva' },
    { nome: 'Prof. João Mendes' },
    { nome: 'Pr. Lucas Barros' }
  ],
  avisos: [
    { titulo: 'Leitura da semana', texto: 'Mateus 5–7...' },
    { titulo: 'Agenda de prova', texto: 'Quiz de Hermenêutica...' }
  ],
  cursos: [
    { titulo: 'Evangelhos Sinópticos', desc: '...' },
    { titulo: 'Fundamentos de Hermenêutica', desc: '...' }
  ]
}
```

## 🎨 Estilos

A aplicação utiliza CSS customizado definido em `src/styles.css`. O layout é responsivo e segue um padrão de grid para a estrutura principal.

### Classes Principais

- `.app` - Container principal da aplicação
- `.main` - Área de conteúdo principal
- `.panel` - Componente de painel genérico
- `.loading-state` - Estado de carregamento

## ⚙️ Configuração do Vite

O arquivo `vite.config.js` contém a configuração do Vite com suporte a React através do plugin `@vitejs/plugin-react`.

## 🔄 Code Splitting

A aplicação implementa code-splitting automático:

```javascript
// Componentes são carregados dinamicamente
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage.jsx'))

// Envolvidos em Suspense com fallback customizado
withSuspense(<DashboardPage />)
```

## 🛡️ Error Handling

A aplicação inclui validações básicas:

- **Rotas não encontradas**: Redirecionam para `/dashboard`
- **Context não disponível**: `useStudy()` lança erro se usado fora do `StudyProvider`
- **Nenhuma rota ativa**: `App.jsx` verifica se há rota ativa

## 🚀 Próximos Passos

Para melhorar a aplicação:

1. **Backend Integration** - Conectar com API real para dados dinâmicos
2. **Autenticação** - Implementar sistema de login/logout
3. **Banco de Dados** - Substituir dados mock por dados persistentes
4. **TypeScript** - Migrar para TypeScript para melhor type-safety
5. **Testing** - Adicionar testes unitários e de integração
6. **PWA** - Converter em Progressive Web App
7. **Responsividade** - Melhorar adaptação mobile

## 📄 Licença

Privado - Dev2Bless Platform

## 👨‍💻 Autor

Bruno M. Noronha
