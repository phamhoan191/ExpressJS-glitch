// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var todos = [
  { id: 1, todo: 'Đi chợ' },
  { id: 2, todo: 'Nấu cơm' },
  { id: 3, todo: 'Rửa bát' },
  { id: 4, todo: 'Học code trên CodersX'}
];

// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});

app.get('/todos', (request, response) => {
  var q = request.query.q;
  if (q) {
    var matchedTodos = todos.filter(function(todosItem) {
      return todosItem.todo.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    response.render('index', {
      todos: matchedTodos
    })
  } else {
      response.render('index', {
      todos: todos
    });
  };
});

app.post('/todos/create', function(request, response) {
  todos.push(request.body);
  response.redirect('back');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
