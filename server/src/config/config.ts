export default  config = {
  development: {
    use_env_variable: "DEV_DATABASE_URL",
    username: process.env.DB_USER || "jazzy",
    password: process.env.DB_PASSWORD || "dropbox_clone",
    database: process.env.DB_NAME || "dropbox",
    host: process.env.DB_HOST || "localhost:8080",
    dialect: process.env.DB_DIALECT || "postgres"
  },
  test: {
    use_env_variable: "TEST_DATABASE_URL",
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "PROD_DATABASE_URL",
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};