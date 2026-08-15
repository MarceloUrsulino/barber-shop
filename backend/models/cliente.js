const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const cliente = db.define('Cliente',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = cliente