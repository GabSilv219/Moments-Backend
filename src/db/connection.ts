import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('railway', 'postgres', '735OZoGm2G9Wv40ROYSy', {
    host: 'containers-us-west-150.railway.app',
    dialect: 'postgres'
  });

  export default sequelize;