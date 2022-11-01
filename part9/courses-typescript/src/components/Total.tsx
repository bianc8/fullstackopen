import { courseParts, coursePartBase } from "../App"

const Total = (props: courseParts) => {
  const total = props.courseParts.reduce((carry, part: coursePartBase) => carry + part.exerciseCount, 0);
  return (
    <div>
      <p>
        Number of exercises{" "+total}
      </p>
    </div>
  )
}

export default Total;