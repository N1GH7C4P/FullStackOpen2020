import React from 'react'
import Languages from './Languages'

const CountryData = ({ country }) => {
  
  return (
    <p>
     <div>capital: {country.capital}</div>
     <div>population:{country.population}</div>
     <h2>Languages:</h2>
      <div><Languages languages={country.languages}/></div>
      <br></br>
     <img src={country.flag} width="300" height="200" alt="Flag"/>
    </p>
  )
}

export default CountryData