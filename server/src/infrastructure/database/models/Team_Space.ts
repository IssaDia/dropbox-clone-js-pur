import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';


class Team_Space extends Model {
  public id!: number;
  public team_id!: number;
  public space_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


export default Team_Space;