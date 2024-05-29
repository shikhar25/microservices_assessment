CREATE TABLE listener_table (
  id UUID PRIMARY KEY,
  user VARCHAR(100),
  class VARCHAR(100),
  age INT,
  email VARCHAR(100),
  inserted_at TIMESTAMP,
  modified_at TIMESTAMP
);
