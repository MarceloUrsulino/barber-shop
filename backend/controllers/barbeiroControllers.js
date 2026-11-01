const jwt = require('jsonwebtoken')
const Barbeiro = require('../models/barbeiro')
const bcrypt = require('bcrypt')

module.exports = class BarbeiroController{
    static async barbeiroCreate(req,res){

    try{
        const { nome, email, senha } = req.body

        if(!nome){
            res.status(422).json({message: 'O campo precisa ser preenchido '})
            return
        }
        if(!email){
            res.status(422).json({message: 'O campo precisa ser preenchido '})
            return
        }
        if(!senha){
            res.status(422).json({message: 'O campo precisa ser preenchido '})
            return
        }

        const barberExiste = await Barbeiro.findOne({where: {email: email}})
        if(barberExiste){
            res.status(422).json({message: 'E-mail já cadastrado, por favor utilize outro e-mail.'})
            return
        }
        //CRIPTOGRAFANDO A SENHA COM BCRYPT
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, salt)


        //CRIAR
        const create = await Barbeiro.create({
            nome,
            email,
            senha: senhaHash
        })
        res.status(201).json({message: 'Barbeiro adicionado.'})

    }catch (error){
        console.log(error)
        res.status(500).json({message: "Erro ao tentar cadastrar"})
    }
}
    static async login(req,res){

    try{
        const { email, senha } = req.body
        if(!email){
            res.status(422).json({message: 'Campo vazio.'})
            return
        }
        if(!senha){
            res.status(422).json({message: 'Campo vazio.'})
            return
        }

        const barberExiste = await Barbeiro.findOne({where: {email: email}})
        if(!barberExiste){
            res.status(422).json({message: 'Barbeiro não existe.'})
            return
        }
        const senhaCheck = await bcrypt.compare(senha, barberExiste.senha)
        if(!senhaCheck){
            res.status(422).json({message: 'Senha incorreta.'})
            return
        }

        const token = jwt.sign({
            nome: barberExiste.nome,
            id: barberExiste.id
        }, process.env.JWT_SECRET, { expiresIn: '2h' })
        res.status(200).json({message: 'Você está conectado', token: token, barbeiroId: barberExiste.id,})

    } catch(error){
        console.log(error)
        res.status(500).json({message: "Erro ao tentar logar"})
    }
}
    //LISTAR
    static async barbeiroAll(req,res){
    
    try{
        const barbeiros = await Barbeiro.findAll({attributes: ['id','nome']})
        res.status(200).json(barbeiros)
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Erro ao tentar listar."})
    }
    
    }
}