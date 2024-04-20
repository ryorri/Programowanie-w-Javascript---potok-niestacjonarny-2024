//#region Const and Lets
const content = document.getElementById('board');

let noOfNotes = 0;
let createDate;

//#endregion

//#region Main

document.addEventListener('keypress', ()=>{
    let myObject = {
        title : document.getElementById("title0").value,
        txt : document.getElementById("text0").value,
        color : "white",
        pin : "no",
        creationDate : document.getElementById("date0").value,

      }
      
      window.localStorage.setItem("myObject", JSON.stringify(myObject));
});

document.addEventListener('click', ()=>{
 createDate = new Date().toLocaleString();
});

//#endregion

//#region Functions

function CreateNote()
{
    var note = document.createElement('div');
    note.id = "note"+noOfNotes;
    note.className = "notes";
    content.appendChild(note);


    var title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("id", "title"+noOfNotes);
    title.setAttribute("class", 'titles');
    title.setAttribute("placeholder", 'Title');
    document.getElementById('note'+noOfNotes).appendChild(title)

    var txt = document.createElement("input");
    txt.setAttribute("type", "text");
    txt.setAttribute("id", "text"+noOfNotes);
    txt.setAttribute("class", 'texts');
    txt.setAttribute("placeholder", 'Add somethink...');
    document.getElementById('note'+noOfNotes).appendChild(txt)


    var date = document.createElement('div');
    date.id = "date"+noOfNotes;
    date.className = "dates";
    date.innerHTML = new Date().toLocaleString();
    date.value = new Date().toLocaleString();
    document.getElementById('note'+noOfNotes).appendChild(date);

    noOfNotes++;
}


//#endregion