const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
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

    //continuar
app.get('/perfil/solicitacoes', (req, res) => {
    res.send('Realizar Cadastro');
    });

app.get('/perfil/agenda', (req, res) => {
    res.send('Realizar Cadastro');
    });

app.get('/admin', (req, res) => {
    res.send('Realizar Cadastro');
});

app.get('/admin/solicitacoes', (req, res) => {
    res.send('Realizar Cadastro');
});

app.get('/admin/agenda', (req, res) => {
    res.send('Realizar Cadastro');
});

app.get('/admin', (req, res) => {
    res.send('Realizar Cadastro');
});

app.listen(5000, (erro) => {
  if(erro) {
    console.log('Erro ao executar o projeto, revise seu código');
  } else {
    console.log('Servidor rodando no endereço: http://localhost:5000');
  }
});

