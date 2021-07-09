const { response } = require('express');
const express = require('express');
const app = express();
const Register = require('./database/cadastro');

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
  console.log('jasmasasa');
  res.render('formcadastro');
});

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  Register.findOne({
    raw: true, 
    where: {id: id}
  }).then((perfil) => {
    console.log (perfil)
    res.render('profile', {
      registers: registers
    });
  });
})

app.get('/perfil/:id', (req, res) => {
  let id = req.params.id;
  Register.findOne({
    raw: true, 
    where: {id: id}
  }).then((registers) => {
    console.log (registers)
    res.render('profile', {
      registers: registers,
      id
    });
  });
  
});

app.get('novasolicitacao/:id', (req, res) => {
  let id  = req.params;
  Register.findAll({
    raw: true,
    where: { id: id }
  }).then((registers) => {
    res.render('new', {
      registers: registers
    });
  });
});

app.get('/agendamentos/', (req, res) => {
  res.render('view');
});

//recebendo dados do form CADASTRO
// app.post('/salvarcadastro', (req, res) => {
//   let pessoa = {
//      nome : req.body.nome,
//      email : req.body.email,
//      telefone : req.body.tel,
//      cpf : req.body.cpf,
//      senha : req.body.senha,
//   };
//   console.log(pessoa)
//   res.send(`Formulário enviado para o servidor', ${pessoa}`);
// });



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




// iniciando nosso servidor

app.listen(5000, (erro) => {
  if (erro) {
    console.log('Erro ao executar o projeto, revise seu código');
  } else {
    console.log('Servidor rodando no endereço: http://localhost:5000');
  }
});
