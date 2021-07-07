const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

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



app.listen(5000, (erro) => {
  if(erro) {
    console.log('Erro ao executar o projeto, revise seu código');
  } else {
    console.log('Servidor rodando no endereço: http://localhost:5000');
  }
});
