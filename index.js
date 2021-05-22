const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/index', (req, res) => {
    res.render('index');
  });

app.get('/cadastro', (req, res) => {
res.render('register');
});
  
app.get('/perfil', (req, res) => {
    res.render('profile');
    });

app.get('/perfil/novasolicitacao', (req, res) => {
    res.render('new');
    });


app.listen(5000, (erro) => {
  if(erro) {
    console.log('Erro ao executar o projeto, revise seu código');
  } else {
    console.log('Servidor rodando no endereço: http://localhost:5000');
  }
});

