import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {

  const [blogs, setBlogs] = useState([]) 
  const [newTitle, setNewTitle ] = useState('')
  const [newAuthor, setNewAuthor ] = useState('')
  const [newUrl, setNewUrl ] = useState('')
  const [newLikes, setNewLikes ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      removeFunction={removeBlog}
    />
  )  

  useEffect(() => {
    blogService
      .getAll()
        .then(initialBlogs => {
        setBlogs(initialBlogs)
    })
  }, [])

  const removeBlog = (event) => {
    event.preventDefault()
    if(window.confirm(`Poistetaanko ${event.target.title}?`)){
      blogService
        .remove(event.target.value)
          .then(setBlogs(blogs.filter(blog => blog.id !== event.target.value)))
      setErrorMessage(`${event.target.title} poistettiin tietokannasta.`)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    }
    if(blogs.find(blog => blog.title === newTitle)){
      const oldBlog = blogs.find(blog => blog.title === newTitle)
      if(window.confirm(`${newTitle} on jo luettelossa. Haluatko korvata blogin?`)){
            const updatedBlogObject = {
              title: newTitle,
              author: newAuthor,
              url: newUrl,
              likes: newLikes,
              id: oldBlog.id
            }
      
            blogService
              .update(updatedBlogObject.id,updatedBlogObject)
              .catch(error => {
                setErrorMessage(`Blogi "${updatedBlogObject.title}" on jo poistettu palvelimelta.`)
              })

              const blogToRemove = blogs.find(blog => blog.id === updatedBlogObject.id)
              const index = blogs.indexOf(blogToRemove)
              blogs.splice(index,1,updatedBlogObject)
              setNewTitle("")
              setNewAuthor("")
              setNewLikes("")
              setNewUrl("")
              setErrorMessage(`Blogin "${updatedBlogObject.title}" tiedot päivitettiin.`)
            }
        }
        else{
          blogService
            .create(blogObject)
              .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNewTitle("")
                setNewAuthor("")
                setNewUrl("")
                setNewLikes("")
                setErrorMessage(`${returnedBlog.title} lisättiin puhelinluetteloon.`)
              })
              .catch(error => {
                console.log(error.response.data)
                setErrorMessage(error.response.data)
              })
        }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }

  return (
    <div>

      <Notification message={errorMessage} />

      <h1>Blogilista</h1>  

      <BlogForm
        title = {newTitle}
        author = {newAuthor}
        url = {newUrl}
        likes = {newLikes}
        titleHandler = {handleTitleChange}
        authorHandler = {handleAuthorChange}
        urlHandler = {handleUrlChange}
        likesHandler = {handleLikesChange}
        addFunction = {addBlog}
      />
      {rows()}
    </div>
  )
}

export default App