const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const { toDefaultValue } = require('sequelize/lib/utils')


const agendamento = db.define('Agendamento',{
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
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
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'agendado',
        allowNull: false
    }
})

module.exports = agendamento