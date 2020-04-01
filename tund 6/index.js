class Todo {
    constructor(title, description, date) {
        this.title = title;
        this.description = description;
        this.date = date;
    }
}

let todos = [];

$('#load').click(loadFromFile);
$('#save').click(saveToFile);
$('#add').click(addEntry);

function loadFromFile() {
    $('#todos').html("");

    $.get('database.txt', function (data) {
        let content = JSON.parse(data).content;
        console.log(content);

        content.forEach(function (todo, todoIndex) {
            $('#todos').append("<ul><li>" + todo.title + "</li><li>" + todo.description + "</li><li>" + todo.date + "</li></ul>");
        });
    })
}

function addEntry() {
    const titleValue = $('#title').val();
    const descriptionValue = $('#description').val();
    const dateValue = $('#date').val();
    todos.push(new Todo(titleValue, descriptionValue, dateValue));
    console.log(todos);
}

function saveToFile() {
    $.post('server.php', {
        save: todos
    }).done(function () {
        console.log('Success');
    }).fail(function () {
        alert('FAIL');
    }).always(function () {
        console.log('Tegime midagi AJAXiga');
    });
}