import axios from "axios"

export async function getBooksFromUniversity(url) {
    try {
        const response = axios.get(url)
        return response
    } catch (error) {
        console.log(error)
        return { status: 500, data: 'Error de servidor' }
    }
}