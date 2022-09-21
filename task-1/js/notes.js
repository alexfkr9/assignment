import data from './data.js';
import { getSummaryTab, groupBy } from './summary.js';

let initialState = data;

const refs = {
  table: document.querySelector("table"),
  tbody: document.querySelector("tbody.table-body"),  
  archiveShow: document.querySelector("button.archive-show"), 
  createNoteBut: document.querySelector("button.create-note"),
  saveNewNoteBut: document.querySelector("button.save-note"),  
};


function chooseEvent(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  if (e.target.classList.contains("edit")) {
    editNote(e);
    return;
  }
  if (e.target.classList.contains("archive")) {
    archiveNote(e);
    return;
  }
  if (e.target.classList.contains("archive-show")) {
    archiveNoteShow();
    return;
  }
  if (e.target.classList.contains("delete")) {
    deleteNote(e);
    return;
  }
  if (e.target.classList.contains("delete-all")) {
    deleteNoteAll();
  }
  return;
}

let rowCurrent = {};

refs.createNoteBut.addEventListener("click", createNote);

function makeDisableAllButton() {
  const allButtons = document.querySelectorAll("table button, button.create-note");
  allButtons.forEach((item) => item.setAttribute("disabled", ""));
}

function removeDisabledAllButton() {
  const allButtons = document.querySelectorAll("table button, button.create-note");
  allButtons.forEach((item) => item.removeAttribute('disabled'));  
}

// Create Note
function createNote() {
  makeDisableAllButton();
  
  rowCurrent.id = Math.floor(Math.random() * 1000000);
  rowCurrent.archived = false;
  const createNoteEl = document.createElement("tr");
  createNoteEl.dataset.rowid = rowCurrent.id;
  
  const dataEl = `<td>;)</td>
  <td><input class='input-note' type="text" name="name" placeholder='name'/></td>
  <td><input class='' type="date" name="created" placeholder='created' /></td>      
  <td><select class='' name="category" placeholder='category'>
      <option value="Task" selected>Task</option>
      <option value="Random Thought">Random Thought</option>
      <option value="Idea">Idea</option>
      <option value="Quote">Quote</option>
  </select></td>
  <td><input class='input-note' type="text" name="content" placeholder='content' /></td>
  <td><input class='input-note' type="date" name="date" placeholder='date' /></td>`;

  createNoteEl.innerHTML = dataEl;
  refs.tbody.append(createNoteEl);

  refs.saveNewNoteBut.classList.remove("display-none");
  refs.createNoteBut.classList.add("display-none");

  refs.tbody.addEventListener("input", (e) => {
    if (e.target.nodeName !== "INPUT") return;
    onTextInput(e);
  });


}

refs.saveNewNoteBut.addEventListener("click", saveNewNote);

// to save new created note
function saveNewNote() {
  refs.saveNewNoteBut.classList.add("display-none");
  refs.createNoteBut.classList.remove("display-none");
  removeDisabledAllButton();

  initialState.push(rowCurrent);  
  rowCurrent = {};
  refs.tbody.innerHTML = rowEl();
}

function onTextInput(e) {
  rowCurrent[e.target.name] = e.target.value;
}

// Edit Note
function editNote(e) {
  const rowId = Number(
    e.target.parentNode.parentNode.getAttribute("data-rowid")
  );
  makeDisableAllButton();
  const getEditRow = initialState.find((item) => item.id == rowId);

  const data = `<td>;)</td>
  <td><input class='input-note' type="text" name="name" value='${getEditRow.name}' /></td>
  <td><input class='' type="date" name="created" value='${getEditRow.created}' /></td>      
  <td><select class='' name="category" placeholder='${getEditRow.category}' '>
    <option value="Task">Task</option>
    <option value="Random Thought">Random Thought</option>
    <option value="Idea">Idea</option>
    <option value="Quote">Quote</option>
  </select></td>
  <td><input class='input-note' name="content" value='${getEditRow.content}' /></td>
  <td><input class='input-note' name="date" value='${getEditRow.date}' /></td>
  <td><button class="save">save</button></td>
  <td><button class="cancel">cancel</button></td>
  <td><button class="delete" disabled >delete</button></td>`;

  const activeRow = document.querySelector("tr[data-rowid='" + rowId + "']");
  activeRow.innerHTML = data;

  activeRow.addEventListener("input", (e) => {
    if (e.target.nodeName !== "INPUT") return;

    if (e.target.classList.contains("input-note")) {
      onTextInput(e);
    }
    return;
  });

  activeRow.addEventListener("click", (e) => {
    if (e.target.nodeName !== "BUTTON") return;
    // activeRow.removeEventListener("click", () => {});

    if (e.target.classList.contains("save")) {
      saveNote(rowId);
      return;
    }
    if (e.target.classList.contains("cancel")) {
      removeDisabledAllButton();
      refs.tbody.innerHTML = rowEl();
    }
    return;
  });

  // const selectedNote = e.target.dataset.color;
  // output.textContent = `Selected color: ${selectedColor}`;
  // output.style.color = selectedColor;
}

function saveNote(rowId) {
  // const rowCurrent = initialState.find( item =>  item.id == rowId );
  initialState = initialState.map((item) => {
    if (item.id === rowId) {
      item = { ...item, ...rowCurrent };
    }
    return item;
  });

  removeDisabledAllButton();
  refs.tbody.innerHTML = rowEl();
}

// Archive Note
function archiveNote(e) {
  const rowId = Number(
    e.target.parentNode.parentNode.getAttribute("data-rowid")
  );
  initialState = initialState.map( item => {
    if (item.id === rowId) item.archived = !item.archived;
    return item;
  });

  document.querySelector("tr[data-rowid='" + rowId + "']").remove();
  getSummaryTab(groupBy(initialState, "category"));
}

// Show Archive Note 
let isShowArchive = true;
function archiveNoteShow() {  
  if (isShowArchive) {
    refs.archiveShow.innerHTML = 'Show active';
    refs.createNoteBut.style.opacity = 0;    
  } else {
    refs.archiveShow.innerHTML = 'Show archived';
    refs.createNoteBut.style.opacity = 1;
  }  
  
  refs.tbody.innerHTML = rowEl(isShowArchive);  
  isShowArchive = !isShowArchive;    
}

// Delete Note
function deleteNote(e) {
  const rowId = Number(
    e.target.parentNode.parentNode.getAttribute("data-rowid")
  );
  document.querySelector("tr[data-rowid='" + rowId + "']").remove();
  initialState = initialState.filter((item) => item.id !== rowId);
  getSummaryTab(groupBy(initialState, "category"));
}

// Delete All Note
function deleteNoteAll() {  
  refs.tbody.remove();
  initialState = [];
  getSummaryTab(groupBy(initialState, "category"));
}

const rowEl = ( isArchive=false, items=initialState ) =>
  items
    .filter( item => item.archived === isArchive )
    .map( item => {
      return `<tr data-rowid=${item.id}>
        <td>;)</td>
        <td>${item.name}</td>
        <td>${item.created}</td>      
        <td>${item.category}</td>
        <td>${item.content}</td>
        <td>${item.date}</td>
        <td>${isArchive?'':'<button class="edit">edit</button>'}</td>
        <td><button class="archive">${isArchive?'unarchive':'archive'}</button></td>
        <td><button class="delete">delete</button></td>     
        </tr>`;
    })
    .join("");

refs.tbody.innerHTML = rowEl();

refs.table.addEventListener("click", (e) => {
  chooseEvent(e);
});


getSummaryTab(groupBy(initialState, "category"));
