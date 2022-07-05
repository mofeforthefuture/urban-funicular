const express = require('express');
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

app.use(express.json())
mongoose.connect('mongodb://localhost:27017/app-db')
const users = []

app.get('/users',(req, res) => {
    res.json(users)
})
 app.post('/users', async (req,res) => {
    let {name,password} = req.body
    try {
        // const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, 10)
        // console.log(salt,'🧂');
        console.log(hashedPassword,'🔐')
        const user = {name, password:hashedPassword}
        users.push(user)
        res.status(201).send()
    }catch {
        res.status(500).send()
    }
 })
 app.post('/users/login',async (req,res) => {
    let {name,password} = req.body
    const user = users.find(user => user.name = name)
    if(user == null){
       return res.status(400).send('Cannot find user')
    }
    try {
   if(await bcrypt.compare(password, user.password)) {
    res.send('Success')
   }else {
    res.send('Login authentication failed try again')
   }
    }catch {
        res.send('failed')
    }
 })


app.listen(3000, () => {
    console.log('Server up at Port: 3000 ✅');
})