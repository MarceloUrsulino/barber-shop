const { DataTypes } = require('sequelize')
const db = require('../db/conn')


const agendamento = db.define('Agendamento',{
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    barbeiroId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    servicoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = agendamento