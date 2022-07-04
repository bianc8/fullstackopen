import React from 'react'

const PersonForm = ({onSubmit, name, number, nameChange, numberChange}) => (
    <form onSubmit={onSubmit}>
        {console.log( nameChange, numberChange, name, number)}
        <div>
            name: <input value={name} onChange={nameChange} />
        </div>
        <div>
            number: <input value={number} onChange={numberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm