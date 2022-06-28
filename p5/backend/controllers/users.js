const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const mongoose = require('mongoose')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (body.password.length < 3) {
      return response.status(400).json({ error: 'Error, password is too short.' })
    }
    if (body.username.length < 3) {
      return response.status(400).json({ error: 'Error, username is too short.' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      _id: mongoose.Types.ObjectId()
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})



module.exports = usersRouter