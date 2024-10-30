import { createNewUser, deleteUser, updateUser } from "./UsersDAO.js"

export async function validateNewUser(userName, userPassword, userRol) {
    if (userName.length === 0) {
        return { status: 404, data: 'El nombre de usuario no puede estar vacio' }
    }

    if (userPassword.length === 0) {
        return { status: 404, data: 'La contraseña no puede estar vacia' }
    }

    if (userRol !== 'ADM' && userRol !== 'BLB' && userRol !== 'ALU') {
        return { status: 404, data: 'El rol del usuario no se encuentra dentro de los roles establecidos' }
    }

    try {
        const response = await createNewUser(userName, userPassword, userRol)
        return response
    } catch (error) {
        console.error(error)
        return { status: 500, data: 'Error de servidor, inténtelo más tarde', error: error.data }
    }
}

export async function validateUpdateUser(userId, userName, userPassword, userRol) {
    if (userId === undefined || userId === null) {
        return { status: 404, data: 'El ID del usuario no puede estar vacio' }
    }

    if (userName.length === 0) {
        return { status: 404, data: 'El nombre de usuario no puede estar vacio' }
    }

    if (userPassword.length === 0) {
        return { status: 404, data: 'La contraseña no puede estar vacia' }
    }

    if (userRol !== 'ADM' && userRol !== 'BLB' && userRol !== 'ALU') {
        return { status: 404, data: 'El rol del usuario no se encuentra dentro de los roles establecidos' }
    }

    try {
        const response = await updateUser(userId, userName, userPassword, userRol)
        return response
    } catch (error) {
        console.error(error)
        return { status: 500, data: 'Error de servidor, inténtelo más tarde', error: error.data }
    }
}

export async function validateDeleteUser(userId) {
    if (userId === undefined || userId === null) {
        return { status: 404, data: 'El ID del usuario no puede estar vacio' }
    }

    try {
        const response = await deleteUser(userId)
        return response
    } catch (error) {
        console.error(error)
        return { status: 500, data: 'Error de servidor, inténtelo más tarde', error: error.data }
    }
}