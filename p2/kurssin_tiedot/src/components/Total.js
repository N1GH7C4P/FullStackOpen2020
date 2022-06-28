import React from 'react'

const Total = ({ course }) => {
	const parts = course.parts
	const tehtavia = parts.map( part => part.exercises ).reduce( (summa, currentValue) => summa + currentValue )
	return (
		<ul>
            <b>
                In total: {tehtavia}  exercises
            </b>
        </ul>
	)
}

export default Total