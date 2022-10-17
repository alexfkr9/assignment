import React from "react";
import { connect } from "react-redux";
import { completeTodos } from "../redux/reducer";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import TableCell from "@mui/material/TableCell";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    completeTodo: (id) => dispatch(completeTodos(id)),
  };
};

const Summary = (props) => {
  let taskArchive: boolean = 0,
    taskActive: boolean = 0,
    randomArchive: boolean = 0,
    randomActive: boolean = 0,
    ideaArchive: boolean = 0,
    ideaActive: boolean = 0,
    quoteArchive: boolean = 0,
    quoteActive: boolean = 0;

  props.todos.forEach((item) => {
    switch (item.category) {
      case "Task":
        item.archived ? taskArchive++ : taskActive++;
        break;
      case "Random Thought":
        item.archived ? randomArchive++ : randomActive++;
        break;
      case "Idea":
        item.archived ? ideaArchive++ : ideaActive++;
        break;
      case "Quote":
        item.archived ? quoteArchive++ : quoteActive++;
        break;
      default:
        console.log("Nothing");
    }
  });

  return (
    <div className='displaytodos'>
      <h3>Summary</h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#cceeff" }}>
              <TableCell>Note Category</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Archived</TableCell>
            </TableRow>
          </TableHead>

          {props.todos.length > 0 ? (
            <TableBody>
              <TableRow>
                <TableCell>Task</TableCell> <TableCell>{taskActive}</TableCell>{" "}
                <TableCell>{taskArchive}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Random Thought</TableCell>{" "}
                <TableCell>{randomActive}</TableCell>
                <TableCell>{randomArchive}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Idea</TableCell> <TableCell>{ideaActive}</TableCell>
                <TableCell>{ideaArchive}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quote</TableCell>
                <TableCell>{quoteActive}</TableCell>
                <TableCell>{quoteArchive}</TableCell>
              </TableRow>
            </TableBody>
          ) : null}
        </Table>
      </TableContainer>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
