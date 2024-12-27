import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

class User_team_Space extends Model {
  public id!: number;
  public user_id!: number;
  public team_space_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export default User_team_Space;