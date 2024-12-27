import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

class Object_History extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


export default Object_History;