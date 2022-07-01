// var div = document.createElement('div'); == > $('body').append('<div>');
// document.body.appendChild(div); == -------------^

const $ActivityInput = $('#activity-input');
const $ActivityButton = $('#new-activity-button');
const $DrawString = $('#todo-body-list');
const $TodoAll = $('.todo-all-button');
const $TodoActive = $('.todo-active-button');
const $TodoCompleted = $('.todo-completed-button');
let draw_status = 'All';
const todos = [
    {
        todos_id: 12321321312323,
        todos_text: 'asdadas',
        todos_status: false
    },
    {
        todos_id: 124214124125125,
        todos_text: 'asdasdafwef',
        todos_status: true
    }

];
let all_count = 0;
let complete_count = 0;
let active_count = 0;



function draw_list() {
    let DrawStr = '';
    newArray(draw_status).forEach(element => {
        if (element.todos_status == true) {
            DrawStr += `
            <div>
                <li id="${element.todos_id}" style= "text-decoration: line-through;">
                    <input class="toggle" type="checkbox" checked>    
                    <label> ${element.todos_text} </label>
                    <button class="Destroy"> X </button>
                </li>
            </div>`
            
        }
        else {
            DrawStr += `
            <div>
                <li id="${element.todos_id}" style= "text-decoration: none;">
                    <input class="toggle" type="checkbox">    
                    <label> ${element.todos_text} </label>
                    <button class="Destroy"> X </button>
                </li>
            </div>`
        }
    })
    $DrawString.html(DrawStr);
    todo_counter();
    newArray();
}

$(document).ready (draw_list());

$ActivityButton.on('click', () => {
    todos.push ({
        todos_id: Date.now(),
        todos_text: `${$('#activity-input').val()}`,
        todos_status: false
    })
    draw_list();
    todo_counter();
    
});


$DrawString.on('click', '.Destroy', function() {
    const a = $(this).closest('li').attr('id');
    for (let i = 0; i < todos.length; i++){
        if (a == todos[i].todos_id)
        {
            todos.splice(i,1);
        }
    }
    $(this).closest('li').remove();
    draw_list();
    todo_counter();
});

$DrawString.on('click', '.toggle', function() {
    const a = $(this).closest('li').attr('id');

    if($(this).is(":checked")) {
        for (let i = 0; i < todos.length; i++)
        {
            if (a == todos[i].todos_id) {
                todos[i].todos_status = true;
            }
        }
        $(this).closest('li').css('textDecoration', 'line-through');
        todo_counter();
        newArray(draw_status);
        draw_list();
    }
    else {
        for (let i = 0; i < todos.length; i++)
        {
            if (a == todos[i].todos_id) {
                todos[i].todos_status = false;
            }
        }
        $(this).closest('li').css('textDecoration', 'none');
        todo_counter();
        newArray(draw_status);
        draw_list();
    }
    
});

function todo_counter(){
    active_count = todos.filter((status) => {
        return status.todos_status == false;
    }).length;
    complete_count = todos.filter((status) => {
        return status.todos_status == true;
    }).length;
    all_count = todos.length;
    // console.log(`all: ${all_count} , complete: ${complete_count} , active: ${active_count}`);

    $('.todo-all-count').html(`All: ${all_count};`);
    $('.todo-completed-count').html(`Completed: ${complete_count};`);
    $('.todo-active-count').html(`Active: ${active_count};`);
}


function newArray(draw_status){
    let newArr = [];
    switch(draw_status){
        case 'All':
            newArr = todos;
            break;
        case 'Active':
            newArr = todos.filter(item => item.todos_status == false);
            break;
        case 'Completed':
            newArr = todos.filter(item => item.todos_status == true);
            break;
        default:
            return newArr; 
    }
    // console.log(newArr);
    return newArr;
}

$TodoAll.on('click', () => {
    draw_status = 'All';
    newArray(draw_status);
    draw_list();
});

$TodoActive.on('click', () => {
    draw_status = 'Active';
    newArray(draw_status);
    draw_list();
});

$TodoCompleted.on('click', () => {
    draw_status = 'Completed';
    newArray(draw_status);
    draw_list();
});

