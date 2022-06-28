import React from 'react'

const Blog = ({ blog, removeFunction}) => {

  return (
    <div className = 'blog'>
      <br></br>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>{blog.likes}</div>
      <button name = {blog.title} value={blog.id} onClick={removeFunction}> Delete</button>
    </div>
  )
}

export default Blog