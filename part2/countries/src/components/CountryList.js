import React, {useState} from 'react'
import Country from './Country'

const CountryList = ({country}) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    
    return (
        <>
            <li key={country.name.common}>
                {country.name.common}
                <button onClick={handleClick}>
                    {show ? "hide" : "show"}
                </button>
                {show ? <Country country={country} /> : <></>}
            </li>
        </>
    )
}

export default CountryList