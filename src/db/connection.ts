import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('momentsApi', 'gabsilv', 'unicorn', {
    host: '127.0.0.1',
    dialect: 'mysql'
  });

  export default sequelize;