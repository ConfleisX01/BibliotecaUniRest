import express from 'express'
import { validateLoginUser } from './LoginCQRS.js'

const LoginController = express.Router()

LoginController.get('/loginUser/:userName/:userPassword', async (req, res) => {
    const username = req.params.userName
    const userPassword = req.params.userPassword

    try {
        const response = await validateLoginUser(username, userPassword)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo mas tarde.')
    }
})

export default LoginController