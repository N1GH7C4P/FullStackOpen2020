import React from 'react'
import Country from './Country'


const Countries = ({countriesToShow}) => {
    
    const toggleDataVisibilityOf = id => {
      console.log(
        'importance of ' + id + ' needs to be toggled'
      )
    }
    const rows = () => countriesToShow
      .map(country =>
        <div>
          <Country
            key={country.id}
            country={country}
            toggleDataVisibility={() => toggleDataVisibilityOf(country.id)}
          />
        </div>
      )
    return (
    <ul>{rows()}</ul>
  )
}

export default Countries