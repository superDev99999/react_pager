const Sequelize = require('sequelize');
const PG_URI =
  process.env.DATABASE_URL || 'postgres://localhost:5432/acme-pager';
const db = new Sequelize(PG_URI, { logging: false });

module.exports = { db };
