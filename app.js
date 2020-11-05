const game = document.querySelector('#pong');
const context = game.getContext('2d');

context.fillStyle = '#000';
context.fillRect(0, 0, game.width, game.height);

context.fillStyle = 'black;'

// context.fillStyle = '#fff';
// context.beginPath();
// context.arc(300, 350, 10, 0, Math.PI*2, false);
// context.closePath();
// context.fill();

// Functions that will draw the ball and paddles on board

function createCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

const pingPongBall = {
    x: game.width/2,
    y: game.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'white',
}

function update() {
    pingPongBall.x += pingPongBall.velocityX;
    pingPongBall.y += pingPongBall.velocityY;

    if(pingPongBall.y + pingPongBall.radius > game.height || pingPongBall.y - pingPongBall.radius < 0) {
        pingPongBall.velocityY = - pingPongBall.velocityY;
    }
}


function createPaddle(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}


// User and AI Paddles

const userPaddle = {
    x : 5,
    y: game.height/2 - 100/2,
    width : 10,
    height : 100,
    color : 'white',
}

const aiPaddle = {
    x : game.width - 15,
    y : game.height/2 - 100/2,
    width : 10,
    height : 100,
    color : 'white'
}



// Add the divider

const divider = {
    x: game.width/2 - 2/2,
    y: 0,
    width: 0.09,
    height: game.height,
    color: 'white',
}



// add movement for paddles

document.addEventListener('keydown', function(evt){
    if (evt.key === 'w') {
       userPaddle.y -= 10
    } else if (evt.key === 's') {
        userPaddle.y += 10
    }

})


// Run the game on board

function render() {
    createPaddle(divider.x, divider.y, divider.width, divider.height, divider.color)
    
    createPaddle(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height, userPaddle.color)
    
    createPaddle(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height, aiPaddle.color)

    createCircle(pingPongBall.x, pingPongBall.y, pingPongBall.radius, pingPongBall.color)
}



function pingPong() {
    update();
    render();
}


// 60 frames per second

setInterval(pingPong, 1000/60) 