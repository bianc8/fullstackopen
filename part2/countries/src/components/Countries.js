import React from 'react'
import CountryList from './CountryList'

const Countries = ({countries}) => (
    <ul>
        {countries.map(country => (
            <CountryList country={country} key={country.name.common} />
        ))}
    </ul>
)

export default Countries