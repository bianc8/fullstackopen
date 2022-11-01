import { CoursePart, assertNever } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div key={part.name}>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
        </div>
      );
    case "groupProject":
      return (
        <div key={part.name}>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div key={part.name}>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>submit to <a href={part.exerciseSubmissionLink} target="_blank" rel="noreferrer">link</a></p>
        </div>
      );
    case "special":
      return (
        <div key={part.name}>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;