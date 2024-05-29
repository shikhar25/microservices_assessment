require('dotenv').config();
const { Pool } = require('pg');
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

subscriber.on('message', async (channel, message) => {
    if (channel === 'data-received') {
      const data = JSON.parse(message);
      const { id, user, class: userClass, age, email, insertedAt } = data;
      const modifiedAt = moment().toISOString();
  
      try {
        await pool.query(
          'INSERT INTO listener_table (id, user, class, age, email, inserted_at, modified_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [id, user, userClass, age, email, insertedAt, modifiedAt]
        );
        logger.info('Data copied to listener table', { data });
      } catch (err) {
        logger.error('Error inserting data into listener_table', { error: err });
      }
    }
  });
  

// Postgres setup
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB_LISTENER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// Redis setup
const subscriber = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

subscriber.on('message', async (channel, message) => {
  if (channel === 'data-received') {
    const data = JSON.parse(message);
    const { id, user, class: userClass, age, email, insertedAt } = data;
    const modifiedAt = moment().toISOString();

    try {
      await pool.query(
        'INSERT INTO listener_table (id, user, class, age, email, inserted_at, modified_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [id, user, userClass, age, email, insertedAt, modifiedAt]
      );
      console.log('Data copied to listener table');
    } catch (err) {
      console.error(err);
    }
  }
});

subscriber.subscribe('data-received');
