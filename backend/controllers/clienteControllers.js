const Cliente = require('../models/cliente')

module.exports = class ClienteController{
    static async clienteCreate(req,res){
        const { nome, numero } = req.body
        

        if(!nome){
            res.status(422).json({message: 'O campo precisa ser preechido.'})
            return
        }

        const numeroregex = /^\(?[1-9]{2}\)?\s?(?:9\d|[2-9])\d{3}-?\d{4}$/
        if(!numeroregex.test(numero)){
            res.status(422).json({message: 'O número preciso ser válido.'})
            return
        }
           
        //CRIAR 
        const create = await Cliente.create({
            nome,
            numero
        })
        res.status(201).json({message: 'Cliente adicionado.'})
    }
    //LISTAR
    static async clienteAll(req,res){
        const clientes = await Cliente.findAll()
        res.status(200).json(clientes)
    }
}