/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const bodyParser = require('body-parser');
  // const port = 8000 ; 
  const app = express();
  let todo = [
    // {
    //   'id':1024,
    //   "title":"Buy groceries" , 
    //   "completed" : false,
    //   "description": "I should buy groceries from the shop", 
    // },
    // {
    //   "id":1021,
    //   "title":"Buy Computer" , 
    //   "completed" : true,
    //   "description": "You should buy a computer, for your job", 
    // }
  ]
  function generateUniqueRandomNumber() {
    const timestamp = new Date().getTime();
    const random = Math.random();
    const uniqueRandomNumber = Math.floor(random * timestamp);
    return uniqueRandomNumber;
  }
  
  
  app.use(bodyParser.json());

  app.get('/todos' , (req, res)=>{
    res.status(200).send(todo) ; 
  });

  app.get('/todos/:id' , (req,res)=>{
    const id = req.params.id 
   // console.log(typeof(+id)) ; 
    let item = null ; 
    for(const x of todo){
      // console.log(+x["id"]) ; 
      if(+id==+x.id){
        item = x; 
        break; 
      }
    }
    if(item==null){
      return res.status(404).send("404 not found") ; 
    }
    res.status(200).json(item);
  });

  app.post('/todos',async (req,res)=>{
    // console.log(req.body) ; 
    let td = req.body ;
    
    const randomNumber = await generateUniqueRandomNumber();
    // console.log(randomNumber);
    td['id'] = randomNumber 
    todo.push(td) ; 
    res.status(201).send({"id":randomNumber})  ;
  })

  app.put('/todos/:id',(req, res)=>{
    const id = req.params.id 
    const obj = req.body 
    let n = null 
    for(const i in todo){
      if(+id ==todo[i].id){
        n = i ; 
        break ; 
      }
    }
    if(n==null){
      return res.status(404).send("404 Not Found") ; 
    }
    for (const key in obj){
      todo[n][key] = obj[key] ; 
    }
    res.status(200).send(); 
  })

  app.delete('/todos/:id',(req,res)=>{
    const id = req.params.id 
    let found = false ; 
    for (const i in todo){
      if(+id == todo[i]["id"]){
        todo.splice(i , 1) ; 
        found = true ; 
        break ; 
      }
    }
    if(!found){
      return res.status(404).send("404 Not Found")
    }
    res.status(200).send() ; 
  })


  app.all('*', (req, res) => {
    res.status(404).send('Route not found');
  });

  module.exports = app;

  // app.listen(port)  ; 