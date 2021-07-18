// javascript code was from https://youtu.be/b8sUhU_eq3g

// select the elements
const clear = document.querySelector(".clear");
const listTitle = document.getElementById("list-title");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "line-through";

//  vars
let LIST, id;
/* localstorage.setItem('key', 'value');
let variable = localstorage.getItem('key');*/

//get item from localstorage
let data = localStorage.getItem("TODO");
let name = localStorage.getItem("NAME");

// check if data is not empty 
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  LoadList(name, LIST);
} else {
  LIST = [];
  id = 0;
}

if (name) {
  listTitle.value = name
}

//load items to the user interface
function LoadList(name, array) {
  listTitle.value = name
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage (with the cross on top)
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// add to do function 

function addToDo(toDo, id, done, trash) {

  if (trash) { return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
                <li class="item">
                  <i class="far ${DONE}" job="complete" id="${id}"></i>
                  <p class="text ${LINE}">${toDo}</p>
                  <i class="fas fa-trash-alt" job="delete" id="${id}"></i>
                </li>
                `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//add an item to the list when user hit enter key
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    //if the  input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      id++;

      //add item from localstorage

      localStorage.setItem("TODO", JSON.stringify(LIST));

    }
    input.value = "";
  }
});

// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function (event) {

  const element = event.target; //return the clicked element inside the list
  const elementJob = element.attributes.job.value; //complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  //add item from localstorage
  localStorage.setItem("TODO", JSON.stringify(LIST));

});

listTitle.addEventListener("change", function (event) {
  localStorage.setItem("NAME", listTitle.value.trim())
});
