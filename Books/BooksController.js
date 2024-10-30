import express from 'express'
import { validateNewBook, validateUpdateBook, validateUpdateBookStatus } from './BooksCQRS.js'
import { getAllBooks } from './BooksDAO.js'

const BooksController = express.Router()

BooksController.post('/createNewBook', async (req, res) => {
    const bookName = req.body.bookName
    const bookAuthor = req.body.bookAuthor
    const bookGenre = req.body.bookGenre
    const bookRoute = req.body.bookRoute

    try {
        const response = await validateNewBook(bookName, bookAuthor, bookGenre, bookRoute)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo mas tarde.')
    }
})

BooksController.post('/updateBook', async (req, res) => {
    const bookId = req.body.bookId
    const bookName = req.body.bookName
    const bookAuthor = req.body.bookAuthor
    const bookGenre = req.body.bookGenre
    const bookRoute = req.body.bookRoute

    try {
        const response = await validateUpdateBook(bookId, bookName, bookAuthor, bookGenre, bookRoute)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo mas tarde.')
    }
})

BooksController.post('/updateBookStatus', async (req, res) => {
    const bookId = req.body.bookId
    const bookStatus = req.body.bookStatus

    try {
        const response = await validateUpdateBookStatus(bookId, bookStatus)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo mas tarde.')
    }
})

BooksController.get('/getBooksList', async (req, res) => {
    try {
        const response = await getAllBooks()
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo mas tarde.')
    }
})

export default BooksController