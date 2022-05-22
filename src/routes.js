const router = require('express').Router()
const { verifyToken } = require('./modules/jwt')

const UserController = require('./controllers/UserController')

router.post('/users/create', UserController.create)
router.post('/users/login', UserController.login)

router.get('/users/:id',  UserController.personalData)
router.put('/change/:id',  UserController.changePassword)
module.exports = router
