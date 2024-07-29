const { Pool } = require('pg');
const dotenv = require("dotenv");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'wellness_retreat',
  password: 'vivek',
  port: 5432,
  "dialect": "postgres",
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
});

module.exports = pool;