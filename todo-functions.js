// Fetch existing todos from localStorage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}
// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = function (todos, filters) {
    let filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    filteredTodos = filteredTodos.filter(function (todo) {
        return !filters.hideCompleted || !todo.completed
    })
    const incompletedTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''

    
    
    
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompletedTodos))

    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))        
    })
}

// Get the DOM elements for an individual todo
const generateTodoDOM = function (todo) {
    const todoElement = document.createElement('div')
    const checkbox = document.createElement('input')
    const textElement = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    todoElement.appendChild(checkbox)

    // Setup the todo text
    textElement.textContent = `-${todo.text}`
    todoElement.appendChild(textElement)

    // Setup the remove todo button
    // removeButton.textContent = 'x'
    // todoElement.appendChild(removeButton)
    
    return todoElement
}

// Get the DOM elements for list summary

const generateSummaryDOM = function (incompletedTodos) {
    const summary = document.createElement('h3')
    summary.textContent = `You have ${incompletedTodos.length} todos left!`
    return summary
}
