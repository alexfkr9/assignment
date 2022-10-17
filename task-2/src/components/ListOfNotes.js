import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  removeAllTodos,
  updateTodos,
} from "../redux/reducer";
import Note from "./Note";
import CreateNote from "./CreateNote";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

import { IoArchive, IoTrash } from "react-icons/io5";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    removeAllTodo: () => dispatch(removeAllTodos()),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

// let note;

const ListOfNotes = (props) => {
  const [sort, setSort] = useState("all");
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <h3>List Of Notes</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#cceeff" }}>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Dates</TableCell>
              <TableCell></TableCell>
              <TableCell>
                {sort === "all" ? (
                  <Button
                    size='large'
                    disabled={isEdit}
                    onClick={() => setSort("archive")}
                  >
                    <IoArchive />
                  </Button>
                ) : (
                  <Button
                    size='small'
                    disabled={isEdit}
                    onClick={() => setSort("all")}
                  >
                    All
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Button
                  size='large'
                  style={{ color: "red" }}
                  disabled={isEdit}
                  onClick={props.removeAllTodo}
                >
                  <IoTrash />
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* for archive items */}
            {props.todos.length > 0 && sort === "archive"
              ? props.todos.map((item) => {
                  return (
                    item.archived === true && (
                      <TableRow key={item.id}>
                        <Note                          
                          item={item}
                          removeTodo={props.removeTodo}
                          updateTodo={props.updateTodo}
                          completeTodo={props.completeTodo}
                          isEdit={isEdit}
                          setIsEdit={setIsEdit}
                        />
                      </TableRow>
                    )
                  );
                })
              : null}

            {/* for all items */}
            {props.todos.length > 0 && sort === "all"
              ? props.todos.map((item) => {
                  return (
                    item.archived === false && (
                      <TableRow key={item.id}>
                        <Note                          
                          item={item}
                          removeTodo={props.removeTodo}
                          updateTodo={props.updateTodo}
                          completeTodo={props.completeTodo}
                          isEdit={isEdit}
                          setIsEdit={setIsEdit}
                        />
                      </TableRow>
                    )
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateNote />
    </>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfNotes);