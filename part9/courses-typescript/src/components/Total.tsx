import { CoursePart } from "../types"

interface TotalProps {
  courseParts: CoursePart[];
}

const Total = (props: TotalProps) => {
  const total = props.courseParts.reduce((carry, part: CoursePart) => carry + part.exerciseCount, 0);
  return (
    <div>
      <hr />
      <h1>Total</h1>
      <p>
        Number of exercises{" "+total}
      </p>
    </div>
  )
}

export default Total;