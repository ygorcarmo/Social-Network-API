const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username:{
           type:String,
           unique:true,
           required:true,
           trim:true
        },
        email: {
           type:String,
           required:[true, "Email required"],
           unique:true, 
           validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
        },
        thoughts:[
            {
                type: Schema.Types.ObjectId,
                ref:'Thought'
            }
        ],
        friends:[{
            type: Schema.Types.ObjectId,
            ref:'User'
        }]
    },
    {
        toJSON:{
            getters:true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User; 