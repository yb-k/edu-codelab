const _ = require('lodash');

const users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];


const findObj = _.find(users, { 'age': 1, 'active': true });

console.log(JSON.stringify(findObj, null, '\t'));