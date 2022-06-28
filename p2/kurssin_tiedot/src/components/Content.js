import React from 'react'

const Content = ({ course }) => {

	const parts = course.parts
    const rows  = () => parts.map(part =>
        <div>
            <ul>
			    {part.name}: {part.exercises} exercises
            </ul>
        </div>
	)
	return (
        <div>
		    {rows()}
        </div>
	)
}

export default Content