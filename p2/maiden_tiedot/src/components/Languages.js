import React from 'react'
import Language from './Language'

const Languages = ({languages}) => {
  
  const rows = () => languages.map(language =>
      <Language
        key={language.id}
        name={language.name}
      />
    )
  return (
  <ul>{rows()}</ul>
  )
}

export default Languages