const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}


const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" age={9}/>
      <Hello name="IT" age={32}/>
    </div>
  );
}

export default App;
