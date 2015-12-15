// Initial todos. For now, hard code this, should get this state from persistent storage later.
var todos = [
  {
    id: 1,
    text: 'learn javascript',
    complete: false
  },
  {
    id: 2,
    text: 'eat pizza',
    complete: true
  }
];

// Increment global ID so they are unique.
var id = todos.length;
function incrementId() {
  id++;
  return id;
}

function renderTodos() {

  $('.todos').html('');

  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
    var checked = todo.complete ? 'checked' : ''
    $('.todos').append("<li class='todo " + checked + "' data-id=" + todo.id + "><label><input class='toggle-todo' type='checkbox' " + checked + "/> " + todo.text + "</label><button>delete</button></li>");
  }

//Have Stats
  var total = todos.length;
  $('.total').text( total);

  var complete = $('li.checked').length;
  $('.complete').text( complete);

  var incomplete = total - complete;
  $('.incomplete').text( incomplete);
}

function findById(id) {
  var todo;

  for(var i = 0; i < todos.length; i++) {
    if (todos[i].id === Number(id)) {
      todo = todos[i];
    }
  }
  return todo;
}

// function findTotal() {

// }

$(document).ready(function() {
  // Initialize with any existing todos.
  renderTodos();

  // Bind to input update to mark todo as complete.
  $(document).on('change', '.toggle-todo', function(event) {
    var id = $(event.target).parent().parent().data('id');
    var todo = findById(id);
    // $('.stats').append(total);

    todo.complete = event.target.checked;

    renderTodos();
  });

  // Bind to new todo form submission to create new todos.
  $(document).on('submit', '.new-todo', function(event) {
    event.preventDefault();

    var text = $('.todo-text').val();

    if (text.length === 0) {
      $('.alert').text('Todo cannot be empty.')
      return;
    }

    var newTodo = {
      id: incrementId(),
      text: text,
      completed: false
    };

    todos.push(newTodo);

    renderTodos();

    $('.todo-text').val('');
    $('.alert').text('');

  });

    //Have delete button delete single todo.
    $(document).on('click', 'li button', function(event) {
      var id = $(event.target).parent().data('id');
      var todo = findById(id);
      var indexOfTodo = todos.indexOf(todo);
      console.log(indexOfTodo);

      if (indexOfTodo > -1) {
        todos.splice(indexOfTodo, 1);
      }

    $(document).on("click", "li button", function(e) {
      e.preventDefault();
      $(this).parent().remove();
    });

  });

    $(document).on('click', '.deleteComplete', function(event) {
      event.preventDefault();
      var complete = $('li.checked');
      complete.remove();

      

      todos.splice(complete, 1);

  });

});
