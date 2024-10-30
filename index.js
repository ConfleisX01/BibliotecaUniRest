import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import BooksController from './Books/BooksController.js'
import LoginController from './Login/LoginController.js'
import UsersController from './Users/UsersController.js'

const app = express()

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'], credentials: true }))

app.use('/books', BooksController)
app.use('/login', LoginController)
app.use('/users', UsersController)

app.listen(3001, () => {
    console.log('http://localhost:3001')
})