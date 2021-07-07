const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));


// rotas 
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req,res) => {
  res.render('login');

  // const email = req.params.email
  // const senha = req.params.senha

  // res.redirect('index');
  // se email & senha for diferente vazio
  // console.log {erro}
  // se email & senha = email & senha no banco então console.log conectado
});

// app.get('/index', (req, res) => {
//     res.render('index');
//   });
app.get('/home', (req, res) => {
  res.render('home');
  });

app.get('/cadastro', (req, res) => {
res.render('register');
});
  
app.get('/perfil', (req, res) => {
    res.render('profile');
    });

app.get('/novasolicitacao', (req, res) => {
    res.render('new');
    });

app.get('/agendamentos', (req, res) => {
  res.render('view');
  });

//conexão com o banco.
const connection = require('./database/database');

connection
  .authenticate()
  .then(() => {
    console.log('MySQL: Conexão feita com sucesso!');
  }).catch((error) => {
    console.log(error);
  });




//recebendo dados do form CADASTRO
app.post('/salvarcadastro', (req, res) => {
  let pessoa = {
     nome : req.body.nome,
     email : req.body.email,
     telefone : req.body.tel,
     cpf : req.body.cpf,
     senha : req.body.senha,
  };
  console.log(pessoa)
  res.send(`Formulário enviado para o servidor', ${pessoa}`);
});

const cadastro = require('./database/cadastro');

//recebendo dados do form
app.post('/salvarcadastro', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.tel;
  const cpf = req.body.cpf;
  const senha = req.body.senha;

  // salvar a perguntar no Banco
  register.create({
    nome: nome, 
    email: email,
    telefone:telefone,
    cpf:cpf,
    senha:senha
  }).then(() => {
    res.redirect('/');
  }).catch((error) => {
    console.log(error);
  });
});




// iniciando nosso servidor

app.listen(5000, (erro) => {
  if(erro) {
    console.log('Erro ao executar o projeto, revise seu código');
  } else {
    console.log('Servidor rodando no endereço: http://localhost:5000');
  }
});
