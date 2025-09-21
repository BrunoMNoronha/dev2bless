import { createContext, useContext } from 'react'

export const StudyContext = createContext(null)

export function StudyProvider({ children }) {
  const data = {
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
      { titulo: 'Leitura da semana', texto: 'Mateus 5–7. Foque no Sermão do Monte.' },
      { titulo: 'Agenda de prova', texto: 'Quiz de Hermenêutica no sábado às 10h.' }
    ],
    cursos: [
      { titulo: 'Evangelhos Sinópticos', desc: 'Mateus, Marcos e Lucas. Contexto histórico e literário.' },
      { titulo: 'Fundamentos de Hermenêutica', desc: 'Princípios de interpretação. Gêneros e contexto.' }
    ]
  }
  return <StudyContext.Provider value={data}>{children}</StudyContext.Provider>
}

export const useStudy = () => useContext(StudyContext)
