# ⚡ Guia de Testes Rápidos

## 🚀 Comece em 30 segundos

### 1. Iniciar a Aplicação
```bash
npm run dev
```
Aguarde ~5 segundos até ver "ready in 500ms"

### 2. Acessar Dashboard
```
http://localhost:5173
```

### 3. Clicar em "📖 Documentação"
Veja a página de documentação abrir!

---

## ✅ Testes Rápidos

### Teste 1: Menu Visível
```
☐ Abra a app
☐ Veja o menu lateral
☐ Localize "📖 Documentação"
☐ Confirme que tem o ícone correto
```

### Teste 2: Navegação Funciona
```
☐ Clique em "📖 Documentação"
☐ Observe URL mudar para /documentacao
☐ Veja README carregando
☐ Confirme que conteúdo aparece
```

### Teste 3: Sidebar da Doc
```
☐ Veja 4 opções na sidebar esquerda
☐ 📘 Guia Principal
☐ ⚙️ Guia de Desenvolvimento
☐ 🏗️ Arquitetura do Projeto
☐ 🗺️ Roadmap
```

### Teste 4: Clique Entre Documentos
```
☐ Clique em "⚙️ Guia de Desenvolvimento"
☐ Conteúdo muda para DESENVOLVIMENTO
☐ Clique em "🏗️ Arquitetura"
☐ Conteúdo muda para ARQUITETURA
☐ Clique em "🗺️ Roadmap"
☐ Conteúdo muda para ROADMAP
```

### Teste 5: Scroll do Conteúdo
```
☐ Veja conteúdo principal
☐ Faça scroll para baixo
☐ Confirme que sidebar fica fixa
☐ Apenas conteúdo faz scroll
```

### Teste 6: Markdown Renderizado
```
☐ Veja títulos em tamanhos diferentes
☐ Veja listas com bullets
☐ Veja trechos de código destacados
☐ Veja links clicáveis
```

### Teste 7: Responsive Mobile
```
☐ Abra DevTools (F12)
☐ Clique em Toggle Device Toolbar
☐ Selecione iPhone 12
☐ Confirme que layout se adapta
☐ Sidebar empilha corretamente
☐ Texto fica legível
```

### Teste 8: Responsive Tablet
```
☐ Em DevTools, selecione iPad
☐ Confirme layout flexível
☐ Sidebar e conteúdo balanceados
☐ Tipografia legível
```

### Teste 9: Rotas Diretas
```
Browser → Digite na URL:

/documentacao/readme
  ✓ Carrega README

/documentacao/development
  ✓ Carrega DESENVOLVIMENTO

/documentacao/architecture
  ✓ Carrega ARQUITETURA

/documentacao/roadmap
  ✓ Carrega ROADMAP
```

### Teste 10: Voltar ao Dashboard
```
☐ Clique em "🏠 Painel"
☐ Volta para dashboard
☐ Clique novamente em "📖 Documentação"
☐ Documentação abre de novo
☐ Rota atualiza corretamente
```

---

## 🎨 Testes Visuais

### Cores
```
✓ Header com gradiente roxo
✓ Sidebar com fundo branco
✓ Texto em cinza escuro
✓ Links em roxo
✓ Hover em cinza claro
```

### Tipografia
```
✓ Títulos em tamanho grande
✓ Subtítulos moderados
✓ Corpo legível
✓ Código com fonte monospace
✓ Contraste adequado
```

### Espaçamento
```
✓ Padding consistente
✓ Gap entre elementos
✓ Margens harmoniosas
✓ Texto respira bem
```

---

## 🐛 Testes de Erro

### Teste de URL Inválida
```
Acesse: /documentacao/invalid

Esperado:
  - Página carrega
  - Mostra README por padrão
  - Sem erro no console
```

### Teste de Scroll Grande
```
Vá para README:
  - Faça muito scroll
  - Confirma que performance mantém
  - Sem lag ou jank
```

### Teste de Resize
```
Em Desktop:
  - Abra página
  - Redimensione janela
  - Layout se adapta
  - Sem quebras
```

---

## 📱 Testes por Dispositivo

### Desktop (1920×1080)
```
☐ Layout horizontal com sidebar
☐ Conteúdo amplo
☐ Tudo legível
☐ Sem horizontal scroll
```

### Laptop (1366×768)
```
☐ Layout normal
☐ Sidebar visível
☐ Conteúdo sem truncar
☐ Responsivo
```

### Tablet (768×1024)
```
☐ Layout se adapta
☐ Sidebar empilhado ou reduzido
☐ Toque funciona
☐ Texto legível
```

### Mobile (375×667)
```
☐ Sidebar horizontal scroll
☐ Conteúdo toma tela inteira
☐ Tipografia reduzida apropriadamente
☐ Tudo acessível por toque
```

### Small Mobile (320×568)
```
☐ Ainda funciona
☐ Sem overflow
☐ Legível
☐ Clicável
```

---

## 🔍 Testes de Acessibilidade

### Keyboard Navigation
```
Press TAB:
  ☐ Foco vai para próximo elemento
  ☐ Sidebar items focáveis
  ☐ Links focáveis
  ☐ Ordem lógica
```

### Screen Reader (NVDA/JAWS)
```
☐ Elementos têm labels
☐ Títulos lidos corretamente
☐ Links têm contexto
☐ Roles adequados
```

