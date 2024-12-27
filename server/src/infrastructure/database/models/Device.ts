import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';


class Device extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Device;