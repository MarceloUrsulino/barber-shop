const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const barbeiro = db.define('Barbeiro',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = barbeiro