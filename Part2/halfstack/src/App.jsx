import Course from './components/Course'
import {useId} from 'react'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: useId(),
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: useId()
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: useId()
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: useId()
        },
        {
          name: 'Redux',
          exercises: 11,
          id: useId()
        }
      ]
    },
    {
      name: 'Node.js',
      id: useId(),
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: useId()
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: useId()
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => 
        <Course 
          key={course.id} 
          course={course} />)}
    </div>
  )
}

export default App