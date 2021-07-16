const Sequelize = require('sequelize');
const connection = require('./database');

const Agenda = connection.define('agenda', {
    registerID: {
      type: Sequelize.STRING
    },
    data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
    hora: {
    type: Sequelize.TIME,
    allowNull: false,
  },
    servico: {
    type: Sequelize.STRING,
    allowNull: false,
  },   
});

Agenda.sync({force: false}).then(() => {});
module.exports = Agenda;