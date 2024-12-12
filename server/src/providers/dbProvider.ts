import { Sequelize } from 'sequelize';

const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_DIALECT: any = process.env.DB_DIALECT; 

// Création d'une instance Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: true,
});

// Tester la connexion à la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion réussie à la base de données');
  })
  .catch((error) => {
    console.error('Impossible de se connecter à la base de données :', error);
  });

export default sequelize;