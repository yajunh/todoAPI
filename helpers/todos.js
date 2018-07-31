var db = require("../models");

//Get all the todos
exports.getTodos = function(req, res) {
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    });
};

//Create a new todo
exports.createTodo = function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo) {
        res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

//Get a todo
exports.getTodo = function(req, res) {
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
        res.json(foundTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

//Update a todo
exports.updateTodo = function(req, res) {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(updatedTodo) {
        res.json(updatedTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
};

//Delete a todo
exports.deleteTodo = function(req, res) {
    db.Todo.remove({_id: req.params.todoId})
    .then(function() {
        res.send("deleted");
    })
    .catch(function(err) {
        res.send(err);
    });
};

module.exports = exports;