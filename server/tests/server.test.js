const  expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {todo} = require('./../models/todo');

var todosVar = [
  {
  _id:new ObjectID(),
  text: 'First test todo'
  },
  {
  _id:new ObjectID(),
  text: 'Second test todo'
  }];

beforeEach( (done) =>
{
  todo.remove({}).then( () =>
  {
    return todo.insertMany(todosVar);
  }).then( () => done());
});

describe('POST /todos' , () =>
 {
   it('should create a new todo', (done) =>
      {
        var text = 'Test todo text';
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) =>
          {
            expect(res.body.text).toBe(text);
          })
        .end( (err,res) =>
          {
            if(err)
             {
               return done(err);
             }

          todo.find({text}).then((todos) =>
            {
            //  expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();
            }).catch((e) => done(e));
          });
      });

      it('Should not create todo with invalid body data' , (done) =>
       {
         request(app)
         .post('/todos')
         .send({ })
         .expect(400)
         .end( (err,res) =>
           {
             if(err)
              {
                return done(err);
              }

            todo.find().then((todos) =>
             {
               expect(todos.length).toBe(2);
               done();
             }).catch((e) => done(e));
           });
       })
 });

 describe('GET /todos', () =>
  {
    it('should get all todos', (done) =>
     {
       request(app)
       .get('/todos')
       .expect(200)
       .expect((res) =>
         {
           expect(res.body.length).toBe(2);
         })
        .end(done);
     });
  });

   describe('GET /todos/:id', () =>
    {
      it('it should return todo doc', (done) =>
       {
         request(app)
         .get(`/todos/${todosVar[0]._id.toHexString()}`)
         .expect(200)
         .expect((res) =>
          {
            expect(res.body.todo.text).toBe(todosVar[0].text);
          })
          .end(done);
       });


      it('should return 404 if todo not found', (done) =>
        {
          request(app)
          .get(`/todos/5c5c74a5e32b6a62203c6918`)
          .expect(404)
          .end(done);
        });

      it('should return 404 for non-object ids', (done) =>
        {
          request(app)
          .get(`/todos/123`)
          .expect(404)
          .end(done);
        });
    });


    describe('DELETE /todos/:id' , () =>
    {
      it('it should remove a todo',(done) =>
      {
        var hexId = todosVar[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect( (res) =>
         {
           expect(res.body.todo._id).toBe(hexId);
         })
         .end( (err,res) =>
         {
           if(err)
           {
             return done(err);
           }
          todo.findById(hexId).then((todo) =>
          {
            expect(todo).toBeFalsy();
            done();
          }).catch((e) => done(e));
        });
      });

      it('should return 404 if todo not found', (done) =>
        {
          request(app)
          .get(`/todos/5c5c74a5e32b6a62203c6918`)
          .expect(404)
          .end(done);
        });

      it('should return 404 for non-object ids', (done) =>
        {
          request(app)
          .get(`/todos/123`)
          .expect(404)
          .end(done);
        });

    });
