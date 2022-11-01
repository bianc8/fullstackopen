import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}


const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part: CoursePart) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;