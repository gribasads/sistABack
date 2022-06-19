const router = require('express').Router()



const GetController = require('./controllers/GetController')
const PostController = require('./controllers/PostController')

//get
router.get('/sell', GetController.allSells)
router.get('/buys', GetController.allBuys)
router.get('/provider', GetController.allProvider)
router.get('/inventory', GetController.allInventory)

//Post
router.post('/sell', PostController.insertSell)
router.post('/inventory',  PostController.insertInventory)
router.post('/buys', PostController.insertBuys)
router.post('/provider', PostController.insertProvider)
module.exports = router
