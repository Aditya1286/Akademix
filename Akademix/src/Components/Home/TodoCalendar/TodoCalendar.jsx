// import React from 'react'
// import { useState } from 'react'
// import Calendar from 'react-calendar'
// import { addTodo , updateTodo ,removeTodo} from './TodoSlice/todoSlice'
// import { useDispatch } from 'react-redux'
// import { Provider } from 'react-redux'
// import { store } from '../../Store/store'
// function TodoCalendar() {

//     const [day , setDay] = useState("")
//     const [event,setEvent] = useState("")
//     const dispatch = useDispatch()
//     const todoUpdate = (value , e) => {
//         e.preventDefault();
//         setDay(value);
//         dispatch(addTodo(day.trim()))
//         setDay("")
//     }

//   return (
//     <>
//     <div className='w-[40vh] h-full bg-red-100 flex flex-col flex-grow'>
//         <Calendar onChange={(value , e) => todoUpdate(value , e)}/> 
//         <div>
//                 <input type="text" 
//                 className='w-full h-[7vh] indent-2 outline-none border-none px-2'
//                 placeholder='Enter Event Name'
//                 onChange={(e)=> setEvent(e.target.value)}
//                 />
//         </div>
//     </div>

//     </>
    
//   )
// }

// export default TodoCalendar