const Sequelize = require('sequelize');
const sequelize = new Sequelize('tipakorn', 'sertis', 'sertis', {
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql'

});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import model
db.model = require('./model.js')(sequelize, Sequelize);

module.exports = db;