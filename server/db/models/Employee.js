const Sequelize = require('sequelize');
const { db } = require('./../db.js');

const { STRING } = Sequelize;

const Employee = db.define('employee', {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = { Employee };
