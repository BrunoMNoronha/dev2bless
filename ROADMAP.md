# Roadmap - dev2bless v2.0

## Visão Geral
Este documento apresenta o roadmap de desenvolvimento para os próximos trimestres do projeto dev2bless, com foco em melhorar a experiência do usuário, adicionar funcionalidades essenciais e preparar a plataforma para escala.

---

## Funcionalidade 1: Sistema de Autenticação e Gestão de Usuários
**Status**: Planejado | **Prioridade**: CRÍTICA | **Estimativa**: 2-3 semanas

### Objetivo
Implementar um sistema robusto de autenticação e gerenciamento de perfil de usuário, substituindo a simulação atual com dados mock por um sistema real com persistência de dados.

### Problema Atual
- Dados de usuário são apenas simulados (mock data)
- Não há login/logout real
- Impossível salvar preferências do usuário
- Sem autenticação, a segurança não existe

### Solução Proposta

#### 1.1 Backend de Autenticação
- **Tecnologia**: Node.js + Express + JWT
- **Banco de Dados**: PostgreSQL ou MongoDB
- **Endpoints**:
  - `POST /auth/register` - Registro de novo usuário
  - `POST /auth/login` - Login com email/senha
  - `POST /auth/logout` - Logout
  - `GET /auth/profile` - Dados do usuário autenticado
  - `PUT /auth/profile` - Atualizar perfil
  - `POST /auth/refresh-token` - Renovar token JWT

#### 1.2 Frontend - Páginas de Autenticação
- **LoginPage.jsx**: Form de login com validação
- **RegisterPage.jsx**: Form de registro com confirmação de email
- **ProfilePage.jsx**: Página de edição de perfil
- **Atualização do Topbar**: Exibir foto/nome real do usuário autenticado

#### 1.3 Segurança
- Senhas com hash bcrypt
- Tokens JWT com expiração
- HTTP-only cookies para armazenar tokens
- CORS configurado corretamente
- Validação de entrada em todos os endpoints

#### 1.4 Context API
```javascript
// Novo contexto: AuthContext
{
  usuario: {
    id: string,
    nome: string,
    email: string,
    foto: string,
    periodo: string,
    dataCriacao: Date
  },
  isAuthenticated: boolean,
  isLoading: boolean,
  login: (email, senha) => Promise
  register: (nome, email, senha) => Promise
  logout: () => void
  updateProfile: (dados) => Promise
}
```

### Entregáveis
- [ ] API de autenticação funcionando
- [ ] Páginas de login e registro
- [ ] Página de edição de perfil
- [ ] Context API de autenticação
- [ ] Validação e tratamento de erros
- [ ] Testes de integração

### Dependências
- Nenhuma blocante

### Métricas de Sucesso
- ✅ Usuários conseguem se registrar e fazer login
- ✅ Dados de perfil são persistidos
- ✅ Tokens expiram corretamente
- ✅ Logout limpa os dados da sessão

---

## Funcionalidade 2: Dashboard Avançado com Analytics e Relatórios
**Status**: Planejado | **Prioridade**: ALTA | **Estimativa**: 2-3 semanas

### Objetivo
Criar um dashboard inteligente com visualizações de dados, estatísticas de progresso, metas e relatórios personalizados para melhorar a experiência educacional.

### Problema Atual
- Dashboard mostra apenas dados estáticos
- Sem visualização de progresso ao longo do tempo
- Usuários não conseguem ver seu desempenho geral
- Sem metas ou objetivos estruturados

### Solução Proposta

#### 2.1 Novos Componentes de Analytics
- **ProgressChart.jsx**: Gráfico de progresso por disciplina (linha, barra)
- **PerformanceCard.jsx**: Cartão com taxa de acurácia, tempo de estudo
- **GoalsPanel.jsx**: Painel de metas pessoais (curto/médio/longo prazo)
- **StudyStreakWidget.jsx**: Mostrar dias consecutivos de estudos
- **TimeSpentChart.jsx**: Gráfico de tempo investido por semana/mês

