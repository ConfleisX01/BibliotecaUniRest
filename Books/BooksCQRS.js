import { updateBook, updateBookStatus, createNewBook } from "./BooksDAO.js"

export async function validateNewBook(bookName, bookAuthor, bookGenre, bookRoute) {
    if (bookName.length === 0) {
        return { status: 400, data: 'El nombre del libro no puede estar vacío' }
    }

    if (bookAuthor.length === 0) {
        return { status: 400, data: 'El autor del libro no puede estar vacío' }
    }

    if (bookGenre.length === 0) {
        return { status: 400, data: 'El género del libro no puede estar vacío' }
    }

    if (bookRoute.length === 0) {
        return { status: 400, data: 'La ruta del libro no puede estar vacía' }
    }

    if (bookName.length < 5 || bookName.length > 100) {
        return { status: 400, data: 'El nombre del libro debe tener entre 5 y 100 caracteres' }
    }

    if (bookAuthor.length < 5 || bookAuthor.length > 100) {
        return { status: 400, data: 'El autor del libro debe tener entre 5 y 100 caracteres' }
    }

    try {
        const response = await createNewBook(bookName, bookAuthor, bookGenre, bookRoute)
        return response
    } catch (error) {
        return { status: 500, data: 'Error de servidor, inténtelo más tarde', error: error.data }
    }
}

export async function validateUpdateBook(bookId, bookName, bookAuthor, bookGenre, bookRoute) {
    if (bookId === null || bookId === undefined) {
        return { status: 400, data: 'El ID del libro no puede estar vacío.' }
    }

    if (bookName.length === 0) {
        return { status: 400, data: 'El nombre del libro no puede estar vacío.' }
    }

    if (bookAuthor.length === 0) {
        return { status: 400, data: 'El autor del libro no puede estar vacío.' }
    }

    if (bookGenre.length === 0) {
        return { status: 400, data: 'El género del libro no puede estar vacío.' }
    }

    if (bookRoute.length === 0) {
        return { status: 400, data: 'La ruta del libro no puede estar vacía.' }
    }

    if (bookName.length < 5 || bookName.length > 100) {
        return { status: 400, data: 'El nombre del libro debe tener entre 5 y 100 caracteres.' }
    }

    if (bookAuthor.length < 5 || bookAuthor.length > 100) {
        return { status: 400, data: 'El autor del libro debe tener entre 5 y 100 caracteres.' }
    }

    try {
        const response = await updateBook(bookId, bookName, bookAuthor, bookGenre, bookRoute)
        return response
    } catch (error) {
        return { status: 500, data: 'Error de servidor, inténtelo más tarde.', error: error.data }
    }
}

export async function validateUpdateBookStatus(bookId, bookStatus) {
    if (bookId === null || bookId === undefined) {
        return { status: 400, data: 'El ID del libro no puede estar vacío' }
    }

    if (bookStatus === null || bookStatus === undefined) {
        return { status: 400, data: 'El estatus del libro no puede estar vacío' }
    }

    try {
        const response = await updateBookStatus(bookId, bookStatus)
        return response
    } catch (error) {
        return { status: 500, data: 'Error de servidor, inténtelo más tarde', error: error.data }
    }
}