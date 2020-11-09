const game = document.querySelector('#pong');
const context = game.getContext('2d');

const ball = {
    x: game.width/2,
    y: game.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: 'white',
}
// Function to keep track of score.

function gameScore(score, x, y, color) {
    context.fillStyle = color;
    context.font = '45px Amatic SC';
    context.fillText(score, x, y);
}




// Functions that will draw the ball, background, and paddles on board 

function createBackground(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h)
}

function createCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
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
    x: game.width/2,
    y: 0,
    width: 0.8,
    height: game.height,
    color: 'white',
}



// add movement for user paddle

game.addEventListener('mousemove', movePaddle);
  
    function movePaddle(evt) {
        let rect = game.getBoundingClientRect();

        userPaddle.y = evt.clientY - rect.top - userPaddle.height/2;
    }


//Collision Detection

function collision(ball, player) {
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;
    
    
    return ball.right > player.left && ball.bottom > player.top && ball.left < player.right && ball.top < player.bottom;
}


// Run the game on board

function render() {
    createBackground(0, 0, game.width, game.height, '#02BDFD');

    createPaddle(divider.x, divider.y, divider.width, divider.height, divider.color)
    
    createPaddle(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height, userPaddle.color)
    
    createPaddle(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height, aiPaddle.color)
    
    createCircle(ball.x, ball.y, ball.radius, ball.color)

    gameScore('Play Now!', 300, 300, 'white');
}


// function to reset ball after player/ai scores.

function resetBall() {
    ball.x = game.width/2;
    ball.y = game.height/2;

    ball.speed = 4;
}


function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // AI 

    let aiComputerLevel = 0.5;

    aiPaddle.y += (ball.y - (aiPaddle.y + aiPaddle.height/2)) * aiComputerLevel;

    if(ball.y + ball.radius > game.height || ball.y - ball.radius < 0) {
        ball.velocityY = - ball.velocityY;
    }

    let player = (ball.x < game.width/2) ? userPaddle: aiPaddle;

    if(collision(ball, player)) {
        
        let collidePoint = ball.y - (player.y + player.height/2);

        collidePoint = collidePoint/(player.height/2);

        let angle = collidePoint * Math.PI/4;

        let direction = (ball.x < game.width/2) ? 1 : -1;

        ball.velocityX = direction * ball.speed * Math.cos(angle);
        ball.velocityY = ball.speed * Math.sin(angle);

        ball.speed += 1;

    }

}

function pingPong() {
    update();
    render();
}


// 60 frames per second

setInterval(pingPong, 1000/60) 