#### 2.2 Nova Página: Analytics Avançado
- URL: `/analytics` ou `/relatorios`
- Gráficos interativos com filtros por período
- Relatório exportável em PDF
- Comparação com média da turma (anônima)
- Previsões baseadas em histórico

#### 2.3 Dados Necessários
Estender o Context para incluir:
```javascript
{
  desempenho: {
    disciplinas: Array<{
      nome: string,
      notaMedia: number,
      progressao: number, // % 0-100
      ultimaProva: Date,
      tempoEstudo: number // em horas
    }>,
    estudoTotal: number,
    presenca: number, // % de presença
    sequenciaEstudos: number // dias consecutivos
  },
  metas: Array<{
    id: string,
    titulo: string,
    descricao: string,
    dataLimite: Date,
    progresso: number,
    status: 'ativa' | 'concluida' | 'expirada'
  }>,
  historico: Array<{ // histórico de atividades
    data: Date,
    tipo: string, // 'prova', 'tarefa', 'aula'
    disciplina: string,
    resultado: number
  }>
}
```

#### 2.4 Gráficos Recomendados
- **Recharts** ou **Chart.js** para visualizações
- Gráficos responsivos e interativos
- Modo escuro/claro
- Legendas e tooltips personalizadas

### Entregáveis
- [ ] Componentes de visualização criados
- [ ] Página de analytics funcional
- [ ] Dados de desempenho integrados
- [ ] Relatório em PDF
- [ ] Filtros e busca funcionando

### Dependências
- ✅ Funcionalidade 1 (necessário usuário autenticado)

### Métricas de Sucesso
- ✅ Usuários conseguem visualizar seu progresso
- ✅ Relatórios podem ser exportados
- ✅ Gráficos carregam em menos de 2s
- ✅ Mobile responsivo e usável

---

## Funcionalidade 3: Sistema de Notificações e Comunicação em Tempo Real
**Status**: Planejado | **Prioridade**: ALTA | **Estimativa**: 2-3 semanas

### Objetivo
Implementar um sistema robusto de notificações que mantém usuários informados sobre avisos, prazos, novas mensagens de instrutores e atualizações importantes em tempo real.

### Problema Atual
- Avisos são apenas texto estático (mock)
- Sem notificações push
- Sem sistema de mensagens entre usuário e instrutor
- Sem alertas de prazos próximos
- Sem priorização de notificações

### Solução Proposta

#### 3.1 Tipos de Notificações
1. **Avisos Gerais**: Comunicados da instituição
2. **Alertas de Prazos**: Tarefas/provas com entrega próxima
3. **Mensagens Privadas**: De instrutores ou administradores
4. **Atualizações de Grades**: Novas notas publicadas
5. **Eventos**: Aulas, reuniões, eventos educacionais

#### 3.2 Backend - API de Notificações
- **Tecnologia**: WebSocket (Socket.io) para tempo real
- **Endpoints REST**:
  - `GET /notifications` - Listar notificações do usuário
  - `GET /notifications/unread` - Contar não lidas
  - `PATCH /notifications/:id/read` - Marcar como lida
  - `DELETE /notifications/:id` - Deletar notificação
  - `POST /messages` - Enviar mensagem
  - `GET /messages/:userId` - Conversa com usuário

#### 3.3 Frontend - Componentes
- **NotificationCenter.jsx**: Central de notificações com abas e filtros
- **NotificationBell.jsx**: Ícone no Topbar com badge de contagem
- **MessagePanel.jsx**: Conversa com instrutores
- **NotificationDropdown.jsx**: Preview das 5 últimas notificações
- **PriorityBanner.jsx**: Banner com notificações críticas

#### 3.4 Página de Notificações Completa
- URL: `/notificacoes`
- Filtrar por tipo, prioridade, data
- Busca de notificações antigas
- Marcar como lida/não lida em lote
- Configurações de preferências de notificação

#### 3.5 Push Notifications
- **Web Push API** para notificações do navegador
- Service Worker para background notifications
- Integração com Firebase Cloud Messaging (FCM)
- Opções de opt-in/opt-out por tipo

