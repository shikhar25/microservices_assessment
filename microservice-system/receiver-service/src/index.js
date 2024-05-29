require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const redis = require('redis');
const moment = require('moment');
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
});

app.post('/receiver', async (req, res) => {
  const { user, class: userClass, age, email } = req.body;

  if (!user || !userClass || !age || !email) {
    logger.error('Invalid data received', { data: req.body });
    return res.status(400).send('Invalid data');
  }

  const id = uuidv4();
  const insertedAt = moment().toISOString();

  try {
    await pool.query(
      'INSERT INTO receiver_table (id, user, class, age, email, inserted_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, user, userClass, age, email, insertedAt]
    );

    const event = { id, user, class: userClass, age, email, insertedAt };
    publisher.publish('data-received', JSON.stringify(event));

    logger.info('Data received and published', { event });
    res.status(201).send('Data received and published');
  } catch (err) {
    logger.error('Error inserting data into receiver_table', { error: err });
    res.status(500).send('Server error');
  }
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Postgres setup
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB_RECEIVER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// Redis setup
const publisher = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

app.post('/receiver', async (req, res) => {
  const { user, class: userClass, age, email } = req.body;

  if (!user || !userClass || !age || !email) {
    return res.status(400).send('Invalid data');
  }

  const id = uuidv4();
  const insertedAt = moment().toISOString();

  try {
    await pool.query(
      'INSERT INTO receiver_table (id, user, class, age, email, inserted_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, user, userClass, age, email, insertedAt]
    );

    const event = { id, user, class: userClass, age, email, insertedAt };
    publisher.publish('data-received', JSON.stringify(event));

    res.status(201).send('Data received and published');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Receiver service listening at http://localhost:${port}`);
});
