const { Schema, model, Types } = require('mongoose');
// const reactionSchema = require('./Reaction');

const reactionSchema = new Schema
(
  {
    reactionId: 
    {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: 
    {
        type: String,
        required: true,
        max: 280,
    },
    username: 
    {
      type: String,
      required: true,
    },
    createdAt: 
    {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: 
    {
      getters: true
    }
  }
);

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
        reactions:[reactionSchema]
    },
    {
        toJSON:{
            virtuals:true,
            getters:true
        },
        id:false
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
