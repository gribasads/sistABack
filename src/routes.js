const router = require('express').Router()



const GetController = require('./controllers/GetController')
const PostController = require('./controllers/PostController')

//get
router.get('/sell', GetController.allSells)
router.get('/buys', GetController.allBuys)
router.get('/provider', GetController.allProvider)
router.get('/inventory', GetController.allInventory)
router.get('/day', GetController.sellsDay)
router.get('/month',GetController.sellsMonth)

//Post
router.post('/sell', PostController.insertSell)
router.post('/inventory',  PostController.insertInventory)
router.post('/buys', PostController.insertBuys)
router.post('/provider', PostController.insertProvider)
router.delete('/provider', PostController.deleteProvider)
module.exports = router
