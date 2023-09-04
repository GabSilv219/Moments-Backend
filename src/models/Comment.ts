import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Comment = db.define('comments', {
    username: {
        type: DataTypes.STRING
    },
    text: {
        type: DataTypes.STRING
    },
}, {
    createdAt: true,
    updatedAt: true
});

export default Comment;