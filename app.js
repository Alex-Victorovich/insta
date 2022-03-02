
const express = require('express')
const path = require('path')
const { db } = require('./DB')
// const dataFromDBFile = require('./DB')
// const db = dataFromDBFile.db

const PORT = 3000

const server = express()

server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'src', 'views'))
server.use(express.static(path.join(process.env.PWD, "public")))
server.use(express.urlencoded({ extended: true }))

server.get('/', (request, response) => {
  const usersQuery = request.query 
  let photoForRender = db.photo

  if (usersQuery.limit !== undefined && Number.isNaN(+usersQuery.limit) === false) {
    photoForRender = db.photo.slice(0, usersQuery.limit)
  }

  response.render('main', { listOfPhoto: photoForRender })
})

server.post('/addressbook', (req, res) => {
  const dataFromForm = req.body

  db.photo.push(dataFromForm)

  res.redirect('/')
});

server.get('*', (req, res) => {
  res.render('404')
})

server.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`)
})