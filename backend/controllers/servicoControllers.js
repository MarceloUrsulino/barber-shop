const Servico = require('../models/servico')

module.exports = class ServicoController{
    static async servicoCreate(req,res){

    try{
        const { nome, preco } =  req.body

        if(!nome){
            res.status(422).json({message: 'O campo precisa ser preenchido.'})
            return
        }
        //VALIDANDO SE É UM NÚMERO VÁLIDO
        if(!Number.isFinite(preco)){
            res.status(422).json({message: 'O preço precisa ser válido.'})
            return
        }
    
        if(preco <= 0){
            res.status(422).json({message: 'O preço precisa ser maior que zero.'})
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

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Erro ao tentar criar o serviço"})
    }
}

    //LISTAR
    static async servicoAll(req,res){

    try{
        const servicos = await Servico.findAll()
        res.status(200).json(servicos)

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Erro ao tentar listar os serviços."})
    }

}
}

