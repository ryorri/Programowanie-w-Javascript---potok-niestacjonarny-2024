//#region Const_and_Lets
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let counter = 0
let lastTime = Date.now()


let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    color: 'blue',
    exist: true
};

let holes = [
    { x:  Math.floor((Math.random() * 350) + 1), y: Math.floor((Math.random() * 500) + 1), radius: 15, type: 'target', },
    { x: Math.floor((Math.random() * 350) + 1), y: Math.floor((Math.random() * 500) + 1), radius: 15, type: 'teleport' },
    { x: Math.floor((Math.random() * 350) + 1), y: Math.floor((Math.random() * 500) + 1), radius: 15, type: 'teleport' },
    { x: Math.floor((Math.random() * 350) + 1), y: Math.floor((Math.random() * 500) + 1), radius: 15, type: 'teleport' }
];


//#endregion

//#region Eventlisteners

window.addEventListener('deviceorientation', handleOrientation);

//#endregion

//#region Functions

function handleOrientation(event) {
    const beta = event.beta;
    const gamma = event.gamma;


    ball.exist = false
    // Map gamma to x-axis and beta to y-axis movements
    ball.x += gamma * 0.1;
    ball.y += beta * 0.1;

    if (ball.x < ball.radius) 
        ball.x = ball.radius;

    if (ball.x > canvas.width - ball.radius)
        ball.x = canvas.width - ball.radius;

    if (ball.y < ball.radius) 
        ball.y = ball.radius;
    
    if (ball.y > canvas.height - ball.radius) 
        ball.y = canvas.height - ball.radius;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall()
    drawHoles();
    detectCollisions()
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawHoles() {
    holes.forEach(hole => {
        ctx.beginPath();
        ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    });
}


function detectCollisions() {
    
    holes.forEach(hole => {
        const dist = Math.hypot(ball.x - hole.x, ball.y - hole.y);
        if (dist < ball.radius + hole.radius) {
            if (hole.type === 'target') {
                alert("You reached the goal!");
            } else if (hole.type === 'trap') {
                ball.x = canvas.width / 2;
                ball.y = canvas.height / 2;
            } else if (hole.type === 'teleport') {
                ball.x = Math.random() * (canvas.width - ball.radius * 2) + ball.radius;
                ball.y = Math.random() * (canvas.height - ball.radius * 2) + ball.radius;

            }
        }
    });
}


//#endregion

drawHoles();
requestAnimationFrame(handleOrientation())

