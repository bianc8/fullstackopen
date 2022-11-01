import { CourseParts, CoursePartBase } from "../App";

const Content = (props: CourseParts) => {
  return (
    <div>
      {props.courseParts.map((part: CoursePartBase) => (
        <p key={part.name}>{part.name} {part.exerciseCount}</p>
      ))}
    </div>
  );
};

export default Content;