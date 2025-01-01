import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeInstance';
import User_team_Space from './User_team_Space';
import User from './User';


class Team_Space extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
 
}


Team_Space.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  sequelize,
  tableName: 'team_space',
  timestamps: true,
});




export default Team_Space;