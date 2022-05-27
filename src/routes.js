const router = require('express').Router()
const { verifyToken } = require('./modules/jwt')

const UserController = require('./controllers/UserController')
const HistoricController = require('./controllers/HistoricController')
const ServiceController = require('./controllers/ServiceController')
router.post('/users/create', UserController.create)
//login
router.post('/users/login', UserController.login)

//personal data
router.get('/users/:id',  UserController.personalData)
router.put('/change/:id',  UserController.changePassword)

//historic
router.get('/historic/:cpfEmployee',  HistoricController.historic)

//service
router.get('/service/:cpfEmployee',  ServiceController.service)
module.exports = router
