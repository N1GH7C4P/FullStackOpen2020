import React from 'react'
import CountryData from './CountryData';

const Country = ({ country, toggleDataVisibility }) => {

  const label = country.showData
    ? 'Hide data' : 'Show data'

  return (
    <div>
      <h1>{country.name}</h1>
      <div>
      <CountryData
        country={country}
      />
      <button onClick={toggleDataVisibility}>{label}</button>
      </div>
    </div>
  )
}

export default Country