const canvas = document.querySelector('#pong');
const context = canvas.getContext('2d');

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

context.fillStyle = '#fff';
context.beginPath();
context.arc(300, 350, 100, 0, Math.PI*2, false);

context.closePath();

// Functions that will draw the ball and paddles on board

function createCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fillStyle();
}

function createPaddle(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect = (x, y, w, h);
}
// User and AI Paddles

const userPaddle = {
    x : 0,
    y: canvas.height/2 - 50/2,
    width : 10,
    height : 50,
    color : 'white',
}

const aiPaddle = {
    x : canvas.width - 10,
    y : canvas.height/2 - 50/2,
    width : 10,
    height : 50,
    color : 'white'
}


// add movement for paddles

document.addEventListener('keydown', function(evt){
    if (evt.key === 'w') {
        y -= 10
    } else if (evt.key === 's') {
        y += 10
    }
})
