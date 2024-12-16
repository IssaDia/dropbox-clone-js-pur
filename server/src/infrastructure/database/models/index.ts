import { Sequelize } from 'sequelize';
import { Config } from '../../../interfaces/ConfigInterface';
import { configJson }  from '../../../config/config';

type Environment = 'development' | 'test' | 'production';

const env: Environment = (process.env.NODE_ENV as Environment) || 'development';
const config: Config = configJson[env] as Config;

// Transformation de null en undefined pour Sequelize
const password = config.password === null ? undefined : config.password;
const dialect = config.dialect as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';


// Initialisation de Sequelize
const sequelize = config.use_env_variable && process.env[config.use_env_variable]
  ? new Sequelize(process.env[config.use_env_variable]!, {
      database: config.database,
      username: config.username,
      password: password,
      host: config.host,
      dialect: dialect,
      port: 5433,
    })
  : new Sequelize(config.database, config.username, password, {
      host: config.host,
      dialect: dialect,
      port: 5433,
    });

export { sequelize };
