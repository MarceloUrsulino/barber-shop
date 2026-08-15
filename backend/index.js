const express = require('express')
const app = express()
const models = require('./models/associacoes')
const db = require('./db/conn')


app.use(express.json())



db.sync().then(()=>{

    console.log('Concetou')
    app.listen(3000)

}).catch(err =>{

    console.log(err)
})








