//#region Const and Lets
const board = document.getElementById('board');
const pinnedboard = document.getElementById('pinnedboard');
const doneboard = document.querySelector('.doneboard');

let noOfNotes;
let selectedItem;


 
//#endregion

//#region Main

if(localStorage.getItem("counter") == null)
{
    localStorage.setItem("counter",0)
    noOfNotes = localStorage.getItem("counter")
}
else
{
    noOfNotes = localStorage.getItem("counter")
    noOfNotes++
}

window.onclick = e => {                                            //finding correct element        
    selectedItem = e.target.id.slice(-1);
} 


for(let i = 0; i <= noOfNotes; i++)
{
    if(localStorage.getItem("note"+i) != undefined)
    {
        let parsed = JSON.parse(localStorage.getItem("note"+i))
        let target = board

        if(parsed['pin'] == "yes")
        {
            target = pinnedboard
        }

        if(parsed['done'] === 'yes')
        {
            target = doneboard
        }


        CreateNoteAuto(i, target)

        document.getElementById("title"+i).value = parsed['title']
        document.getElementById("text"+i).value = parsed['txt']
        document.getElementById("tag"+i).value = parsed['tag']
        document.getElementById("date"+i).innerHTML = parsed['creationDate']

        if(parsed['pin'] == "yes")
        {
            document.getElementById("pin"+i).checked = true
        }

        if(parsed['done'] === 'yes')
        {
            Done(i)     
        }
        else
        {
            document.getElementById("color"+i).value = parsed['color']
        }
        


    }
}

SetColor()  


//#endregion

//#region Functions

function CreateAndCheck()
{
    CreatingNote()
    CheckPin()
    SetColor()
}

function Search()
{
    let string = document.querySelector("#search").value

    for(let i = 0; i <= noOfNotes; i++)
    {
        if(localStorage.getItem("note"+i) != undefined)
        {
            let parsed = JSON.parse(localStorage.getItem("note"+i))
            
            let color = parsed['color']

            if(parsed['title'].includes(string)||parsed['txt'].includes(string)||parsed['tag'].includes(string))
            {
                color = "red"
                console.log('tsa')
            }

            

            document.getElementById("note"+i).setAttribute("style",'background-color:'+color+';')


        }
    } 
}

function Done(i)
{
    if(i === undefined)
    {
        i = selectedItem
    }
    let parsed = JSON.parse(localStorage.getItem("note"+i))

    parsed['done'] = "yes";

    localStorage.setItem("note"+i, JSON.stringify(parsed));

    document.getElementById("gratz"+i).innerHTML = "DONE! Hail to the KING!"
    document.getElementById("pin"+i).remove()
    document.getElementById("save"+i).remove()
    document.getElementById("color"+i).remove()
    document.getElementById("done"+i).remove()

}

function Delete()
{
    document.getElementById("note"+selectedItem).remove()
    localStorage.removeItem("note"+selectedItem)
}


function CreatingNote()                 //creating note
{                            
    let myObject = {
        title : document.getElementById("title"+selectedItem).value,
        txt : document.getElementById("text"+selectedItem).value,
        color : document.getElementById("color"+selectedItem).value,
        pin : '',
        creationDate : document.getElementById("date"+selectedItem).innerHTML,
        tag: document.getElementById("tag"+selectedItem).value,
        done:''
      }
      


      window.localStorage.setItem("note"+selectedItem, JSON.stringify(myObject));
};


function CheckPin()                              //check pinned
{                          
    
    let parsed = JSON.parse(localStorage.getItem("note"+selectedItem))

    if(document.getElementById("pin"+selectedItem).checked)
    {
        parsed['pin'] = 'yes';

        localStorage.setItem("note"+selectedItem, JSON.stringify(parsed));

        let temp = document.getElementById("note"+selectedItem).cloneNode(true)
        document.getElementById("note"+selectedItem).remove()

        pinnedboard.appendChild(temp);

    }
    else if(document.getElementById("pin"+selectedItem).checked === false && parsed['pin'] === '')
    {
        parsed['pin'] = 'no';

        localStorage.setItem("note"+selectedItem, JSON.stringify(parsed));

        let temp = document.getElementById("note"+selectedItem).cloneNode(true)
        document.getElementById("note"+selectedItem).remove()

        board.appendChild(temp);

    }
    else
    {
        localStorage.setItem("note"+selectedItem, JSON.stringify(parsed));
    }


};

function SetColor()
{
    for(let i = 0; i <= noOfNotes; i++)
    {
    if(localStorage.getItem("note"+i) != undefined)
        {
            let parsed = JSON.parse(localStorage.getItem("note"+i))

            let color = parsed['color']

            document.getElementById("note"+i).setAttribute("style",'background-color:'+color+';')


        }
    }   
}

function DeleteNote() 
{
    localStorage.clear();
}

