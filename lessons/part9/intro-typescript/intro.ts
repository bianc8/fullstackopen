const birthdayGreeter = (name: string, age: number): string => {
  return `Happy birthday ${name}, you are now ${age} years old!`;
};

const birthdayHero = "Jane User";
const age = 22;

console.log(birthdayGreeter(birthdayHero, age));

// The return value is used to determine the return type of the function
// Type of return value is inferred from the return expression.
const add = (a: number, b: number) => {
  return a + b;
}


// another example
type CallsFunction = (callback: (result: string) => any) => void;

const func: CallsFunction = (cb) => {
  cb('done');
  //cb(1); // error
}

func((result) => {
  return result;
});