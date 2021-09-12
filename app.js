const addTitle = document.getElementById("addTitle");
const addText = document.getElementById("addText");
const saveNoteButton = document.getElementById("save-button");

let userImg
let userName
let userEmail

fetch("https://randomuser.me/api/").then(res=>res.json()).then(data=>{
  // console.log(data)
  userName=data.results[0].name
  userImg=data.results[0].picture.medium
userEmail=data.results[0].email

// console.log(userEmail,userImg,userName)
})
displayUserInfo(userImg,userName,userEmail)


function displayUserInfo(userImg,userName,userEmail) {

// console.log(userName)

  document.getElementById("user-info").innerHTML = `
  
  <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${userImg}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${userName.first}</h5>
        <p class="card-text">${userEmail}</p>
        
      </div>
    </div>
  </div>
</div>
  
  `;
  
}



class NoteTemplate {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }
}

//function for saving note
saveNoteButton.addEventListener("click", function () {
  let notesArray = [];
  const alertDiv = document.getElementById("alert-user");
  const allNotes = localStorage.getItem("notes");

  console.log(allNotes)
  if (allNotes === null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(allNotes);
  }
  let title = addTitle.value;
  let body = addText.value;

  const singleNote = new NoteTemplate(title, body);

  if (singleNote.title.length < 1 || singleNote.body.length < 1) {
    alertDiv.innerHTML = `<div class="alert alert-warning"  role="alert">
        Please enter a title and body texts both...
      </div>`;

    return;
  } else {
    alertDiv.innerHTML = "";
    notesArray.push(singleNote);

    localStorage.setItem("notes", JSON.stringify(notesArray));
    document.getElementById("display-notes").innerHTML = "";
    showNotes();
    addTitle.value = "";
    addText.value = "";
  }
});


const noteCount=0

//function for displaying notes
const showNotes = () => {
  const notesDiv = document.getElementById("display-notes");
  let notesArray = [];

  const allNotes = localStorage.getItem("notes");
  
  if (allNotes === "null") {
    notesArray = [];
  } else {
    notesArray = JSON.parse(allNotes);
    if (notesArray.length == 0) {
      
      document.getElementById("display-message").innerText =
        "No notes to display";
    } else {
      document.getElementById("display-message").innerText = "Your notes...";
    }
  }

  
  notesArray.map((element, index) => {
     noteCount++
    notesDiv.innerHTML += `

 <div class="single-card">
      <div
        class="col"
        style="
          max-height: 250px;
          overflow: scroll;
          scroll-behavior: smooth;
          overflow-x: auto;
        "
      >
        <div class="card text-dark bg-info">
          <div class="card-body">
            <h4
              class="card-title text-center edit-content"
              onclick="contentEdit(this.id)"
              onblur="editTitle(${index},this.id)"
              id="title${index}"
            >
              ${element.title}
            </h4>
            <hr />
            <p
              class="card-text"
              style="text-align: justify"
              onclick="contentEdit(this.id)"
              onblur="editBody(${index},this.id)"
              id="body${index}"
            >
              ${element.bodi}
            </p>
          </div>
        </div>
        <div class="d-flex justify-content-center"></div>
      </div>
    </div>


`;
  });

   document.getElementById("notes-count").innerText = noteCount;

};

showNotes();

//function for make notes editable
function contentEdit(id) {
  const content = document.getElementById(id);
  content.setAttribute("contenteditable", "true");
}


function editTitle(index, id) {
  const content = document.getElementById(id);
  editText(index, id, "title");
  content.removeAttribute("contenteditable");
}

function editBody(index, id) {
  const content = document.getElementById(id);
  editText(index, id, "body");
  content.removeAttribute("contenteditable");
}

const editText = (index, id, toEdit) => {
  const changedText = document.getElementById(id).innerText;
  let notesArray = JSON.parse(localStorage.getItem("notes"));
  if (toEdit === "title") {
    notesArray[index].title = changedText;
  }
  if (toEdit === "body") {
    notesArray[index].body = changedText;
  }
  localStorage.setItem("notes", JSON.stringify(notesArray));
};

document.getElementById("search-btn").addEventListener("click", (e) => {
  const searchedKey = document
    .getElementById("searched-keyword")
    .value.toLowerCase();

  filterNotes(searchedKey);
  e.preventDefault();
});

//function for filtering notes on keyword input in search field..
// function inputChange(event) {
//   const searchedKey = event.target.value.toLowerCase();
//   filterNotes(searchedKey);
// }

const filterNotes = (searchedKey) => {
  const x = document.getElementsByClassName("single-card");

  for (let i = 0; i < x.length; i++) {
    const element = x[i];

    if (element.innerText.toLowerCase().includes(searchedKey)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
};

