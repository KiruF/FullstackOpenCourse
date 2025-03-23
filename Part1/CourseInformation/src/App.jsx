const Header = (props) =>
  <h1>{props.headerContent}</h1>

const Content = (props) => {
  return (
    <div>
      <Part partName={props.part1} exerciseCount={props.exercises1} />
      <Part partName={props.part2} exerciseCount={props.exercises2} />
      <Part partName={props.part3} exerciseCount={props.exercises3} />
    </div>
  )
}

const Part = (props) =>
  <p>{props.partName} {props.exerciseCount}</p>

const Total = (props) => {
  return (
    <p>Number of exercises {props.ex1Count + props.ex2Count + props.ex3Count}</p>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header headerContent={course} />
      <Content
        part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3} />
      <Total
        ex1Count={exercises1}
        ex2Count={exercises2}
        ex3Count={exercises3} />
    </>
  )
}

export default App