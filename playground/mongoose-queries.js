const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');


var id = '5c59af8aab0d3521045a64cc';

if(!ObjectID.isValid(id))
{
  return console.log('ID not found');
}
//
// todo.find(
//   {
//     _id:id
//   }).then( (todos) =>
//   {
//     console.log('Todos',todos);
//   });
//
//  todo.findOne(
//    {
//     _id:id
//   }).then( (todo) =>
//    {
//      console.log('Todo',todo);
//    });

 //   todo.findById(id).then( (todo) =>
 // {
 //   if(!todo)
 //   {
 //     return console.log('Id not found');
 //   }
 //   console.log('Todo By Id',todo);
 // }).catch((e) => console.log(e));

 user.findById(id).then( (user) =>
{
 if(!user)
 {
   return console.log('userid not found');
 }
 console.log('User By Id',user);
}).catch((e) => console.log(e));
