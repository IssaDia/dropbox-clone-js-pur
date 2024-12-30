import { Sequelize } from 'sequelize';
import ObjectHistory  from './Object_History';
import Block from './Block';
import Object from './Object';
import TeamSpace from './Team_Space';
import User from './User';
import UserTeamSpace from './User_team_Space';
import Device from './Device';
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
      port: 5432,
    })
  : new Sequelize(config.database, config.username, password, {
      host: config.host,
      dialect: dialect,
      port: 5432,
    });

ObjectHistory.hasMany(Block, { foreignKey: 'object_history_id' });
Block.belongsTo(ObjectHistory, { foreignKey: 'object_history_id' });

Object.hasMany(ObjectHistory, { foreignKey: 'object_id' });
ObjectHistory.belongsTo(Object, { foreignKey: 'object_id' });

TeamSpace.hasMany(Object, { foreignKey: 'team_space_id' });
Object.belongsTo(TeamSpace, { foreignKey: 'team_space_id' });

User.belongsToMany(TeamSpace, { through: UserTeamSpace, foreignKey: 'user_id' });
TeamSpace.belongsToMany(User, { through: UserTeamSpace, foreignKey: 'team_space_id' });


User.hasMany(Device, { foreignKey: 'user_id' });
Device.belongsTo(User, { foreignKey: 'user_id' });

export { sequelize };
