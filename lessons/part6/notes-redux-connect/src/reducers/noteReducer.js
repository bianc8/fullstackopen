import noteService from '../services/notes'

import { createSlice } from '@reduxjs/toolkit'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOfNote(state, action) {
      const id = action.payload.id
      return state.map(note =>
        note.id !== id ? note : action.payload 
      )     
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})

export const { toggleImportanceOfNote, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const toggleImportanceOf = id => {
  return async dispatch => {
    const updatedNote = await noteService.updateImportance(id)
    dispatch(toggleImportanceOfNote(updatedNote))
  }
}

export default noteSlice.reducer