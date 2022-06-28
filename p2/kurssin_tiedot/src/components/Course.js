import Header from './Header'
import Content from './Content'
import Total from './Total'
import React from 'react'

const Course = ({ course }) => {
	return (
		<div>
		  <Header course={course} />
		  <Content course={course} />
		  <Total course={course} />
		</div>
	)
}

export default Course