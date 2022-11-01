import { CourseParts, CoursePartBase } from "../App"

const Total = (props: CourseParts) => {
  const total = props.courseParts.reduce((carry, part: CoursePartBase) => carry + part.exerciseCount, 0);
  return (
    <div>
      <p>
        Number of exercises{" "+total}
      </p>
    </div>
  )
}

export default Total;