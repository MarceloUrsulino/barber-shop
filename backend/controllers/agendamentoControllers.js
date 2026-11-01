const Agendamento = require('../models/agendamento')
const Cliente = require('../models/cliente')
const Barbeiro = require('../models/barbeiro')
const Servico = require('../models/servico')
const { message } = require('statuses')



module.exports = class AgendamentoController{
    static async agendamentoCreate(req,res){
        const { hora, data, clienteId, barbeiroId, servicoId } = req.body

        if(!hora){
            res.status(422).json({message: 'O campo precisa ser preenchido.'})
            return
        }
        //VALIDAÇÃO
        const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
            if(!horaRegex.test(hora)){
                res.status(422).json({message: 'O horário precisa ser válido'})
                return
            }  
            
        if(!data){
            res.status(422).json({message: 'O campo precisa ser preechido.'})
            return
        }
        const regexData = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if(!regexData.test(data)){
            res.status(422).json({message: 'A data precisa ser válida.'})
            return
        }
        //CONVERTENDO A DATA PARA FORMATO PADRAO POIS RECEBI EM FORMATO BR
        const partesData = data.split("/")
        const dia = partesData[0]
        const mes = partesData[1]
        const ano = partesData[2]
        const dataFormatada = `${ano}-${mes}-${dia}`
        

        if(!clienteId){
            res.status(422).json({message: 'O campo precisa ser preenchido.'})
            return
        }
         if(!barbeiroId){
            res.status(422).json({message: 'O campo precisa ser preenchido.'})
            return
        }
         if(!servicoId){
            res.status(422).json({message: 'O campo precisa ser preenchido.'})
            return
        }

        const clienteIdCheck = await Cliente.findByPk(clienteId)
        if(!clienteIdCheck){
            res.status(422).json({message: 'cliente não encontrado.'})
            return
        }
         const barbeiroIdCheck = await Barbeiro.findByPk(barbeiroId)
        if(!barbeiroIdCheck){
            res.status(422).json({message: 'Barbeiro não encontrado.'})
            return
        }
         const servicoIdCheck = await Servico.findByPk(servicoId)
        if(!servicoIdCheck){
            res.status(422).json({message: 'Serviço não encontrado.'})
            return
        }

        const agendamentoCheck = await Agendamento.findOne({where: {barbeiroId: barbeiroId, hora: hora, data: dataFormatada}})
        if(agendamentoCheck){
            res.status(422).json({message: 'Agendamento indisponível, tente outra data e horário.'})
            return
        }

        //CRIAR
        const create = await Agendamento.create({
            hora,
            data: dataFormatada,
            clienteId,
            barbeiroId,
            servicoId
        })
        res.status(201).json({message: 'Agendamento criado.'})
        return
    }
    //LISTAR
    static async agendamentoAll(req,res){
        const agendamentos = await Agendamento.findAll()
        res.status(200).json(agendamentos)
    }

    //LISTAR AGENDAMENTOS DO BARBEIRO
    static async agendaBarbeiro(req,res){
        const id = req.barbeiro.id
        const agendamentosbarbeiro = await Agendamento.findAll({where: {barbeiroId: id}})
        res.status(200).json(agendamentosbarbeiro)
        
    } 
    //ATUALIZAR STATUS PARA CANCELADO
    static async updateAgendamento(req,res){
        const id = req.params.id //PEGA O ID DA URL
        const { status } = req.body
        if(!status){
            res.status(422).json({message: 'O campo precisa ser preenchido.'})
            return
        }
        const checkAgendamento = await Agendamento.findByPk(id)
        if(!checkAgendamento){
            res.status(422).json({message: 'Agendamento não existe.'})
            return
        }
        
        if(req.barbeiro.id !== checkAgendamento.barbeiroId){
            res.status(403).json({ message: 'Você não tem permissão para alterar este agendamento.'})
            return
        }
        await Agendamento.update({status}, {where: {id:id}})
        res.status(200).json({message: `O agendamento ${id} foi cancelado`})
    }
}