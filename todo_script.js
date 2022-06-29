// var div = document.createElement('div'); == > $('body').append('<div>');
// document.body.appendChild(div); == -------------^

const $ActivityInput = $('#activity-input');
const $ActivityButton = $('#new-activity-button');
const $DrawString = $('#todo-body-list');

const todos = [];
let all_count = 0;
let complete_count = 0;
let active_count = 0;



function draw_list() {
    let DrawStr = '';
    todos.forEach(element => {
        // DrawStr += `
        // <div>
        //     <li id="${element.todos_id}">
        //         <input class="toggle" type="checkbox">    
        //         <label> ${element.todos_text} </label>
        //         <button class="Destroy"> X </button>
        //     </li>
        // </div>`
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
    

}


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
    }
    // const a = $(this).closest('li').attr('id');
    // console.log(a);
    // if ($(this).is(':checked')) {
    //     const a = $(this).closest('li').attr('id');
    //     console.log(a);
    // }
});

function todo_counter(){
    active_count = todos.filter((status) => {
        return status.todos_status == false;
    }).length;
    complete_count = todos.filter((status) => {
        return status.todos_status == true;
    }).length;
    all_count = todos.length;
    console.log(`all: ${all_count} , complete: ${complete_count} , active: ${active_count}`);

    $('.todo-all-count').html(`All: ${all_count};`);
    $('.todo-completed-count').html(`Completed: ${complete_count};`);
    $('.todo-active-count').html(`Active: ${active_count};`);
}