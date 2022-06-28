import React from 'react'

const BlogForm = ({title, author, likes, url, titleHandler, authorHandler, likesHandler, urlHandler, addFunction}) => {
  return (
    <form onSubmit={addFunction}>
        <div>Blog title:  </div>
        <input
          value={title}
          onChange={titleHandler}
        />
        <div>Author: </div>
        <input
          value={author}
          onChange={authorHandler}
        />
        <div>Blog url:  </div>
        <input
          value={url}
          onChange={urlHandler}
        />
        <div>likes: </div>
        <input
          value={likes}
          onChange={likesHandler}
        />
        <div>
          <button type="submit">tallenna</button>
        </div>
      </form>
  )
}

export default BlogForm