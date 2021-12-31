const usernames = [
    'John',
    'Ben',
    'Yun',
    'Luiz',
    'Dom'
];

const emails = [
    'test@email.com',
    'ben@mail.com',
    'yun@testing.com',
    'luiz@theforth.com',
    'dom@dum.com'
];

const thoughts = [
  'bananas are good',
  'eat your vegetables',
  'Running is a good habit',
  'I do not know what to write at this stage',
  'the last one, will it work ?'
];

const oddreactions = [
    'well done',
    'keep it up with the good work',
    'nice one',
    'do not worry son',
    'happy new year'
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(usernames)}`;

module.exports = { usernames, emails, thoughts, oddreactions,getRandomName, getRandomArrItem };