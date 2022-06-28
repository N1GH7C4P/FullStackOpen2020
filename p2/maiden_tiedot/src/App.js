import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newCriteria, setNewCriteria ] = useState('')
  const countriesToShow = countries.filter(country => country.name.includes(newCriteria))

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  const handleCriteriaChange = (event) => {
    setNewCriteria(event.target.value)
  }


  return (
    <div>
      <h1>Maiden tiedot</h1>
      <Filter
        filterCriteria = {newCriteria}
        changeHandler = {handleCriteriaChange}
      />
      <Countries
        countriesToShow = {countriesToShow}
      />  
    </div>
  )
}

export default App