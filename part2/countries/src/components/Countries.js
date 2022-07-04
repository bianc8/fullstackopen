import React from 'react'
import CountryList from './CountryList'

const Countries = ({countries}) => {
    return (
        <>
            <ul>
                {countries.map((country, i) => (
                    <CountryList country={country} key={country.name.common} />
                ))}
            </ul>
        </>
    )
}

export default Countries