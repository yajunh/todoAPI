/* global $ */
$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addToDos)
    
    $("#todoInput").keypress(function(event) {
        if(event.which === 13) {
            createdTodo();
        }
    });
    
    $(".list").on("click", "li", function() {
        updateTodo($(this));
    });
    
    $(".list").on("click", "span", function(e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    });
});

//show all todos on the page
function addToDos(todos) {
    //show todos on the page
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

//add a new todo to the page
function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if(todo.completed) {
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

function createdTodo() {
    //send request to create new todo
    var taskInput = $("#todoInput").val();
    $.post("/api/todos", {name: taskInput})
    .then(function(newTodo) {
        $("#todoInput").val("");
        addTodo(newTodo);
    })
    .catch(function(err) {
        console.log(err);
    })
}

//change todo task's status
function updateTodo(todo) {
    var updateURL = "/api/todos/" + todo.data("id");
    var isDone = !todo.data("completed");
    var updateData = {completed: isDone}
    todo.toggleClass("done");
    $.ajax({
        method: "PUT",
        url: updateURL,
        data: updateData
    })
    .then(function(updateTodo) {
        todo.data("completed", isDone);
    })
}

//delete a todo
function removeTodo(todo) {
    var clickedId = todo.data("id");
    var deleteURL = "/api/todos/" + clickedId;
    $.ajax({
        method: "DELETE",
        url: deleteURL
    })
    .then(function(data) {
        todo.remove();
    })
    .catch(function(err) {
        console.log(err);
    });
}