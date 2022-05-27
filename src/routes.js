const router = require('express').Router()
const { verifyToken } = require('./modules/jwt')

const UserController = require('./controllers/UserController')
const HistoricController = require('./controllers/HistoricController')

router.post('/users/create', UserController.create)
//login
router.post('/users/login', UserController.login)

//personal data
router.get('/users/:id',  UserController.personalData)
router.put('/change/:id',  UserController.changePassword)

//historic
router.get('/historic/:cpfEmployee',  HistoricController.historic)
module.exports = router
