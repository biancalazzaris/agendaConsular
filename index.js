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


// rotas 
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/loginapp', (req, res) => {

  const email = req.body.email
  const senha = req.body.senha

  Register.findOne({
    raw:true, 
    where: {
      email: email,
    }
  }).then((register) => {
    
    console.log (register.id)
    if (senha == register.senha) {
      res.redirect('/home/'+(register.id));
    } else {
      console.log('senha inválida')
    }
  })
  
  // se email & senha for diferente vazio
  // console.log {erro}
  // se email & senha = email & senha no banco então console.log conectado
});


app.get('/home/:id', (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  Register.findOne({
    raw: true, 
    where: {id: id}
  }).then((register) => {
    console.log (register)
    res.render('home', {
      register: register
    });
  });
});

app.get('/cadastro', (req, res) => {
  res.render('formcadastro');
});

app.get('/perfil/:id', (req, res) => {
  const id = req.params.id;
  Register.findOne({
    raw: true, 
    where: {id: id}
  }).then((register) => {
    console.log (registers)
    res.render('profile', {
      registers: registers,
      id
    });
  });
  
});

app.get('/novasolicitacao/', (req, res) => {
    res.render('new', {
    });
});

app.get('/agendamentos/', (req, res) => {
  res.render('view');
});


//recebendo dados do form
app.post('/salvarcadastro', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.tel;
  const cpf = req.body.cpf;
  const senha = req.body.senha;

  // salvar a perguntar no Banco
  Register.create({
    nome: nome,
    email: email,
    telefone: telefone,
    cpf: cpf,
    senha: senha
  }).then(() => {
    res.redirect('/');
  }).catch((error) => {
    console.log(error);
  });
});

app.post('/salvaragenda', (req, res) => {
  const servico = req.body.servico;
  const data = req.body.data;
  const hora = req.body.hora;

// salvar a perguntar no Banco
  Agenda.create({
    servico: servico,
    data: data,
    hora: hora
  }).then(() => {
    res.redirect('/home');
  }).catch((error) => {
    console.log(error);
  }),
  include; [{
    association: Agenda.Register,
    include: [ Register.id ]
  }]

});


// iniciando nosso servidor

app.listen(5000, (erro) => {
  if (erro) {
    console.log('Erro ao executar o projeto, revise seu código');
  } else {
    console.log('Servidor rodando no endereço: http://localhost:5000');
  }
});
