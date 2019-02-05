//const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectId} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err, db) =>
 {
   if(err)
   {
    return console.log('Unable to connect to MongoDB server');
   }
    console.log('Connected to MongoDB server');

  // db.collection('Todos').find({_id : new ObjectId('5c5990a49536e1945dc02e0e')}).toArray().then((docs) =>
  // {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs , undefined , 2));
  // } , (err) =>
  // {
  //   console.log('Unable to fetch Todos');
  // });

  db.collection('Todos').find().count().then((count) =>
  {
    console.log(`Todos count: ${count}`);
    console.log(JSON.stringify(docs , undefined , 2));
  } , (err) =>
  {
    console.log('Unable to fetch Todos');
  });
    db.close();
 });
