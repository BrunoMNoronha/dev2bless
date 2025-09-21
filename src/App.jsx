import { useEffect } from 'react'
import { StudyProvider, useStudy } from './context/StudyContext.jsx'

function Dashboard(){
  const ctx = useStudy()
  useEffect(()=>{
    const formatDate = (d)=> d.toLocaleDateString('pt-BR',{year:'numeric',month:'long',day:'numeric'})
    const el = document.getElementById('today')
    if(el) el.textContent = formatDate(new Date())
  },[])

  const fmt = (v)=> v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand" aria-label="Logo">
          <svg viewBox="0 0 24 24" role="img" aria-label="cap"><path d="M12 2 1 7l11 5 9-4.09V14h2V7L12 2zm-7 9.27V17c0 2.76 3.58 5 8 5s8-2.24 8-5v-2.73l-8 3.64-8-3.64z"/></svg>
        </div>
        <nav className="nav">
          <a className="active" href="#"><span className="icon">🏠</span> Painel</a>
          <a href="#"><span className="icon">💳</span> Contribuições</a>
          <a href="#"><span className="icon">📝</span> Inscrição</a>
          <a href="#"><span className="icon">📚</span> Planos de estudo</a>
          <a href="#"><span className="icon">🗂️</span> Pausar módulo</a>
          <a href="#"><span className="icon">🎯</span> Resultados</a>
          <a href="#"><span className="icon">🔔</span> Avisos</a>
          <a href="#"><span className="icon">📅</span> Agenda</a>
        </nav>
        <div className="spacer" />
        <a className="nav logout" href="#"><span className="icon">🚪</span> Sair</a>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="topbar">
          <div className="search" role="search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm10 17-5.2-5.2" stroke="#999" strokeWidth="2" strokeLinecap="round"/></svg>
            <input type="text" placeholder="Pesquisar" aria-label="search"
              onFocus={(e)=>e.currentTarget.parentElement.style.boxShadow='0 12px 30px rgba(21,13,57,.12)'}
              onBlur={(e)=>e.currentTarget.parentElement.style.boxShadow='var(--shadow)'} />
          </div>
          <div className="profile">
            <div className="badge" title="alertas" />
            <div className="avatar">BR</div>
            <div>
              <div style={{fontWeight:600,fontSize:13}}>{ctx.usuario.nome}</div>
              <div style={{fontSize:11,color:'var(--muted)'}}>{ctx.usuario.periodo}</div>
            </div>
          </div>
        </div>

        <section className="hero">
          <div>
            <div className="date" id="today"></div>
            <h2>Bem-vindo de volta, {ctx.usuario.nome}!</h2>
            <p>Mantenha o estudo bíblico em dia no seu portal</p>
          </div>
          <div className="hero-illu" aria-hidden="true">
            <div className="blob"></div>
            <svg className="gradcap" width="120" height="120" viewBox="0 0 24 24" fill="#1f1646" opacity=".95"><path d="M12 3 1 8l11 5 11-5-11-5Zm-6 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3l-8 3.64L6 12Z"/></svg>
          </div>
        </section>

        <div className="grid">
          <section>
            <h3 className="section-title">Finanças</h3>
            <div className="cards">
              <div className="card">
                <div className="kpi">
                  <div className="kpi-icon">💰</div>
                  <div>
                    <div className="kpi-value">{fmt(ctx.financas.aContribuir)}</div>
                    <div className="kpi-title">A contribuir</div>
                  </div>
                </div>
              </div>
              <div className="card" style={{outline:'3px solid var(--primary-200)'}}>
                <div className="kpi">
                  <div className="kpi-icon">🧾</div>
                  <div>
                    <div className="kpi-value">{fmt(ctx.financas.contribuido)}</div>
                    <div className="kpi-title">Contribuído no mês</div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="kpi">
                  <div className="kpi-icon">📈</div>
                  <div>
                    <div className="kpi-value">{fmt(ctx.financas.outros)}</div>
                    <div className="kpi-title">Outros</div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="section-title" style={{marginTop:22}}>Planos em andamento</h3>
            <div className="courses">
              {ctx.cursos.map((c, i)=> (
                <article key={i} className="course">
                  <div className="thumb"></div>
                  <div>
                    <h4>{c.titulo}</h4>
                    <p>{c.desc}</p>
                  </div>
                  <button className="btn">Ver</button>
                </article>
              ))}
            </div>
          </section>

          <aside>
            <div className="panel">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <h3 className="section-title" style={{margin:0}}>Instrutores</h3>
              </div>
              <div className="instructors">
                {ctx.instrutores.map((i, idx)=> (<div key={idx} className="dot" title={i.nome}></div>))}
              </div>
            </div>

            <div className="panel" style={{marginTop:18}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
                <h3 className="section-title" style={{margin:0}}>Avisos do dia</h3>
                <a className="seeall" href="#">Ver todos</a>
              </div>
              <div className="notice">
                {ctx.avisos.map((n, idx)=> (
                  <div key={idx} className="notice-item">
                    <h4>{n.titulo}</h4>
                    <p>{n.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default function App(){
  return (
    <StudyProvider>
      <Dashboard />
    </StudyProvider>
  )
}
