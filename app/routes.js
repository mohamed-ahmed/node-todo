var Todo = require('./models/todo');
var needle = require('needle');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	app.get('/api/repos', function(req, res) {
		/*send hardcoded git repos */

		needle.get("https://api.github.com/users/mohamed-ahmed/repos", function(error,outgoingGetResponse){
			console.log(outgoingGetResponse.body);
			res.send(outgoingGetResponse.body);
		});

	});

	app.get('/api/branches/:repo_name', function(req, res) {
		/*send hardcoded git repos */

		var repo_name = req.params.repo_name;
		console.log("https://api.github.com/repos/mohamed-ahmed/" + repo_name + "/branches");
		needle.get("https://api.github.com/repos/mohamed-ahmed/" + repo_name + "/branches", function(error,outgoingGetResponse){
			//console.log(outgoingGetResponse.body);
			res.send(outgoingGetResponse.body);
		});

	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};