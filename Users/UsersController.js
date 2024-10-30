import express from 'express'
import { getUsersList } from './UsersDAO.js'
import { validateDeleteUser, validateNewUser, validateUpdateUser } from './UsersCQRS.js'

const UsersController = express.Router()

UsersController.get('/getUsersList', async (req, res) => {
    try {
        const response = await getUsersList()
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo mas tarde.')
    }
})

UsersController.post('/createNewUser', async (req, res) => {
    const userName = req.body.userName
    const userPassword = req.body.userPassword
    const userRol = req.body.userRol

    try {
        const response = await validateNewUser(userName, userPassword, userRol)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo mas tarde.')
    }
})

UsersController.post('/updateUser', async (req, res) => {
    const userId = req.body.userId
    const userName = req.body.userName
    const userPassword = req.body.userPassword
    const userRol = req.body.userRol

    try {
        const response = await validateUpdateUser(userId, userName, userPassword, userRol)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo mas tarde.')
    }
})

UsersController.post('/deleteUser', async (req, res) => {
    const userId = req.body.userId

    try {
        const response = await validateDeleteUser(userId)
        res.status(response.status).send(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error de servidor, intentelo mas tarde.')
    }
})

export default UsersController