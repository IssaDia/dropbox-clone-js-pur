import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelizeInstance';
import User from './User';
import Team_Space from './Team_Space';

class User_team_Space extends Model {
  public id!: number;
  public user_id!: number;
  public team_space_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User_team_Space.init({
  id: {
    type: DataTypes.UUID,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  team_space_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'user_team_space',
  timestamps: true,
});




export default User_team_Space;