### Color Contrast
```
☐ Texto vs fundo
☐ Links vs fundo
☐ Código vs fundo
☐ Ratio > 4.5:1
```

### Zoom
```
Press Ctrl + +:
  ☐ Layout mantém
  ☐ Texto legível
  ☐ Não quebra
  ☐ 200% zoom ok
```

---

## 📊 Testes de Performance

### Load Time
```
Abra DevTools → Network:
  ☐ HTML carrega < 500ms
  ☐ CSS carrega < 200ms
  ☐ JS carrega < 500ms
  ☐ Total < 2s
```

### Rendering
```
Abra DevTools → Performance:
  ☐ FCP (First Contentful Paint) < 1s
  ☐ LCP (Largest Contentful Paint) < 2.5s
  ☐ CLS (Cumulative Layout Shift) < 0.1
```

### Memory
```
Abra DevTools → Memory:
  ☐ Heap < 50MB
  ☐ Sem memory leaks
  ☐ Detached DOM nodes = 0
```

---

## 🎯 Testes de Funcionalidade

### Teste Completo de Fluxo
```
1. Abra app
   └─ ✓ Dashboard aparece

2. Clique "📖 Documentação"
   └─ ✓ URL muda para /documentacao
   └─ ✓ README carrega
   └─ ✓ Sidebar mostra 4 docs

3. Clique em cada documento
   └─ ✓ README: Visão geral
   └─ ✓ DESENVOLVIMENTO: How-to
   └─ ✓ ARQUITETURA: Technical
   └─ ✓ ROADMAP: Planning

4. Teste responsive
   └─ ✓ Desktop ok
   └─ ✓ Tablet ok
   └─ ✓ Mobile ok

5. Volte ao Dashboard
   └─ ✓ "🏠 Painel" funciona
   └─ ✓ Menu volta normal

6. Acesse documentação novamente
   └─ ✓ Lembra do último doc
   └─ ✓ Ou volta pro README
```

---

## 💾 Checklist Pré-Deploy

### Código
- [ ] Sem console.log de debug
- [ ] Sem comentários de teste
- [ ] Variáveis nomeadas corretamente
- [ ] Funções documentadas
- [ ] Sem código duplicado

### Styles
- [ ] Sem inline styles
- [ ] CSS modular
- [ ] Media queries testadas
- [ ] Cores consistentes
- [ ] Fontes carregadas

### Performance
- [ ] Componentes memoizados
- [ ] Lazy loading funciona
- [ ] Suspense mostra loading
- [ ] Sem N+1 queries
- [ ] Images otimizadas

### Acessibilidade
- [ ] ARIA labels presentes
- [ ] Keyboard navigation ok
- [ ] Color contrast ok
- [ ] Sem focus loss
- [ ] Screen reader ok

### Documentação
- [ ] README claro
- [ ] Código comentado
- [ ] Exemplos presentes
- [ ] Troubleshooting documentado
- [ ] Próximas etapas claras

### Testes
- [ ] Todos os documentos carregam
- [ ] Responsive em todos tamanhos
- [ ] Links funcionam
- [ ] Markdown renderiza
- [ ] Sem erros no console

---

## 🆘 Se Algo Não Funcionar

### Documentação não carrega
```
1. Abra DevTools (F12)
2. Vá para Console
3. Procure por erros
4. Verifique se getMockDocumentation() tem o doc ID
```

### Layout quebrado no mobile
```
1. Verifique media queries
2. Teste em diferentes tamanhos
3. Verifique flexbox properties
4. Use Chrome DevTools device toggle
```

### Sidebar não funciona
```
1. Verifique NavLink em routes
2. Confirme path correto
3. Teste navegar manualmente por URL
4. Revise onClick handlers
```

### Markdown não renderiza
```
1. Verifique getMockDocumentation()
2. Teste markdown simples (##, -, texto)
3. Confirme renderMarkdown() processa
4. Abra DevTools veja o HTML gerado
```

### Rotas não funcionam
```
1. Verifique routes/index.jsx
2. Confirme path: 'documentacao/:doc?'
3. Teste cada rota manualmente
4. Use useParams() para debug
```

---

## 📝 Log de Testes

Use este template para registrar testes:

```
Data: ___/___/______
Tester: _____________
Browser: Chrome / Firefox / Safari / Edge

Teste                           Status          Notas
─────────────────────────────────────────────────────
Menu visível                    ✓ ✗            ____
Navegação funciona              ✓ ✗            ____
Sidebar doc completa            ✓ ✗            ____
Click entre docs                ✓ ✗            ____
Scroll independente             ✓ ✗            ____
Markdown renderiza              ✓ ✗            ____
Mobile responsive               ✓ ✗            ____
Tablet responsive               ✓ ✗            ____
Rotas diretas                   ✓ ✗            ____
Voltar ao dashboard             ✓ ✗            ____

Issues encontradas:
1. _________________________________
2. _________________________________
3. _________________________________

Aprovado para produção?  ✓ Sim   ✗ Não
```

---

## 🎉 Teste Completo

Se tudo passa aqui, você está pronto!

```
✅ Menu criado
✅ Página renderiza
✅ 4 documentos carregam
✅ Sidebar funciona
✅ Markdown renderiza
✅ Responsivo
✅ Acessível
✅ Performance ok
✅ Sem erros

🚀 PRONTO PARA PRODUÇÃO!
```

---

**Boa sorte nos testes! 🧪**
