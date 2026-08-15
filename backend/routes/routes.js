const router = require('express').Router()
const BarbeiroController = require('../controllers/barbeiroControllers')
const ClienteController = require('../controllers/clienteControllers')

router.post('/barbeiro', BarbeiroController.barbeiroCreate)
router.get('/barbeiro', BarbeiroController.barbeiroAll)

router.post('/cliente', ClienteController.clienteCreate)
router.get('/cliente', ClienteController.clienteAll)


module.exports = router