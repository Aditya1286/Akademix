import { createSlice , nanoid } from "@reduxjs/toolkit";

const initialState = {
    date: {
        id: 1,
        text: "Hello World"
    } 
}

export const todoSlice = createSlice({
    name: "Todo",
    initialState,
    reducers : {
        addTodo: (state , action) => {
            const todo = {
                date: {
                    id: nanoid(),
                    text: action.payload.text 
                }
               
            }
            state.todos.date.push(todo);
        },
        removeTodo: (state , action ) => {
            state.todos.date = state.todos.date.filter((todo)=> todo.id!=action.id)
        },
        updateTodo: (state ,action) => {
            
        },
    }    
})

export const {addTodo , removeTodo , updateTodo} = todoSlice.actions

export default todoSlice.reducer;