const router = require('express').Router()
const AgendamentoController = require('../controllers/agendamentoControllers')
const BarbeiroController = require('../controllers/barbeiroControllers')
const ClienteController = require('../controllers/clienteControllers')
const ServicoController = require('../controllers/servicoControllers')

const checkToken = require('../middleware/checkToken')

router.post('/barbeiro', BarbeiroController.barbeiroCreate)
router.post('/login', BarbeiroController.login)
router.get('/barbeiro', BarbeiroController.barbeiroAll)

router.post('/cliente', ClienteController.clienteCreate)
router.get('/cliente', checkToken, ClienteController.clienteAll)

router.post('/servico', checkToken, ServicoController.servicoCreate)
router.get('/servico', ServicoController.servicoAll)

router.post('/agendamento', AgendamentoController.agendamentoCreate)
router.get('/agendamento', checkToken, AgendamentoController.agendamentoAll)

router.get('/agendamento/barbeiro', checkToken, AgendamentoController.agendaBarbeiro)
router.patch('/agendamento/status/:id', checkToken, AgendamentoController.updateAgendamento)


module.exports = router