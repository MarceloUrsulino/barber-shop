const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const servico = db.define('Servico',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
})

module.exports = servico