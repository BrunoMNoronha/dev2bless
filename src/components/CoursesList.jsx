import { memo } from 'react'

/**
 * @typedef {Object} Course
 * @property {string} titulo Título do curso.
 * @property {string} desc Descrição resumida do curso.
 */

/**
 * Lista de cursos em andamento para o usuário.
 *
 * @param {{ courses: Course[] }} props Propriedades com a lista de cursos.
 * @returns {import('react').JSX.Element} Grade de cursos renderizada.
 */
function CoursesListComponent ({ courses }) {
  return (
    <section>
      <h3 className="section-title" style={{ marginTop: 22 }}>Planos em andamento</h3>
      <div className="courses">
        {courses.map((course) => (
          <article key={course.titulo} className="course">
            <div className="thumb"></div>
            <div>
              <h4>{course.titulo}</h4>
              <p>{course.desc}</p>
            </div>
            <button className="btn">Ver</button>
          </article>
        ))}
      </div>
    </section>
  )
}

const CoursesList = memo(CoursesListComponent)
CoursesList.displayName = 'CoursesList'

export default CoursesList
