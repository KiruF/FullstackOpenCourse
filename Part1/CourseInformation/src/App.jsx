const Header = (props) =>
  <h1>{props.course.name}</h1>

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {  
  const partArray = props.parts
  const sum =
    partArray[0].exercises +
    partArray[1].exercises +
    partArray[2].exercises

  return (
    <p>Number of exercises {sum} </p>
  )
}

const Part = (props) =>
  <p>{props.part.name} {props.part.exercises}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default App