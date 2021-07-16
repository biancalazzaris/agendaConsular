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

//UPDATE Cadastro 
app.post('/editarProfile/:id', (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.tel;
  const cpf = req.body.cpf;
  const rne = req.body.rne;
  const passaporte = req.body.passaporte

  Register.update({
    nome: nome,
    email: email,
    telefone: telefone,
    cpf: cpf,
    rne: rne,
    passaporte: passaporte }, {
      where: {id:id}
  }).then((register) => {
    res.redirect('/home/' +req.params.id);
  }).catch((error) => {
    console.log(error);
  });
});

//página inicial logado ou home
app.get('/home/:id', (req, res) => {
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

// Excluindo a conta, delete registro cadastro
app.get('/remove/:id', (req, res) => {
    const id = req.params.id;
    Register.destroy({ 
      where: { id : id } 
    }).then(() => {
      console.log('Registro apagado com sucesso');
      res.redirect('/');
    }).catch((error) => {
      console.log('Deu erro:', error);
    });
  })
  



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
app.get('/agendamento/:registerID', (req, res) => {
  const registerID = req.params.registerID;
  Agenda.findAll({
    raw: true, 
    where: { registerID :registerID },
  }).then((agendas) => {
    console.log(agendas, registerID);
    res.render('agendamento', {
      agendas: agendas, 
      registerID: registerID
    });
  });
  

});



//salvando o agendamento no banco
app.post('/salvaragenda/:id', (req, res) => {
  const id = req.params.id;
  const servico = req.body.servico;
  const data = req.body.data;
  const hora = req.body.hora;

//criando o agendamento no banco
  Agenda.create({
    registerID: id,
    servico: servico,
    data: data,
    hora: hora
  }).then(() => {
    res.redirect('/agendamento/' + req.params.id );
  }).catch((error) => {
    console.log(error);
  });

});

// exibindo
app.get('/novaagenda/:registerID', (req, res) => {
  const registerID = req.params.registerID;
  Agenda.findOne({
    raw: true, 
    where: { registerID : registerID } 
  }).then((agendas) => {
    res.render('novaagenda', {
      agendas: agendas,
      registerID : registerID
    })
  }); 
});


//deletando agenda excluindo
app.get('/removeagenda/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  Register.destroy({ 
    where: { id : id } 
  }).then(() => {
    console.log('Agendamento excluido com sucesso');
    res.redirect('/home/' + req.params.id, {
      id
    });
  }).catch((error) => {
    console.log('Deu erro:', error);
  });
})



// iniciando nosso servidor
app.listen(5000, (erro) => {
  if (erro) {
    console.log('Erro ao executar o projeto, revise seu código');
  } else {
    console.log('Servidor rodando no endereço: http://localhost:5000');
  }
});
