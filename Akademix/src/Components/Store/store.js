import todoReducer from "../Home/TodoCalendar/TodoSlice/todoSlice"
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: todoReducer
})