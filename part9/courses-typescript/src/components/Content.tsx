import { courseParts, coursePartBase } from "../App";

const Content = (props: courseParts) => {
  return (
    <div>
      {props.courseParts.map((part: coursePartBase) => (
        <p key={part.name}>{part.name} {part.exerciseCount}</p>
      ))}
    </div>
  );
};

export default Content;