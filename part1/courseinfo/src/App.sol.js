const Header = ({ course }) => (
  <>
    <h1>{course}</h1>
  </>
)

const Part = ({part}) => (
  <>
    <p>
      {part.name} {part.exercises}
    </p>
  </>
)

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part part={part} key={index}/>
      ))}
    </div>
  )
}

const Total = ({parts}) => {
  let sum = parts.reduce((prev, current) => {
    return prev + +current.exercises
  }, 0);
  return (
    <>
      <p>
        Number of exercises {sum}
      </p>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

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
    <div>
      <Course course={course} />
    </div>
  )
}

export default App