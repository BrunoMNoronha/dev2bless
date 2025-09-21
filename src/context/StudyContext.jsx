import { createContext, useContext } from 'react'

/**
 * @typedef {Object} Usuario
 * @property {string} nome Nome do usuário autenticado.
 * @property {string} periodo Período ou turma do usuário.
 */

/**
 * @typedef {Object} Financas
 * @property {number} aContribuir Valor pendente de contribuição.
 * @property {number} contribuido Valor já contribuído no mês.
 * @property {number} outros Outros valores financeiros.
 */

/**
 * @typedef {{ nome: string }} Instructor
 */

/**
 * @typedef {Object} Aviso
 * @property {string} titulo Título do aviso.
 * @property {string} texto Descrição do aviso.
 */

/**
 * @typedef {Object} Course
 * @property {string} titulo Título do curso.
 * @property {string} desc Descrição do curso.
 */

/**
 * @typedef {Object} StudyData
 * @property {Usuario} usuario Dados do usuário autenticado.
 * @property {Financas} financas Resumo financeiro do usuário.
 * @property {Instructor[]} instrutores Lista de instrutores.
 * @property {Aviso[]} avisos Lista de avisos do dia.
 * @property {Course[]} cursos Cursos em andamento.
 */

/** @type {StudyData} */
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
    { titulo: 'Leitura da semana', texto: 'Mateus 5–7. Foque no Sermão do Monte.' },
    { titulo: 'Agenda de prova', texto: 'Quiz de Hermenêutica no sábado às 10h.' }
  ],
  cursos: [
    { titulo: 'Evangelhos Sinópticos', desc: 'Mateus, Marcos e Lucas. Contexto histórico e literário.' },
    { titulo: 'Fundamentos de Hermenêutica', desc: 'Princípios de interpretação. Gêneros e contexto.' }
  ]
}

export const StudyContext = createContext(/** @type {StudyData | null} */ (null))

/**
 * Provedor de dados do estudo que encapsula a aplicação.
 *
 * @param {{ children: import('react').ReactNode }} props Propriedades do provedor.
 * @returns {import('react').JSX.Element} Provedor de contexto renderizado.
 */
export function StudyProvider ({ children }) {
  return (
    <StudyContext.Provider value={STUDY_DATA}>
      {children}
    </StudyContext.Provider>
  )
}

/**
 * Hook para acessar os dados de estudo dentro do contexto.
 *
 * @returns {StudyData} Dados de estudo disponíveis no contexto.
 */
export function useStudy () {
  const context = useContext(StudyContext)
  if (!context) {
    throw new Error('useStudy deve ser utilizado dentro de um StudyProvider')
  }
  return context
}