#### 3.6 Data Structure
```javascript
{
  notificacoes: Array<{
    id: string,
    tipo: 'aviso' | 'prazo' | 'mensagem' | 'grade' | 'evento',
    titulo: string,
    corpo: string,
    prioridade: 'baixa' | 'media' | 'alta' | 'critica',
    lida: boolean,
    dataCriacao: Date,
    dataLeitura: Date | null,
    usuarioId: string,
    remetente: string,
    icone: string,
    link: string // para navegação
  }>,
  preferenciasNotificacao: {
    emailsAtivos: boolean,
    pushAtivos: boolean,
    porTipo: {
      avisos: boolean,
      prazos: boolean,
      mensagens: boolean,
      grades: boolean,
      eventos: boolean
    },
    horarioNaoPerturbe: {
      ativo: boolean,
      inicio: string, // "22:00"
      fim: string    // "08:00"
    }
  },
  mensagens: Array<{
    id: string,
    remetente: {id, nome, foto},
    destinatario: {id, nome, foto},
    conteudo: string,
    dataCriacao: Date,
    lida: boolean,
    anexos: Array<string>
  }>
}
```

#### 3.7 Integrações
- **Email**: Notificações importantes por email
- **SMS**: Alertas críticos por SMS (opcional)
- **Calendar**: Sincronizar eventos com Google Calendar/Outlook
- **Slack/Discord**: Integração futura para comunidades

### Entregáveis
- [ ] API de notificações funcionando
- [ ] WebSocket para tempo real configurado
- [ ] Componentes de notificação criados
- [ ] Página de notificações completa
- [ ] Push notifications funcionando
- [ ] Centro de mensagens com instrutores
- [ ] Configurações de preferências
- [ ] Testes de integração

### Dependências
- ✅ Funcionalidade 1 (necessário usuário autenticado)
- ⚠️ Backend de notificações

### Métricas de Sucesso
- ✅ Notificações chegam em tempo real
- ✅ Usuários conseguem gerenciar preferências
- ✅ Push notifications funcionam em mobile
- ✅ Taxa de abertura de notificações > 40%
- ✅ Nenhuma notificação duplicada

---

## Timeline Sugerida

### Q1 2025 (Jan-Mar)
- **Semana 1-3**: Funcionalidade 1 - Autenticação
- **Semana 4-6**: Funcionalidade 2 - Analytics
- **Semana 7-10**: Funcionalidade 3 - Notificações

### Q2 2025 (Abr-Jun)
- Testes e refinamentos
- Integração com backend real
- Performance optimization
- Migração para TypeScript

### Q3 2025 (Jul-Set)
- PWA (Progressive Web App)
- Mobile app nativa (React Native)
- Mais funcionalidades educacionais

---

## Requisitos Técnicos Gerais

### Tecnologia Stack Proposto
```
Frontend:
- React 18.3.1 (atual)
- Vite 5.4 (atual)
- React Router 7.9.1 (atual)
- Socket.io-client (novo)
- Chart.js ou Recharts (novo)
- Axios para HTTP (novo)

Backend:
- Node.js + Express
- PostgreSQL ou MongoDB
- Redis para cache/sessão
- Socket.io para tempo real
- JWT para autenticação

DevOps:
- Docker para containerização
- GitHub Actions para CI/CD
- Vercel ou Heroku para deploy
```

### Padrões de Código
- Componentes funcionais com hooks
- Context API para estado global
- Custom hooks para lógica reutilizável
- ESLint + Prettier
- Testes com Jest + React Testing Library

### Performance
- Code splitting implementado
- Lazy loading de componentes
- Caching de dados com SWR
- Otimização de imagens
- Bundle size monitorado

---

## Considerações Finais

Este roadmap é dinâmico e pode ser ajustado conforme:
- Feedback dos usuários
- Prioridades do negócio mudam
- Descobertas técnicas durante desenvolvimento
- Recursos disponíveis

**Próximos passos imediatos:**
1. Validar com stakeholders as 3 funcionalidades
2. Preparar environment de desenvolvimento (Docker, BD local)
3. Iniciar design de API/Database schema
4. Criar backlog detalhado em sistema de issue tracking

---

**Última atualização**: Fevereiro 2025
**Responsável**: Bruno M. Noronha
**Status**: Em Revisão
