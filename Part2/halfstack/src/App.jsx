import Course from './components/Course'
import TotalExercises from './components/TotalExercises'
import { useId } from 'react';

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
  }    

  return (
    <div>
      <Course course={course} />
      <TotalExercises parts={course.parts} />
    </div>
  )
}

export default App