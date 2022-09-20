let initialState = [
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
    archived: false,
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
    archived: false,
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
  {
    id: 227,
    name: "Newtures",
    created: "August 20, 2021",
    category: "Idea",
    content: "TV show",
    date: "August 20, 2021",
    archived: false,
  },
  {
    id: 228,
    name: "New Feaes",
    created: "August 20, 2021",
    category: "Idea",
    content: "TV show",
    date: "August 20, 2021",
    archived: false,
  },
];

let editId;

const refs = {
  table: document.querySelector("table"),
  tbody: document.querySelector("tbody.table-body"),
  tr: document.querySelector(".table-body tr"),
  edit: document.querySelectorAll(".edit"),
  archive: document.querySelector("button.archive"),
  archiveShow: document.querySelector("button.archive-show"),
  delete: document.querySelector("button.delete"),
  deleteAll: document.querySelector("button.delete-all"),
  input: document.querySelectorAll(".table-body input"),
  createNoteBut: document.querySelector("button.create-note"),
  saveNewNoteBut: document.querySelector("button.save-note"),
  tsummary: document.querySelector("tbody.table-summary"),
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
  const allButtons = document.querySelectorAll(".table-body button");
  allButtons.forEach((item) => item.setAttribute("disabled", ""));
}

// Create Note
function createNote() {
  makeDisableAllButton();
  
  rowCurrent.id = Math.floor(Math.random() * 1000000);
  rowCurrent.archived = false;
  const createNoteEl = document.createElement("tr");
  createNoteEl.dataset.rowid = rowCurrent.id;
  
  const dataEl = `<td>;)</td>
  <td><input class='input-note' name="name" placeholder='name' /></td>
  <td><input class='input-note' name="created" placeholder='created' /></td>      
  <td><input class='input-note' name="category" placeholder='category' /></td>
  <td><input class='input-note' name="content" placeholder='content' /></td>
  <td><input class='input-note' name="date" placeholder='date' /></td>`;

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
  initialState.push(rowCurrent);  
  rowCurrent = {};
  refs.tbody.innerHTML = rowEl();
}

// refs.form.addEventListener('submit', onFormSubmit);
// refs.input.addEventListener('input', onTextInput);

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
  <td><input class='input-note' name="name" placeholder='${getEditRow.name}' /></td>
  <td><input class='input-note' name="created" placeholder='${getEditRow.created}' /></td>      
  <td><input class='input-note' name="category" placeholder='${getEditRow.category}' /></td>
  <td><input class='input-note' name="content" placeholder='${getEditRow.content}' /></td>
  <td><input class='input-note' name="date" placeholder='${getEditRow.date}' /></td>
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

  refs.tbody.innerHTML = rowEl();
}

// Archive Note
function archiveNote(e) {
  const rowId = Number(
    e.target.parentNode.parentNode.getAttribute("data-rowid")
  );
  initialState = initialState.map((item) => {
    if (item.id === rowId) item.archived = !item.archived;
    return item;
  });

  document.querySelector("tr[data-rowid='" + rowId + "']").remove();
  getSummaryTab(groupBy(initialState, "category"));
}

// Archive Note Show
let isShowArchive = true;
function archiveNoteShow() {  
  if (isShowArchive) {
    refs.archiveShow.innerHTML = 'Show active';    
  } else {
    refs.archiveShow.innerHTML = 'Show archived';
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
        <td><button class="edit">edit</button></td>
        <td><button class="archive">${isArchive?'unarchive':'archive'}</button></td>
        <td><button class="delete">delete</button></td>     
        </tr>`;
    })
    .join("");

refs.tbody.innerHTML = rowEl();

refs.table.addEventListener("click", (e) => {
  chooseEvent(e);
});

// Сreate an object by category
var groupBy = function (arr, criteria) {
  return arr.reduce(function (obj, item) {
    // Checking if a criterion is a function of an element or a property of an element
    var key = typeof criteria === "function" ? criteria(item) : item[criteria];

    // If the property is not created, create it.
    if (!obj.hasOwnProperty(key)) {
      obj[key] = [0, 0];
    }

    // check for archived
    if (!item.archived) {
      obj[key][0] = obj[key][0] + 1;
      return obj;
    }
    // add count in object
    obj[key][1] = obj[key][1] + 1;

    return obj;
  }, {});
};

// Markup table summary
function getSummaryTab(summaryObj) {
  let El = "";
  for (const key in summaryObj) {
    El =
      El +
      `<tr>
      <td>;)</td>
      <td>${key}</td>
      <td>${summaryObj[key][0]}</td>      
      <td>${summaryObj[key][1]}</td>            
      </tr>`;
  }
  refs.tsummary.innerHTML = El;
}

getSummaryTab(groupBy(initialState, "category"));
