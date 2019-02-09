var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/todo');
var {user} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos' , (req,res) =>
{
  var Todo = new todo(
    {
      text:req.body.text
    }
  );
  Todo.save().then( (doc) =>
 {
  res.send(doc);
 } , (err) =>
  {
    res.status(400).send(err);
  });
    //console.log(req.body);
});

app.get('/todos' , (req,res) =>
  {
    todo.find().then( (docs) =>
     {
       res.send(docs);
     } , (err) =>
       {
         res.status(400).send(err);
       });
  });

  app.get('/todos/:id' , (req,res) =>
  {
    var id = req.params.id;
    if(!ObjectID.isValid(id))
    {
      return res.status(404).send();
    }
    todo.findById(id).then( (todo) =>
   {
    if(!todo)
    {
        return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(400).send());
  });

app.listen(3000, () =>
{
  console.log('started on port 3000');
})

module.exports =
 {
   app
 };
