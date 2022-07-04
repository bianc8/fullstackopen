
const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now);

  return (
    <div>
      <p>
        Hello World, it is {now.toString()}
      </p>
        {a} + {b} = {a + b}
    </div>
  );
}

export default App;
