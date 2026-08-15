const barbeiro = require('../models/barbeiro')
const cliente = require('../models/cliente')
const servico = require('../models/servico')

const agendamento = require('../models/agendamento')


//TEM MUITOS:

barbeiro.hasMany(agendamento,{foreignKey: 'barbeiroId'})
cliente.hasMany(agendamento,{foreignKey: 'clienteId'})
servico.hasMany(agendamento,{foreignKey: 'servicoId'})

//PERTECE A:

agendamento.belongsTo(barbeiro, {foreignKey: 'barbeiroId'})
agendamento.belongsTo(cliente, {foreignKey: 'clienteId'})
agendamento.belongsTo(servico, {foreignKey: 'servicoId'})