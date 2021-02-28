console.log("This is my would");

const addBtn = document.getElementById("addBtn");
// Adding note to local storage
addBtn.addEventListener("click", function (e) {
  // console.log("you clicked addBtn");
  let addTxt = document.getElementById("addTxt");
  let addtitle = document.getElementById("addtitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let myobj = {
    title: addtitle.value,
    text: addTxt.value,
  };
  notesobj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  addTxt.value = "";
  addtitle.value = "";

  // console.log(notesobj);
  showNotes();
});
// Function to show notes from Local Strorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let html = "";
  notesobj.forEach(function (element, index) {
    html += `
      <div class="notecard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id= "${index}"onclick="deleteNote(this.id)" class="btn btn-primary">
            Delete Notes
          </button>
        </div>
      </div>`;
  });
  let noteelem = document.getElementById("notes");
  if (notesobj.length != 0) {
    noteelem.innerHTML = html;
  } else {
    noteelem.innerHTML = `Nothing to show! Use "Add a note" section above to add notes.`;
  }
}
// Function to deleted a notes
function deleteNote(index) {
  // console.log("i am deleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  showNotes();
}

let search = document.getElementById("searchtxt");
search.addEventListener("input", function () {
  let inputval = search.value.toLowerCase();
  // console.log("input event fire", inputval);
  let notecard = document.getElementsByClassName("notecard");
  Array.from(notecard).forEach(function (element) {
    let cardtxt = element.getElementsByTagName("p")[0].innerText;
    if (cardtxt.includes(inputval)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
