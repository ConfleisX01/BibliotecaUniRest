import express from 'express'
import { validateNewBook, validateUpdateBook, validateUpdateBookStatus } from './BooksCQRS.js'
import { getAllBooks } from './BooksDAO.js'
import { getBooksFromUniversity } from '../AppService/ExternalBooks.js'
import { BooksPrivate, BooksPublic } from './BooksMV.js'

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

BooksController.get('/getPublicBooks', async (req, res) => {
    try {
        const booksList = []
        const response = await getAllBooks()
        const myBooks = response.data

        myBooks.forEach(book => {
            const exportedBook = new BooksPublic(book.book_name, book.book_author, book.book_genre, book.book_status, book.book_route, 'UTL')
            booksList.push(exportedBook)
        })

        res.status(200).send(booksList)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo mas tarde.')
    }
})

BooksController.get('/getAllBooks', async (req, res) => {
    try {
        const mappedBooksFromRobert = []
        const myBooks = await getAllBooks()
        const booksFromRobert = await getBooksFromUniversity('http://192.168.137.1:3001/empleado/getAllLibrosPublico')
        booksFromRobert.data.forEach(book => {
            const newBook = new BooksPrivate(book.nombreLibro, book.autorLibro, book.generoLibro, book.estatusLibro, book.rutaPdfLibro, book.casaLibro)
            mappedBooksFromRobert.push(newBook)
        })
        res.send([...myBooks.data, ...mappedBooksFromRobert])
    } catch (error) {
        console.error(error)
    }
})

export default BooksController