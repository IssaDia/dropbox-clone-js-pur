import { Sequelize } from 'sequelize';
import { Config } from '../../../interfaces/ConfigInterface'; // Interface définie pour le typage
import configJson from '../../../config/config.json'; // Configuration des environnements

// Typage strict des environnements
type Environment = 'development' | 'test' | 'production';

// Détecte l'environnement ou utilise 'development' par défaut
const env = (process.env.NODE_ENV || 'development') as Environment;

// Sélectionne la configuration appropriée selon l'environnement
const config: Config = configJson[env];

let sequelize: Sequelize;

// Initialisation de Sequelize avec ou sans variable d'environnement
if (config.use_env_variable) {
  if (!process.env[config.use_env_variable]) {
    throw new Error(`La variable d'environnement ${config.use_env_variable} est manquante.`);
  }
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

export { sequelize };
