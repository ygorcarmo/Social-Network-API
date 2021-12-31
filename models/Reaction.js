const { Schema, Types } = require('mongoose');

const reactionSchema = Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody:{
            type: String,
            required:true,
            max:280
        },
        username:{
            type: String,
            required:true,
            ref:'User',
        },
        createdAt:{
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON:{
            getters:true
        },
        id:false,
        _id:false
    }
);

module.exports = reactionSchema;
