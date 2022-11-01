export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
export interface CoursePartDescription extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CoursePartDescription {
  type: "normal";
}

export interface CourseSubmissionPart extends CoursePartDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSpecialPart extends CoursePartDescription {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

/**
* Helper function for exhaustive type checking
*/
export const assertNever = (value: never): never => {
 throw new Error(
   `Unhandled discriminated union member: ${JSON.stringify(value)}`
 );
};