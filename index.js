const express = require('express')
const app = express()

var session = require('express-session')
var flash = require('express-flash')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



app.set('view engine', 'ejs')

app.use(cookieParser('qualquercoisa'))
app.use(session(({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
})))

app.use(flash())

app.get('/', (req, res)=>{
    console.log(' está rodando')
    res.render('index')
})

app.post('/form', (req, res)=>{
    var {email, nome, pontos} = req.body


    
})






app.listen(3333, (req, res)=>{
    console.log('Servidor rodando!')
})