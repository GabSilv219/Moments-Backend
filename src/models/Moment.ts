import { DataTypes } from 'sequelize';
import db from '../db/connection';
import Comment from './Comment';

const Moment = db.define('moments', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.NOW,
    },
}, {
    createdAt: true,
    updatedAt: true
});

Moment.hasMany(Comment, {foreignKey: 'momentId', as: 'comments'});

export default Moment;