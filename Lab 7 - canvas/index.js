const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');




let balls = [];
let count = 20

function FillTab()
{
    for(let i =0 ; i < count; i++)
        {
            let bal = {
                x : Math.floor(Math.random() * 100),
                y : Math.floor(Math.random() * 100),
                dx : 2,
                dy : 2,
                ballRadius : 15
            }

            balls.push(bal)
        }
}

function drawBall(i) {


    ctx.beginPath();
    ctx.arc(balls[i].x, balls[i].y, balls[i].ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'purple';
    ctx.fill();
    ctx.closePath();
}

function draw() {



    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < count; i++)
        {
            drawBall(i);
            balls[i].x += balls[i].dx;
            balls[i].y += balls[i].dy;

            if (balls[i].x + balls[i].ballRadius > canvas.width || balls[i].x - balls[i].ballRadius < 0) {
                balls[i].dx = -balls[i].dx;
            }
            if (balls[i].y + balls[i].ballRadius > canvas.height || balls[i].y - balls[i].ballRadius < 0) {
                balls[i].dy = -balls[i].dy;
            }
        }
        
    
        

    
    requestAnimationFrame(draw);
}

// Uruchomienie animacji
draw();

console.log(balls)