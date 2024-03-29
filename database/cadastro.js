const Sequelize = require('sequelize');
const connection = require('./database');

const Register = connection.define('register', {
  nome: {
  type: Sequelize.STRING,
  allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING,
  },
  rne: {
    type: Sequelize.STRING,
  },
  passaporte: {
    type: Sequelize.STRING,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 

});

Register.sync({force: false}).then(() => {});
module.exports = Register;