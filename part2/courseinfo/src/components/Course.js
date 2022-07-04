import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => (
    <>
        {parts.map(part => <Part part={part} key={part.id} />)}
    </>
)

const Total = ({parts}) => {
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0);

    return ( <strong>total of {sum} exercises</strong> )
}

const Course = ({course}) => (
    <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

export default Course