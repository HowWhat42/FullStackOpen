import { useState, useEffect } from 'react'
import axios from 'axios'
import { Filter, Country } from './components'

const App = () => {

  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])
  const [search, setSearch] = useState('')
  const [info, setInfo] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleSearch = (evt) => {
    setSearch(evt.target.value)
    if(!evt.target.value) {
      return setShowCountries(countries)
    }
    const filteredCountry = countries.filter((country) => country.name.common.toLowerCase().includes(evt.target.value.toLowerCase()))
    if(filteredCountry.length) {
        setShowCountries(filteredCountry)
    } else {
        setShowCountries(countries)
    }
    setInfo(null)
  }

  return (
    <div>
      <h2>Find Countries</h2>
      <Filter search={search} onSearch={handleSearch} />
      {info ? <Country data={info} /> : 
      (showCountries.length > 10 && <p>Too many matches, specify another filter</p>) || 
      (showCountries.length > 1 && showCountries.map((country) => (<div key={country.name.common}>
        <p>{country.name.common}</p>
        <button onClick={() => setInfo(country)}>Show</button>
      </div>
      ))) ||
      (showCountries.length === 1 && setInfo(showCountries[0]))}
    </div>
  )
}

export default App