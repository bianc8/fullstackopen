import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('')
  const handleFilterChange = (event) => {setFilter(event.target.value)}  

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  

  let filteredCountries = countries.filter(country => country.name.common.toUpperCase().indexOf(filter.toUpperCase()) !== -1)
  
  return (
    <div>
      <p>find countries <input value={filter} onChange={handleFilterChange} /></p>
      {filteredCountries.length > 10 
        ? <p>Too many matches, specify another filter</p>
        : filteredCountries.length === 1
        ? <Country country={filteredCountries[0]} />
        : <Countries countries={filteredCountries} />
      }      
    </div>
  )
}

export default App