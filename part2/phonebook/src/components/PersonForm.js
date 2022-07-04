import React from 'react'

const PersonForm = ({name, number, nameChange, numberChange, onSubmit}) => (
    <form onSubmit={onSubmit}>
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