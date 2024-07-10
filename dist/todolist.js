"use strict";
// This event listener waits for the entire DOM to load before running the loadTodos function
document.addEventListener('DOMContentLoaded', (event) => {
    loadTodos();
});
// This event listener waits for a click on the button with ID 'addTodoButton'
document.getElementById('addTodoButton').addEventListener('click', function () {
    // Get the input element with ID 'todoInput' and its trimmed value
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    // If the input is not empty, add the todo item and save it
    if (todoText !== '') {
        addTodoItem(todoText);
        saveTodoItem(todoText);
        todoInput.value = ''; // Clear the input field
    }
});
// Function to add a new todo item to the table
function addTodoItem(todoText) {
    // Get the tbody element of the table with ID 'todoTable'
    const todoTable = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
    // Insert a new row at the end of the table
    const newRow = todoTable.insertRow();
    // Insert two new cells in the row for the item and the action
    const itemCell = newRow.insertCell(0);
    const actionCell = newRow.insertCell(1);
    // Set the text content of the item cell to the todo text
    itemCell.textContent = todoText;
    // Add a click event listener to the item cell to cross it out and remove it after 1 second
    itemCell.addEventListener('click', function () {
        itemCell.classList.add('crossed-out');
        setTimeout(() => {
            removeTodoItem(newRow.rowIndex - 1);
        }, 1000);
    });
    // Create a delete button, set its text content and class
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    // Add a click event listener to the delete button to remove the todo item immediately
    deleteButton.addEventListener('click', function () {
        removeTodoItem(newRow.rowIndex - 1);
    });
    // Append the delete button to the action cell
    actionCell.appendChild(deleteButton);
}
// Function to save a new todo item to localStorage
function saveTodoItem(todoText) {
    // Retrieve the current list of todos from localStorage or initialize an empty array
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    // Add the new todo text to the array
    todos.push(todoText);
    // Save the updated array back to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}
// Function to load and display all todo items from localStorage
function loadTodos() {
    // Retrieve the list of todos from localStorage or initialize an empty array
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    // Add each todo item to the table
    todos.forEach(todoText => addTodoItem(todoText));
}
// Function to remove a todo item from the table and localStorage
function removeTodoItem(index) {
    // Get the tbody element of the table with ID 'todoTable'
    const todoTable = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
    // Delete the row at the specified index
    todoTable.deleteRow(index);
    // Retrieve the current list of todos from localStorage or initialize an empty array
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    // Remove the todo item at the specified index from the array
    todos.splice(index, 1);
    // Save the updated array back to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}
