import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Country = ({data}) => {
    const [weather, setWeather] = useState(null)
    const APIKEY = process.env.REACT_APP_API_KEY
    
    useEffect(() => {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${data.capital[0]}&appid=${APIKEY}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
    }, [APIKEY, data.capital])
    
  return (
    <div>
        <h1>{data.name.common}</h1>
        <p>Capital: {data.capital[0]}</p>
        <p>Area: {data.area}</p>
        <div>
            <h3>Languages:</h3>
            <ul>
                {Object.values(data.languages).map((language) => (<li key={language}>{language}</li>))}
            </ul>
        </div>
        <img src={data.flags.png} alt='flag' />
        {weather && <div>
            <h2>Weather in {data.capital[0]}</h2>
            <p>Temperature: {weather?.main?.temp} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`} alt='icon' />
            <p>Wind: {weather?.wind?.speed} m/s</p>
          </div>}
    </div>
  )
}

export default Country