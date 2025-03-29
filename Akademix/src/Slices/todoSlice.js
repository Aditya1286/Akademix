import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

export const todoSlice = createSlice({
    name: "Todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload.text
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) {
                state.todos[index].text = action.payload.text
            }
        }
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer