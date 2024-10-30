import { loginUser } from "./LoginDAO.js"

export async function validateLoginUser(userName, userPassword) {
    if (userName.length === 0) {
        return { status: 404, data: 'El nombre de usuario no puede estar vacio' }
    }

    if (userPassword.length === 0) {
        return { status: 404, data: 'La contraseña no puede estar vacia' }
    }

    try {
        const response = await loginUser(userName, userPassword)
        return response
    } catch (error) {
        console.error(error)
        return { status: 500, data: 'Error de servidor, inténtelo más tarde', error: error.data }
    }
}