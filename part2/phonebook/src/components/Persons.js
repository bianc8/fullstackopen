import Person from "./Person"

const Persons = ({persons, onClick}) => (
  <>
    {persons.map((person) => 
      <Person person={person} onClick={() => onClick(person.id)} key={person.id} />
    )}
  </>
)

export default Persons