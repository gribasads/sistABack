const router = require('express').Router()
const { verifyToken } = require('./modules/jwt')

const UserController = require('./controllers/UserController')
const HistoricController = require('./controllers/HistoricController')
const ServiceController = require('./controllers/ServiceController')
router.post('/users/create', UserController.create)
//login
router.post('/users/login', UserController.login)

//personal data
router.get('/users/:id', verifyToken, UserController.personalData)
router.put('/change/:id', verifyToken, UserController.changePassword)

//historic
router.get('/historic/:cpfEmployee', verifyToken, HistoricController.historic)

//service
router.get('/service/:cpfEmployee',  verifyToken, ServiceController.service)
router.get('/serviceData/:cpfEmployee&:idService', verifyToken, ServiceController.serviceData)
router.put('/done/:id', verifyToken, ServiceController.done)
router.post('/alter', verifyToken, ServiceController.alter)
module.exports = router
