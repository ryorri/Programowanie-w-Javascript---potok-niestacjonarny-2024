const sounds = {
    'a': document.querySelector('#clap'),
    's': document.querySelector('#kick'),
    'd': document.querySelector('#hihat'),
    'q': document.querySelector('#boom'),
    'w': document.querySelector('#openhat'),
    'e': document.querySelector('#ride'),
    'z': document.querySelector('#snare'),
    'x': document.querySelector('#tink'),
    'c': document.querySelector('#tom'),
}

const rec = []
const recTime =[]

const date = Date.now()

addEventListener('keypress',(ev)=>{
    const sound = sounds[ev.key]
    sound.currentTime= 0
    sound.play()
    rec.push(ev.key)
    recTime.push( Date.now() - date)
})


function AAA(number)
{
    const sound = sounds[rec[number]]
    sound.currentTime= 0
    sound.play()
}

function myFunction()
{
    for (let i = 0; i < rec.length; i++)
    {
        setTimeout(AAA(i),recTime[i])
    }


}

setTimeout(AAA,4000)