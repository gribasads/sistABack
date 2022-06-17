const router = require('express').Router()
const { verifyToken } = require('./modules/jwt')


const GetController = require('./controllers/GetController')
const PostController = require('./controllers/PostController')

//get
router.get('/sell', GetController.allSells)
router.get('/buys', GetController.allBuys)
router.get('/provider', GetController.allProvider)
router.get('/inventory', GetController.allInventory)

//Post
router.get('/service/:cpfEmployee',  verifyToken, PostController.service)
router.get('/serviceData/:cpfEmployee&:idService', verifyToken, PostController.serviceData)
router.put('/done/:id', verifyToken, PostController.done)
router.post('/alter', verifyToken, PostController.alter)
module.exports = router
