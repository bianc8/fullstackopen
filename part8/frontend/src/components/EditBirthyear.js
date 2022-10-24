import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const EditBirthyear = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      //setError(error.graphQLErrors[0].message)
    }
  })
  const submit = (e) => {
    e.preventDefault()

    editAuthor({ variables: { author: name, setBornTo: parseInt(born) } })
    setName('')
    setBorn('')
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select onChange={(e) => setName(e.target.value)}>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
        <div>
          born
          <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default EditBirthyear