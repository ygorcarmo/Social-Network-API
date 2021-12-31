const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usernames, emails, thoughts, oddreactions, getRandomName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    
    // Drop existing users
    await User.deleteMany({});

    // Drop exiting thoughts
    await Thought.deleteMany({});
    
    const newUsername = usernames;
    const newEmail = emails;
    const newThought = thoughts;

    const goodStuff = [];


    for(let i=0; i < usernames.length; i++){
        const username = newUsername[i];
        const thought = newThought[i];
        const newreactionBody = oddreactions[i];
        const reactions = [{reactionBody: newreactionBody, username:getRandomName()}];
        goodStuff.push({
            thought,
            username,
            reactions
        });
    }

    await Thought.collection.insertMany(goodStuff);

    for(let i = 0; i < usernames.length; i++){
        const id = goodStuff[i]._id;
        await User.collection.insertOne({
            username: newUsername[i],
            email: newEmail[i],
            thoughts: [id]}
        );
    };

    console.table(goodStuff);
    console.info('Seeding complete! 🌱');
    process.exit(0);

});
