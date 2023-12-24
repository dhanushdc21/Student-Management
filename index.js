//http://localhost:9000/details
//http://localhost:9000/login/admin
//http://localhost:9000/login/student
const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/Classroom'
const app = express()



mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Connected Successfully.')
})

app.use(express.json())   //To let the system know we are sending data as json.

const detailRouter = require('./routes/details')
app.use('/details',detailRouter)
app.listen(9000, () => {
    console.log('Server started.')
})