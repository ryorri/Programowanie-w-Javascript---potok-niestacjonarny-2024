//#region Consts and lets
const main = document.querySelector('main')
const slider = document.querySelector('.slider')
const slide = document.querySelector('.slide')
let dark = document.createElement('div')
dark.setAttribute('class','dark')
dark.style.backgroundColor='rgba(0,0,0,0.95)'
dark.style.height='100vh'
dark.style.width='100wv'
dark.style.position='relative'
dark.style.top='0'
dark.style.left='0'
dark.style.padding='50px'
dark.setAttribute('onclick','Lightbox()')






//#region  img
const img1 = document.createElement('img')
img1.src='img/gecko.jpg'
img1.style.height = "480px"
img1.style.marginLeft = "25%"

const img2 = document.createElement('img')
img2.src='img/chippo.jpeg'
img2.style.height = "480px"
img2.style.marginLeft = "25%"


const img3 = document.createElement('img')
img3.src='img/pando.jpeg'
img3.style.height = "480px"
img3.style.marginLeft = "25%"


const img4 = document.createElement('img')
img4.src='img/mice.jpg'
img4.style.height = "480px"
img4.style.marginLeft = "25%"


const img5 = document.createElement('img')
img5.src='img/gatto.jpg'
img5.style.height = "480px"
img5.style.marginLeft = "25%"
img5.setAttribute('onclick','Lightbox()')

const img6 = document.createElement('img')
img6.src='img/hopper.jpg'
img6.style.height = "480px"
img6.style.marginLeft = "25%"


const vid = document.createElement('video')
vid.src='vid/sax.mp4'
vid.controls = true;
vid.autoplay = true;
vid.muted = true;



const string = document.createElement('div')
string.style.textAlign = "center"
string.style.paddingTop = "170px"
string.style.fontSize = "100px"

string.innerHTML = "Cześć!"


//#endregion

const imgs = [];
imgs.push(string,vid, img1, img2, img3, img4,img5,img6);

let aaminate = setInterval(Animate,5)

let poss = -854;
let screenWidth = window.innerWidth;
let cnt = 0;
let pause = false;
let lightbox = false;
let pos = true;


//#endregion

//#region Functions
function Animate()
{
    screenWidth = window.innerWidth;
    
    slide.appendChild(imgs[cnt]);

    slide.style.transform =`translateX(${poss}px)`
    reverse()

    let middlescreen = Math.round((screenWidth/2)-437)
    
    if(poss == middlescreen)
    {
        clearInterval(aaminate)
        slide.style.transform =`translateX(${middlescreen+2}px)`

        setTimeout(CallInterval, 5000)
        
    }

    if(poss >= screenWidth + 854)
    {
        poss = -854
        slide.removeChild(imgs[cnt]);
        cnt++;
    }
    else if(poss <= -855)
    {
        poss = screenWidth + 854
        slide.removeChild(imgs[cnt]);
        cnt++;
    }

    
    if(cnt >= 8)
    {
        cnt = 0;
    }
    
    console.log(lightbox)
 

}


function CallInterval()
{

    aaminate = setInterval(Animate,5)
}

function ShowSelectedSlide(no_of_slide)
{   
    slide.removeChild(imgs[cnt]);
    cnt = no_of_slide
    pos = middlescreen
    Animate()
}

function NextSlide(num)
{   
    slide.removeChild(imgs[cnt]);

    cnt = cnt + num

    if(cnt >= 8)
    {
        cnt = 0;
    }
    
    if(cnt <= -1)
    {
        cnt = 7;
    }
    Animate()
}

function StartPause()
{

    if(pause == false)
    {
        clearInterval(aaminate)
        pause = true;
    }
    else
    {
        CallInterval()
        pause = false;
    }
    
}

function Lightbox()
{
    

    if(lightbox == false)
    {
        main.appendChild(dark)


        switch (cnt) {
            case 0:
                const x = document.createElement('div')
                x.style.color = 'white'
                x.innerHTML = "Cześć!"
                dark.appendChild(x)
                break;
            case 1:
                const a = document.createElement('video')
                a.src='vid/sax.mp4'
                a.controls = true;
                a.autoplay = true;
                dark.appendChild(a)
                break;
            case 2:
                const b = document.createElement('img')
                b.src='img/gecko.jpg'
                b.style.height = "480px"
                b.style.marginLeft = "25%"
                dark.appendChild(b)
                break;
            case 3:
                const c = document.createElement('img')
                c.src='img/chippo.jpeg'
                c.style.height = "480px"
                c.style.marginLeft = "25%"
                dark.appendChild(c)
                break;
            case 4:
                const d = document.createElement('img')
                d.src='img/pando.jpeg'
                d.style.height = "480px"
                d.style.marginLeft = "25%"
                dark.appendChild(d)
                break;
            case 5:
            
                const e = document.createElement('img')
                e.src='img/mice.jpg'
                e.style.height = "480px"
                e.style.marginLeft = "25%"
                dark.appendChild(e)
                break;
            case 6:
                const f = document.createElement('img')
                f.src='img/gatto.jpg'
                f.style.height = "480px"
                f.style.marginLeft = "25%"
                f.setAttribute('onclick','Lightbox()')
                dark.appendChild(f)
                break;
            case 7:

                const g = document.createElement('img')
                g.src='img/hopper.jpg'
                g.style.height = "480px"
                g.style.marginLeft = "25%"
                dark.appendChild(g)
                break;
          }

        lightbox = true;
    }
    else
    {
        lightbox = false;
        main.removeChild(dark)
        removeAllChild(dark)
    }
}



function removeAllChild(parent) 
{
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function reverse()
{
    if(pos==true)
    {
        poss++
    }
    else
    {
        poss--
    }
}

function Position()
{
    if(pos == true)
    {
        pos=false
    }
    else
    {
        pos=true
    }
}


//#endregion