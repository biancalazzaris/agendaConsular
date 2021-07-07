const Sequelize = require('sequelize');
const connection = require('./database');

const cadastro = connection.define('register', {
    nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  senha: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

cadastro.sync({force: false}).then(() => {});
module.exports = cadastro;