import React, { useEffect } from 'react'

import NewNote from './components/NewNote'
import ConnectedNotes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch]) 

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <ConnectedNotes />
    </div>
  )
}

export default App