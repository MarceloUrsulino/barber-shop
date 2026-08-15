
const { where } = require('sequelize')
const Barbeiro = require('../models/barbeiro')

module.exports = class BarbeiroController{
    static async barbeiroValidation(req,res){
        const { nome } = req.body

        if(!nome){
            res.status(422).json({message: 'O campo precisa ser preenchido '})
            return
        }
        //CRIAR
        const barbeiroCreate = await Barbeiro.create({
            nome,
        })
        res.status(201).json({message: 'Barbeiro adicionado.'})
    }
    //LISTAR
    static async barbeiroAll(req,res){
        const barbeiros = await Barbeiro.findAll()
        res.status(200).json(barbeiros)
    }

    
}