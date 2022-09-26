import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateImportance = async (id) => {
  const note = await axios.get(`${baseUrl}/${id}`)
  const changedNote = { ...note.data, important: !note.data.important }

  const response = await axios.put(`${baseUrl}/${id}`, changedNote)
  return response.data
}

export default {
  getAll,
  createNew,
  updateImportance,
}