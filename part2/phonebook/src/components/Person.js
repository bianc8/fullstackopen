import React from 'react'

const Person = ({person, onClick}) => (
  <>
    <p>
      {person.name} {person.number}
      <button onClick={onClick}>delete</button>
    </p>
  </>
)

export default Person