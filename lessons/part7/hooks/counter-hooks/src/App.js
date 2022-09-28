import { useCounter } from './hooks/useCounter'

const App = () => {
  const counter = useCounter()
  const left = useCounter()
  const right = useCounter()

  return (
    <div>
      <div>
        {counter.value}
        <button onClick={counter.increase}>
          plus
        </button>
        <button onClick={counter.decrease}>
          minus
        </button>      
        <button onClick={counter.zero}>
          zero
        </button>
      </div>
      {left.value}
      <button onClick={left.increase}>
        left
      </button>
      <button onClick={right.increase}>
        right
      </button>
      {right.value}
    </div>
  )
}

export default App