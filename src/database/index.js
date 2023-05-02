import { Sequelize } from 'sequelize';
import initModels from '../models/init-models';
import databaseConfig from '../config/database';

const connection = new Sequelize(databaseConfig);
const models = initModels(connection);

export default models;
