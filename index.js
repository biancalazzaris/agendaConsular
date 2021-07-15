const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Register = require('./database/cadastro');
const Agenda = require('./database/agenda');


app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//conexão com o banco.
const connection = require('./database/database');

connection
  .authenticate()
  .then(() => {
    console.log('MySQL: Conectado');
  }).catch((error) => {
    console.log(error);
  });


// ROTAS

//primeira página ou deslogado
app.get('/', (req, res) => {
  res.render('index');
});

//página para se logar
app.get('/login', (req, res) => {
  res.render('login');
});

//conferindo se existe no banco
app.post('/loginapp', (req, res) => {

  const email = req.body.email
  const senha = req.body.senha

  Register.findOne({
    raw:true, 
    where: {
      email: email,
    }
  }).then((register) => {
    if (senha == register.senha) {
      res.redirect('/home/'+(register.id));
    } else {
      console.log('senha inválida')
    }
  })
});

// se não possui login, cria cadastro
app.get('/cadastro', (req, res) => {
  res.render('formcadastro');
});

//recebendo dados do cadastro
app.post('/salvarcadastro', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.tel;
  const cpf = req.body.cpf;
  const rne = req.body.rne;
  const passaporte = req.body.passaporte
  const senha = req.body.senha;

//salvando o cadastro no banco
  Register.create({
    nome: nome,
    email: email,
    telefone: telefone,
    cpf: cpf,
    rne: rne,
    passaporte: passaporte,
    senha: senha
  }).then(() => {
    res.redirect('/');
  }).catch((error) => {
    console.log(error);
  });
});



//página inicial logado ou home
app.get('/home/:id', (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  Register.findOne({
    raw: true, 
    where: {id: id}
  }).then((register) => {
    res.render('home', {
      register: register
    });
  });
});


//acessando o cadastro logado ou exibe cadastro
app.get('/perfil/:id', (req, res) => {
  const id = req.params.id;
  Register.findOne({
    raw: true, 
    where: {id: id}  
}).then((register) => {
      res.render('profile', {
        register: register,
        id
      })
    });
    
});


//agendar serviço, horário
app.get('/novasolicitacao/:id', (req, res) => {
  const id = req.params.id;
  Register.findOne({
    raw: true, 
    where: {id: id}
  }).then((register) => {
    res.render('new', {
      register: register,
      id
    })
  });  
});


//salvando o agendamento no banco
app.post('/salvaragenda', (req, res) => {
  const servico = req.body.servico;
  const data = req.body.data;
  const hora = req.body.hora;

//criando o agendamento no banco
  Agenda.create({
    servico: servico,
    data: data,
    hora: hora
  }).then(() => {
    res.redirect('/home');
  }).catch((error) => {
    console.log(error);
  })
});



// iniciando nosso servidor
app.listen(5000, (erro) => {
  if (erro) {
    console.log('Erro ao executar o projeto, revise seu código');
  } else {
    console.log('Servidor rodando no endereço: http://localhost:5000');
  }
});
