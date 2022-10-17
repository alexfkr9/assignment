import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 221,
    name: "Shopping list",
    created: "May 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
    date: "April 20, 2021",
    archived: false,
  },
  {
    id: 222,
    name: "The theory of evolushion",
    created: "March 20, 2021",
    category: "Random Thought",
    content: "Coffe bra",
    date: "April 20, 2021",
    archived: true,
  },
  {
    id: 223,
    name: "New Features",
    created: "June 20, 2021",
    category: "Idea",
    content: "TV show",
    date: "June 20, 2021",
    archived: false,
  },
  {
    id: 224,
    name: "Shopping list",
    created: "March 20, 2021",
    category: "Quote",
    content: "Tomatoes, bread",
    date: "April 20, 2021",
    archived: false,
  },
  {
    id: 225,
    name: "The theory of evolushion",
    created: "June 20, 2021",
    category: "Random Thought",
    content: "Coffe bra",
    date: "June 20, 2021",
    archived: true,
  },
  {
    id: 226,
    name: "New Features",
    created: "August 20, 2021",
    category: "Idea",
    content: "TV show",
    date: "August 20, 2021",
    archived: false,
  },
];

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //here we will write our reducer
    //Adding todos
    // state = initialState,  action.payload = todo ( addTodos(todo) )
    addTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },
    //remove todos
    removeTodos: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    //remove all todos
    removeAllTodos: (state, action) => {
      console.log(state);
      console.log(action);
      return (state = []);
    },
    //update todos
    updateTodos: (state, action) => {      
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          todo = action.payload;
        }
        return todo;
      });
    },
    //archived
    completeTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            archived: !todo.archived,
          };
        }
        return todo;
      });
    },
  },
});

export const {
  addTodos,
  removeTodos,
  removeAllTodos,
  updateTodos,
  completeTodos,
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
