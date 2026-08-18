const router = require('express').Router()
const BarbeiroController = require('../controllers/barbeiroControllers')
const ClienteController = require('../controllers/clienteControllers')
const ServicoController = require('../controllers/servicoControllers')

router.post('/barbeiro', BarbeiroController.barbeiroCreate)
router.get('/barbeiro', BarbeiroController.barbeiroAll)

router.post('/cliente', ClienteController.clienteCreate)
router.get('/cliente', ClienteController.clienteAll)

router.post('/servico', ServicoController.servicoCreate)
router.get('/servico', ServicoController.servicoAll)


module.exports = router