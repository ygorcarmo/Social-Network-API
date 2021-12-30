const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type:String,
            required:true,
            min:1,
            max:280
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        username:{
            type:String,
            required:true,
            ref:'User',
        },
        reactions:[Reaction]
    },
    {
        toJSON:{
            virtuals:true,
            getters:true
        }
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
