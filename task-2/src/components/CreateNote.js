import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";

import {
  Button,
  Box,
  TextField,
  TableRow,
  TableCell,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const CreateNote = (props) => {
  const [todo, setTodo] = useState({});

  const [isCreate, setIsCreate] = useState(false);

  const handleChange = (e) => {
    setTodo((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const getDate = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date();
    let month = months[d.getMonth()];
    let day = d.getDate();
    let year = d.getFullYear();
    return month + " " + day + ", " + year;
  };

  const create = () => {
    setIsCreate(true);
  };

  const add = () => {
    if (Object.keys(todo).length === 0) {
      alert("Note is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        name: todo.name,
        category: todo.category,
        content: todo.content,
        date: todo.date,
        created: getDate(),
        archived: false,
      });
      setIsCreate(false);
    }
  };

  return (
    <>
      {isCreate === false ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
          <Button onClick={() => create()}>Cteate Note</Button>
        </Box>
      ) : (
        <TableRow>
          <TableCell>
            <TextField
              type='text'
              name='name'
              placeholder='Name'
              onChange={(e) => handleChange(e)}
              required
            />
          </TableCell>
          <TableCell>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel>Category:</InputLabel>
                <Select
                  label='Category:'
                  value={todo.category}
                  name='category'
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value='Task'>Task</MenuItem>
                  <MenuItem value='Random Thought'>Random Thought</MenuItem>
                  <MenuItem value='Idea'>Idea</MenuItem>
                  <MenuItem value='Quote'>Quote</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </TableCell>

          <TableCell>
            <TextField
              type='text'
              name='content'
              placeholder='Content'
              onChange={(e) => handleChange(e)}
              required={true}
            />
          </TableCell>
          <TableCell>
            <TextField
              type='text'
              name='date'
              placeholder='Date'
              onChange={(e) => handleChange(e)}
            />
          </TableCell>
          <TableCell>
            <Button className='' onClick={() => add()}>
              Add Note
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNote);
