module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "admin",
    DB: "firstdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };