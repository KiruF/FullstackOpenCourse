const Header = (props) =>
  <h1>{props.headerContent}</h1>

const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} />
      <Part part={props.part2} />
      <Part part={props.part3} />
    </div>
  )
}

const Part = (props) =>
  <p>{props.part.name} {props.part.exercises}</p>

const Total = (props) => {
  let sum = 0.0;
  props.parts.forEach(part => 
    sum += part.exercises)

  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header headerContent={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total parts={[part1, part2, part3]} />
    </div>
  )
}

export default App