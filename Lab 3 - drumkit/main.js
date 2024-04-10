//#region Consts and lets

const sounds = {
    'a': document.querySelector('#clap'),
    's': document.querySelector('#kick'),
    'd': document.querySelector('#hihat'),
    'q': document.querySelector('#boom'),
    'w': document.querySelector('#openhat'),
    'e': document.querySelector('#ride'),
    'z': document.querySelector('#snare'),
    'c': document.querySelector('#tom'),

    'met': document.querySelector('#tink'),
}

const rec = [];
const recTime =[];
let selectedTracks = [];


let no_of_Tracks = 1;
let isRecording = false;
let MetronomePlayPause = false;
let loop = false;
let loopSelItems = false;
let date;
let metronome;
let buttonVal;
let loopInterval;


let listen = (ev) => {
    rec[buttonVal].push(ev.key);
    recTime[buttonVal].push(Date.now() - date);
}
//#endregion

//#region Main

addEventListener('keypress',(ev)=>{
    const sound = sounds[ev.key]
    sound.currentTime = 0
    sound.play()
})
   
CreateRecordingArray()

//#endregion

//#region Functions

function Checklist(num)
{
    if(selectedTracks.includes(num))
    {
        selectedTracks = selectedTracks.filter(item => item !== num)
    }
    else
    {
        selectedTracks.push(num)
    }
}

function AddTrack()
{
    var input = document.createElement('div');
    input.id = "track"+no_of_Tracks;
    input.className = "tracks";
    document.getElementById('container').appendChild(input);

    var RecBtn = document.createElement("button");
    RecBtn.setAttribute("id", "RecBtn"+no_of_Tracks);
    RecBtn.setAttribute("class", 'buttons');
    RecBtn.setAttribute("onclick", 'ButtonValue('+no_of_Tracks+');Recording('+no_of_Tracks+')');
    document.getElementById('track'+no_of_Tracks).appendChild(RecBtn);
    document.getElementById("RecBtn"+no_of_Tracks).innerText="Record button"

    var PlayBtn = document.createElement("button");
    PlayBtn.setAttribute("id", "PlayBtn"+no_of_Tracks);
    PlayBtn.setAttribute("class", 'buttons');
    PlayBtn.setAttribute("onclick", 'ButtonValue('+no_of_Tracks+');Play('+no_of_Tracks+')');
    document.getElementById('track'+no_of_Tracks).appendChild(PlayBtn);
    document.getElementById("PlayBtn"+no_of_Tracks).innerText="Play button"

    var LpBtn = document.createElement("button");
    LpBtn.setAttribute("id", "LpBtn"+no_of_Tracks);
    LpBtn.setAttribute("class", 'buttons');
    LpBtn.setAttribute("onclick", 'ButtonValue('+no_of_Tracks+');Loop('+no_of_Tracks+')'); 
    document.getElementById('track'+no_of_Tracks).appendChild(LpBtn);
    document.getElementById("LpBtn"+no_of_Tracks).innerText="Loop track"

    var chck = document.createElement("input");
    chck.setAttribute("id", "ChckBox"+no_of_Tracks);
    chck.setAttribute("type", "checkbox");
    chck.setAttribute("onclick", 'Checklist('+no_of_Tracks+')'); 
    document.getElementById('track'+no_of_Tracks).appendChild(chck);

    CreateRecordingArray()

    no_of_Tracks++;
}
function ButtonValue(num)
{
    buttonVal = num
}
function Recording(val)
{

    date = Date.now();
    if(isRecording == false)
    {
        if(rec[val].length >0)
        {
            rec[val].length = 0;
            recTime[val].length = 0;
        }

        document.addEventListener('keypress',listen)
        isRecording = true;
        document.getElementById('RecBtn'+val).innerHTML = "Stop Recording"

    }
    else
    {
        document.removeEventListener('keypress',listen)
        isRecording = false;
        document.getElementById('RecBtn'+val).innerHTML = "Record track"

    }
}
function Loop(val)
{
    if(loop === false)
    {
        let time= 0;

        for(let i = 0; i < recTime[val].length;i++)
            time = time + recTime[val][i]

        loopInterval = setInterval(() => Play(val),time)
        Play(val);
        
        loop = true;
    }
    else
    {
        clearInterval(loopInterval);
        loop = false;
    }

}
function LoopSelected()
{
    let intrval
    let temp = [];

    if(loopSelItems == false)
    {       
        for(let i = 0; i < recTime.length; i++)
        {
            let time= 0;

            for(let j = 0; j < recTime[i].length; j++)
            {
                time = time + recTime[i][j];
            }
            
            temp.push(time)
        }

        temp.sort(function(a, b) {
            return a - b;
          });

        PlaySelected()

        intrval = setInterval(() => PlaySelected(),temp[temp.length - 1]);

        loopSelItems = true;
    }
    else
    {
        clearInterval(intrval);
        loopSelItems = false;
    }
    
}
function Play(val)
{
    let i = 0;

    while (i<rec[val].length) 
    {
        loop(i);
        i++;
    }

    function loop(i)
    {
        setTimeout(function(){
            const sound = sounds[rec[val][i]]
            sound.currentTime= 0
            sound.play()
        }, recTime[val][i])
    }
}
function PlayAll()
{
    for(let i = 0; i < rec.length; i++)
    {
        Play(i)
    }
}

function PlaySelected()
{
    for(let i = 0; i < selectedTracks.length; i++)
    {
        Play(selectedTracks[i])
    }
}
function PlayPauseMetronome()
{
    let bpm = document.getElementById("metronomeField").value;

    if(MetronomePlayPause === false)
    {
        metronome = setInterval(() => {
            const sound = sounds['met']
            sound.currentTime = 0
            sound.play()
        },60000 / bpm)

        MetronomePlayPause = true        
    }
    else if (MetronomePlayPause === true)
    {
        clearInterval(metronome)
        MetronomePlayPause = false
    }
}
function CreateRecordingArray()
{
    rec.push(new Array())
    recTime.push(new Array())
}
//#endregion