function CreateNote()                               //Create from button
{

    var note = document.createElement('div');
    note.id = "note"+noOfNotes;
    note.className = "notes";
    board.appendChild(note);


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

    var tag = document.createElement("input");
    tag.setAttribute("type", "text");
    tag.setAttribute("id", "tag"+noOfNotes);
    tag.setAttribute("class", 'texts');
    tag.setAttribute("placeholder", '(optional)');
    document.getElementById('note'+noOfNotes).appendChild(tag)


    var date = document.createElement('div');
    date.id = "date"+noOfNotes;
    date.className = "dates";
    date.innerHTML = new Date().toLocaleString();;
    document.getElementById('note'+noOfNotes).appendChild(date);

    var pin = document.createElement("input");
    pin.setAttribute("type", "checkbox");
    pin.setAttribute("id", "pin"+noOfNotes);
    pin.setAttribute("class", 'pins');
    document.getElementById('note'+noOfNotes).appendChild(pin)

    var colorTable = document.createElement('select');
    colorTable.id = "color"+noOfNotes;
    colorTable.className = "colors"
    note.appendChild(colorTable);   

    var white = document.createElement("option");
    white.value = "white";
    white.innerHTML = "white"
    document.getElementById('color'+noOfNotes).appendChild(white)  

    var red = document.createElement("option");
    red.value = "red";
    red.innerHTML = "red"
    document.getElementById('color'+noOfNotes).appendChild(red)  

    
    var green = document.createElement("option");
    green.value = "green";
    green.innerHTML = "green"
    document.getElementById('color'+noOfNotes).appendChild(green)  

    
    var blue = document.createElement("option");
    blue.value = "blue";
    blue.innerHTML = "blue"
    document.getElementById('color'+noOfNotes).appendChild(blue)  

    
    var yellow = document.createElement("option");
    yellow.value = "yellow";
    yellow.innerHTML = "yellow"
    document.getElementById('color'+noOfNotes).appendChild(yellow)  

    
    var save = document.createElement("button");
    save.innerHTML = 'Save'
    save.setAttribute("id", "save"+noOfNotes);
    save.setAttribute("class", 'notebuttons');
    save.setAttribute("onclick", 'CreateAndCheck()');
    document.getElementById('note'+noOfNotes).appendChild(save)

    var done = document.createElement("button");
    done.innerHTML = 'Done'
    done.setAttribute("id", "done"+noOfNotes);
    done.setAttribute("class", 'notebuttons');
    done.setAttribute("onclick", 'Done()');
    document.getElementById('note'+noOfNotes).appendChild(done)

    var del = document.createElement("button");
    del.innerHTML = "Delete"
    del.setAttribute("id", "del"+noOfNotes);
    del.setAttribute("onclick", 'Delete()');
    del.setAttribute("class", 'notebuttons');
    document.getElementById('note'+noOfNotes).appendChild(del)

    var gratz = document.createElement('div');
    gratz.setAttribute("id", "gratz"+noOfNotes);
    document.getElementById('note'+noOfNotes).appendChild(gratz)
 
        localStorage.setItem("counter", noOfNotes);  
        noOfNotes++;   

}

function CreateNoteAuto(i, board)                          //Create from function
{
    var note = document.createElement('div');
        note.id = "note"+i;
        note.className = "notes";
        board.appendChild(note);
    
    
        var title = document.createElement("input");
        title.setAttribute("type", "text");
        title.setAttribute("id", "title"+i);
        title.setAttribute("class", 'titles');
        title.setAttribute("placeholder", 'Title');
        document.getElementById('note'+i).appendChild(title)
    
        var txt = document.createElement("input");
        txt.setAttribute("type", "text");
        txt.setAttribute("id", "text"+i);
        txt.setAttribute("class", 'texts');
        txt.setAttribute("placeholder", 'Add somethink...');
        document.getElementById('note'+i).appendChild(txt)

        var tag = document.createElement("input");
        tag.setAttribute("type", "text");
        tag.setAttribute("id", "tag"+i);
        tag.setAttribute("class", 'texts');
        tag.setAttribute("placeholder", '(optional)');
        document.getElementById('note'+i).appendChild(tag)
    
    
        var date = document.createElement('div');
        date.id = "date"+i;
        date.className = "dates";
        document.getElementById('note'+i).appendChild(date);
    
        var pin = document.createElement("input");
        pin.setAttribute("type", "checkbox");
        pin.setAttribute("id", "pin"+i);
        pin.setAttribute("class", 'pins');
        document.getElementById('note'+i).appendChild(pin)
    
        var colorTable = document.createElement('select');
        colorTable.id = "color"+i;
        colorTable.className = "colors"
        note.appendChild(colorTable);   
    
        var white = document.createElement("option");
        white.value = "white";
        white.innerHTML = "white"
        document.getElementById('color'+i).appendChild(white)  
    
        var red = document.createElement("option");
        red.value = "red";
        red.innerHTML = "red"
        document.getElementById('color'+i).appendChild(red)  
    
        
        var green = document.createElement("option");
        green.value = "green";
        green.innerHTML = "green"
        document.getElementById('color'+i).appendChild(green)  
    
        
        var blue = document.createElement("option");
        blue.value = "blue";
        blue.innerHTML = "blue"
        document.getElementById('color'+i).appendChild(blue)  
    
        
        var yellow = document.createElement("option");
        yellow.value = "yellow";
        yellow.innerHTML = "yellow"
        document.getElementById('color'+i).appendChild(yellow)  


        var save = document.createElement("button");
        save.innerHTML = 'Save'
        save.setAttribute("id", "save"+i);
        save.setAttribute("onclick", 'CreateAndCheck()');
        save.setAttribute("class", 'notebuttons');
        document.getElementById('note'+i).appendChild(save)

        var done = document.createElement("button");
        done.innerHTML="Done"
        done.setAttribute("id", "done"+i);
        done.setAttribute("onclick", 'Done()');
        done.setAttribute("class", 'notebuttons');
        document.getElementById('note'+i).appendChild(done)

        var del = document.createElement("button");
        del.innerHTML = "Delete";
        del.setAttribute("id", "del"+i);
        del.setAttribute("onclick", 'Delete()');
        del.setAttribute("class", 'notebuttons');
        document.getElementById('note'+i).appendChild(del)

        var gratz = document.createElement('div');
        gratz.setAttribute("id", "gratz"+i);
        document.getElementById('note'+i).appendChild(gratz)
}

//#endregion