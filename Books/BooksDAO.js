import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'libros'
})

export async function createNewBook(bookName, bookAuthor, bookGenre, bookRoute) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO books (book_name, book_author, book_genre, book_route) VALUES (?, ?, ?, ?)',
            [bookName, bookAuthor, bookGenre, bookRoute],
            (error, response) => {
                if (error) {
                    console.error(error);
                    reject({ status: 500, data: 'Error de servidor, intentelo mas tarde.', error: error })
                } else if (response.affectedRows === 0) {
                    resolve({ status: 404, data: 'Error al crear el nuevo libro.' })
                } else {
                    resolve({ status: 200, data: 'El libro se creó con éxito.' })
                }
            }
        )
    })
}

export async function updateBook(bookId, bookName, bookAuthor, bookGenre, bookRoute) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE books SET book_name = ?, book_author = ?, book_genre = ?, book_route = ? WHERE book_id = ?',
            [bookName, bookAuthor, bookGenre, bookRoute, bookId],
            (error, response) => {
                if (error) {
                    console.error(error);
                    reject({ status: 500, data: 'Error de servidor, intentelo mas tarde.', error: error })
                } else if (response.affectedRows === 0) {
                    resolve({ status: 404, data: 'Error al actualizar el libro.' })
                } else {
                    resolve({ status: 200, data: 'El libro se actualizó con éxito.' })
                }
            }
        )
    })
}

export async function updateBookStatus(bookId, bookStatus) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE books SET book_status = ? WHERE book_id = ?',
            [bookStatus, bookId],
            (error, response) => {
                if (error) {
                    console.error(error);
                    reject({ status: 500, data: 'Error de servidor, intentelo mas tarde.', error: error })
                } else if (response.affectedRows === 0) {
                    resolve({ status: 404, data: 'Error al actualizar el estatus del libro.' })
                } else {
                    resolve({ status: 200, data: 'El estatus del libro se actualizó con éxito.' })
                }
            }
        )
    })
}

export async function getAllBooks() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM books', (error, response) => {
            if (error) {
                reject({ status: 500, data: 'Error al obtener los libros.', error: error })
            } else {
                resolve({ status: 200, data: response })
            }
        })
    })
}