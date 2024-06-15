const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let balls = [];
let running = false;
let animationFrameId;
let mousePos = { x: 0, y: 0 };
let attraction = 0;

function createBall() {
    let radius = Math.floor((Math.random() * 15) + 1);
    let x = Math.random() * (canvas.width - 2 * radius) + radius;
    let y = Math.random() * (canvas.height - 2 * radius) + radius;
    let speedX = (Math.random() - 0.5) * 4;
    let speedY = (Math.random() - 0.5) * 4;
    return { x, y, radius, speedX, speedY };
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function updateBall(ball) {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Bounce off the walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }
}

function createBalls(numBalls) {
    balls = [];
    for (let i = 0; i < numBalls; i++) {
        balls.push(createBall());
    }
}

function drawLines(distance) {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let dx = balls[i].x - balls[j].x;
            let dy = balls[i].y - balls[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < distance) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function applyMouseInteraction(ball) {
    let dx = mousePos.x - ball.x;
    let dy = mousePos.y - ball.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
        let force = attraction / distance;
        ball.speedX += force * dx;
        ball.speedY += force * dy;
    }
}

function animate(distance) {
    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        applyMouseInteraction(ball);
        updateBall(ball);
        drawBall(ball);
    });

    drawLines(distance);

    animationFrameId = requestAnimationFrame(() => animate(distance));
}

document.getElementById("startButton").addEventListener("click", () => {
    let numBalls = parseInt(document.getElementById("numBalls").value);
    let distance = parseInt(document.getElementById("distance").value);
    attraction = parseInt(document.getElementById("attraction").value);
    createBalls(numBalls);
    running = true;
    animate(distance);
});

document.getElementById("resetButton").addEventListener("click", () => {
    running = false;
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
});

canvas.addEventListener('mousemove', (event) => {
    let rect = canvas.getBoundingClientRect();
    mousePos.x = event.clientX - rect.left;
    mousePos.y = event.clientY - rect.top;
});
