export class BooksPublic {
    constructor(
        nombreLibro,
        autorLibro,
        generoLibro,
        estatusLibro,
        rutaPdfLibro,
        casaLibro,
        portadaLibro
    ) {
        this.nombreLibro = nombreLibro
        this.autorLibro = autorLibro
        this.generoLibro = generoLibro
        this.estatusLibro = estatusLibro
        this.rutaPdfLibro = rutaPdfLibro
        this.casaLibro = casaLibro
        this.portadaLibro = portadaLibro
    }
}

export class BooksPrivate {
    constructor(
        book_id,
        book_name,
        book_author,
        book_genre,
        book_status,
        book_route,
        book_house,
        book_image
    ) {
        this.book_id = book_id
        this.book_name = book_name
        this.book_author = book_author
        this.book_genre = book_genre
        this.book_status = book_status
        this.book_route = book_route
        this.book_house = book_house
        this.book_image = book_image
    }
}