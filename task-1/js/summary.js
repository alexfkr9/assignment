const tsummary = document.querySelector("tbody.table-summary");

// Сreate an object by category
const groupBy = (arr, criteria) => {
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
const getSummaryTab = (summaryObj) => {
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
  tsummary.innerHTML = El;
}

export { getSummaryTab, groupBy };