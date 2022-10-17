import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import {
  IoCheckmarkDoneSharp,
  IoArchive,
  IoTrash,
  IoClose,
} from "react-icons/io5";

import { BsChatQuote } from "react-icons/bs";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Button, Input, TableCell } from "@mui/material";

// Note
const Note = (props) => {
  const { item, updateTodo, removeTodo, completeTodo, isEdit, setIsEdit } =
    props;

  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [colorActive, setColorActive] = useState();

  const [note, setNote] = useState({
    id: "",
    name: "",
    category: "",
    content: "",
    date: "",
    created: "",
    archived: false,
  });

  function save() {
    updateTodo(note);
    setIsActive(false);
    setIsDisabled(true);
    setIsEdit(false);
  }

  function edit() {
    if (isEdit === false) {
      setIsEdit(true);
      setIsActive(true);
      setIsDisabled(false);
      setNote(item);
      setColorActive({ color: "green" });
    }
  }

  const update = (e) => { 
    setNote((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));    
  };

  return (
    <>
      <TableCell>
        {item.category === "" && <IoArchive className='icon' />}
        {item.category === "Task" && <IoArchive className='icon' />}
        {item.category === "Random Thought" && (
          <IoCheckmarkDoneSharp className='icon' />
        )}
        {item.category === "Idea" && <IoClose className='icon' />}
        {item.category === "Quote" && <BsChatQuote className='icon' />}
      </TableCell>

      <TableCell>      
        <Input
          name='name'
          sx={{
            "& .Mui-disabled": {
              color: "#aa55ff",
            },
          }}
          disabled={isDisabled}
          disableUnderline={true}
          defaultValue={item.name}
          onKeyPress={ update }
        />
      </TableCell>

      <TableCell>
        <Input
          name='created'
          disabled={isDisabled}
          disableUnderline={true}
          defaultValue={item.created}
          onKeyPress={ update }
        />
      </TableCell>
      <TableCell>
        {isDisabled === false ? (
          <Box sx={{ minWidth: 40 }}>
            <FormControl fullWidth>
              <Select
                variant='standard'
                name='category'
                disabled={isDisabled}
                defaultValue={item.category}
                onChange={ update }
              >
                <MenuItem value='Task'>Task</MenuItem>
                <MenuItem value='Random Thought'>Random Thought</MenuItem>
                <MenuItem value='Idea'>Idea</MenuItem>
                <MenuItem value='Quote'>Quote</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <Input
            name='category'
            disabled={isDisabled}
            disableUnderline={true}
            defaultValue={item.category}
            onChange={ update }
          />
        )}
      </TableCell>
      <TableCell>
        <Input
          name='content'
          disabled={isDisabled}
          disableUnderline={true}
          defaultValue={item.content}
          onKeyPress={ update }
        />
      </TableCell>
      <TableCell>
        <Input
          name='date'
          disabled={isDisabled}
          disableUnderline={true}
          defaultValue={item.date}
          onKeyPress={ update }
        />
      </TableCell>
      <TableCell>
        {/* Edit or Save */}
        {isActive === false ? (
          <Button
            size='large'
            disabled={isEdit}
            key={item.id}
            onClick={ edit }
          >
            <AiFillEdit />
          </Button>
        ) : (
          <Button key={item.id + 1} style={colorActive} onClick={save}>
            Save
          </Button>
        )}
      </TableCell>
      <TableCell>
        {/* Archive */}
        <Button disabled={isEdit} onClick={() => completeTodo(item.id)}>
          <IoArchive />
        </Button>
      </TableCell>
      <TableCell>
        {/* Remove */}
        <Button
          disabled={isEdit}
          style={{ color: "red" }}
          onClick={() => removeTodo(item.id)}
        >
          <IoTrash />
        </Button>
      </TableCell>
    </>
  );
};

export default Note;
