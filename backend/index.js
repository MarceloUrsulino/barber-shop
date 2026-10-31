const express = require('express')
const app = express()
const models = require('./models/associacoes')
const db = require('./db/conn')


app.use(express.json())

const routes = require('./routes/routes')
app.use(routes)



db.sync().then(()=>{

    console.log('Conectou')
    app.listen(3000)

}).catch(err =>{

    console.log(err)
})








