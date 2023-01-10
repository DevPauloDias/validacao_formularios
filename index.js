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
    
    var email = req.flash('email')
    var nome = req.flash('nome')
    var pontos = req.flash('pontos')

    res.render('index', {
        nome: nome,
        email: email,
        pontos: pontos
    })
})

app.post('/form', (req, res)=>{
    var {email, nome, pontos} = req.body
    

    if(email == undefined || email ==""){
        var emailError =  " campo email não pode ser vazio"
    }
    if(nome == undefined || nome == ""){
        var nomeError = "campo nome não pode ser vazio"
    }else if(nome.length < 4){
        nomeError = " campo deve ter no mínimo 4 caracteres"
    }
    if(pontos == undefined || pontos == ""){
        if(pontos <= 10){
             var pontosError = " campo pontos deve ser maior que 10"
        }
    }

    

    if(emailError!= undefined || nomeError != undefined || pontosError != undefined){
        
        req.flash('email', email)
        req.flash('nome', nome)
        req.flash('pontos', pontos)
       res.redirect('/')
    }else{
        res.send('Dados enviados')
    }

    


    
})






app.listen(3333, (req, res)=>{
    console.log('Servidor rodando!')
})