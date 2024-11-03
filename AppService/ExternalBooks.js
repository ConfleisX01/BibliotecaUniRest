import axios from "axios"
import { BooksPrivate } from "../Books/BooksMV.js"

export async function getBooksFromOthers(url = '', mapping = {}) {
    try {
        const response = await axios.get(url)
        const mappedBooks = response.data.map(book => mappingBooks(mapping, book))
        return { status: 200, data: mappedBooks }
    } catch (error) {
        console.log(error)
        return { status: 500, data: 'Error de servidor' }
    }
}

function mappingBooks(mapping, book = {}) {
    const newBookObject = new BooksPrivate()

    newBookObject.book_name = book[mapping.bookName]
    newBookObject.book_author = book[mapping.bookAuthor]
    newBookObject.book_genre = book[mapping.bookGenre]
    newBookObject.book_status = book[mapping.bookStatus]
    newBookObject.book_route = book[mapping.bookRoute]

    return newBookObject
}