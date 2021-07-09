const Sequelize = require('sequelize');
const connection = new Sequelize('agenda', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: true
  }
});

module.exports = connection;