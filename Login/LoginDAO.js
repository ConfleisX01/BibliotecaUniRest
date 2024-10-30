import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'libros'
})

export async function loginUser(userName, userPassword) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?',
            [userName, userPassword],
            (err, response) => {
                if (err) {
                    reject({ status: 500, data: 'Error al iniciar sesion', error: err })
                } else {
                    if (response.length === 0) {
                        resolve({ status: 404, data: 'Credenciales no validas, intentelo nuevamente' })
                    } else {
                        resolve({ status: 200, data: response })
                    }
                }
            }
        )
    })
}