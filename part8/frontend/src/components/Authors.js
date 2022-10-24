import EditBirthyear from "./EditBirthyear"

const Authors = ({ show, authors}) => {
  if (!show) {
    return null
  }
  if (!authors) {
    return <div>loading authors...</div>
  }

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditBirthyear authors={authors} />
    </>
  )
}

export default Authors
