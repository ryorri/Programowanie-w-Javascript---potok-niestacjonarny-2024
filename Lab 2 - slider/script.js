const slide = document.querySelector('.slide')

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

const img6 = document.createElement('img')
img6.src='img/hopper.jpg'
img6.style.height = "480px"
img6.style.marginLeft = "25%"

const vid = document.createElement('vid')
img6.src='vid/sax.mp4'

slide.appendChild(img6)

let pos = -854
setInterval(() =>{
    slide.style.transform =`translateX(${pos}px)`
    pos++


},5)

