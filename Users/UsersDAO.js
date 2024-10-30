import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'libros'
})

export async function getUsersList() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users',
            (err, response) => {
                if (err) {
                    reject({ status: 500, data: 'Error al obtener la lista de usuarios', error: err })
                } else {
                    if (response.length === 0) {
                        resolve({ status: 404, data: 'No hay usuarios registrados' })
                    } else {
                        resolve({ status: 200, data: response })
                    }
                }
            }
        )
    })
}

export async function createNewUser(userName, userPassword, userRol) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO users (user_name, user_password, user_rol) VALUES (?, ?, ?)',
            [userName, userPassword, userRol],
            (err, response) => {
                if (err) {
                    reject({ status: 500, data: 'Error al crear el usuario', error: err })
                } else {
                    if (response.affectedRows === 0) {
                        resolve({ status: 404, data: 'Error al crear el usuario', error: err })
                    } else {
                        resolve({ status: 200, data: 'Usuario creado con exito' })
                    }
                }
            }
        )
    })
}

export async function updateUser(userId, userName, userPassword, userRol) {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE users SET user_name = ?, user_password = ?, user_rol = ? WHERE user_id = ?',
            [userName, userPassword, userRol, userId],
            (err, response) => {
                if (err) {
                    reject({ status: 500, data: 'Error al actualizar el usuario', error: err })
                } else {
                    if (response.affectedRows === 0) {
                        resolve({ status: 404, data: 'Error al actualizar el usuario', error: err })
                    } else {
                        resolve({ status: 200, data: 'Usuario actualizado con exito' })
                    }
                }
            }
        )
    })
}

export async function deleteUser(userId) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM users WHERE user_id = ?',
            [userId],
            (err, response) => {
                if (err) {
                    reject({ status: 500, data: 'Error al eliminar el usuario', error: err })
                } else {
                    if (response.affectedRows === 0) {
                        resolve({ status: 404, data: 'Error al eliminar el usuario', error: err })
                    } else {
                        resolve({ status: 200, data: 'Usuario eliminado con exito' })
                    }
                }
            }
        )
    })
}