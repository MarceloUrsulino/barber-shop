const Servico = require('../models/servico')

module.exports = class ServicoController{
    static async servicoCreate(req,res){
        const { nome, preco } =  req.body

        if(!nome){
            res.status(422).json({message: 'O campo precisa ser preechido.'})
            return
        }
        
        if(!preco){
            res.status(422).json({message: 'O preço precisa ser válido'})
            return
        }

        //VALIDAÇÃO
        const servicoExists = await Servico.findOne({where: {nome: nome}})
        if(servicoExists){
            res.status(422).json({message: 'Serviço já adicionado, tente um novo.'})
            return
        }

        //CRIAR
        const create = await Servico.create({
            nome,
            preco 
        })
        res.status(201).json({message: 'Serviço adicionado.'})
    }

    //LISTAR
    static async servicoAll(req,res){
        const servicos = await Servico.findAll()
        res.status(200).json(servicos)
    }

}

