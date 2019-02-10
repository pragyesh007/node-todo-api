const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

todo.remove({}).then( (res) =>
 {
   console.log(res);
 });

todo.findOneAndRemove({_id:'5c5ee473e257547610175bce'}).then( (todo) =>
 {

 });

 todo.findByIdAndRemove('5c5ee473e257547610175bce').then( (todo) =>
 {
   console.log(todo);
 });
