const game = document.querySelector('#pong');
const context = game.getContext('2d');

// const play = document.querySelector('.play')
const reset = document.querySelector('.reset')


const pingPongBall = {
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
// Function that will display appropriate message
function winningDisplay(message, x, y, color) {
    context.fillStyle = color;
    context.font = '40px Amatic SC';
    context.fillText(message, x, y)
}


// Functions that will draw the pingPongBall, background, and paddles on board 

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
    x: 5,
    y: game.height/2 - 100/2,
    width: 10,
    height: 100,
    color: 'white',
    score: 0,
}

const aiPaddle = {
    x: game.width - 15,
    y: game.height/2 - 100/2,
    width: 10,
    height: 100,
    color: 'white',
    score: 0,
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

function collision(pingPongBall, player) {
    pingPongBall.top = pingPongBall.y - pingPongBall.radius;
    pingPongBall.bottom = pingPongBall.y + pingPongBall.radius;
    pingPongBall.left = pingPongBall.x - pingPongBall.radius;
    pingPongBall.right = pingPongBall.x + pingPongBall.radius;

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;
    
    
    return pingPongBall.right > player.left && pingPongBall.bottom > player.top && pingPongBall.left < player.right && pingPongBall.top < player.bottom;
}


// Run the game on board

function render() {
    createBackground(0, 0, game.width, game.height, 'rgb(11 59 87)');

    createPaddle(divider.x, divider.y, divider.width, divider.height, divider.color)
    
    createPaddle(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height, userPaddle.color)
    
    createPaddle(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height, aiPaddle.color)
    
    createCircle(pingPongBall.x, pingPongBall.y, pingPongBall.radius, pingPongBall.color)

    gameScore(userPaddle.score, game.width/4, game.height/5, '#fff')

    gameScore(aiPaddle.score, game.width/1.35, game.height/5, '#fff')

    if(userPaddle.score === 3) {
        clearInterval(gameLoop);
       return winningDisplay('Winner, Winner, Chicken Dinner!', game.width/90, 200, 'white')
    
    } else if (aiPaddle.score === 3) {
        clearInterval(gameLoop);
        return winningDisplay('No Chicken Dinner Tonight..', game.width/1.8, 200, 'white')
    }

}



function update() {
    pingPongBall.x += pingPongBall.velocityX;
    pingPongBall.y += pingPongBall.velocityY;

    // AI 

    let aiComputerLevel = 0.7;

    aiPaddle.y += (pingPongBall.y - (aiPaddle.y + aiPaddle.height/2)) * aiComputerLevel;

    if(pingPongBall.y + pingPongBall.radius > game.height || pingPongBall.y - pingPongBall.radius < 0) {
        pingPongBall.velocityY = - pingPongBall.velocityY;
    }

    let player = (pingPongBall.x < game.width/2) ? userPaddle: aiPaddle;

    if(collision(pingPongBall, player)) {
        
        let collidePoint = pingPongBall.y - (player.y + player.height/2);

        collidePoint = collidePoint/(player.height/2);

        let angle = collidePoint * Math.PI/4;

        let direction = (pingPongBall.x < game.width/2) ? 1 : -1;

        pingPongBall.velocityX = direction * pingPongBall.speed * Math.cos(angle);
        pingPongBall.velocityY = pingPongBall.speed * Math.sin(angle);

        pingPongBall.speed += 0.6;
    }

    if(pingPongBall.x - pingPongBall.radius < 0) {
        aiPaddle.score++;
        resetBall();
    } else if (pingPongBall.x + pingPongBall.radius > game.width) {
        userPaddle.score++;
        resetBall();
    }
}

// 60 frames per second

// function to reset pingPongBall after player/ai scores.

function resetBall() {
    pingPongBall.x = game.width/2;
    pingPongBall.y = game.height/2;
    pingPongBall.velocityX = -pingPongBall.velocityX;
    pingPongBall.velocityY = -pingPongBall.velocityY;

    pingPongBall.speed = 5;
}


const gameLoop = setInterval(function() {
    update();
    render();
}, 1000/60);


function startGame() {
  return gameLoop;
}

play.addEventListener('click', startGame);



// Function to Reset the game

function resetGame() {
    context.clearRect(0, 0, game.width, game.height);
    userPaddle.score = 0
    aiPaddle.score = 0
    userPaddle.y = game.height/2 - 100/2;
    aiPaddle.y = game.height/2 - 100/2;
    pingPongBall.x = game.width/2;
    pingPongBall.y = game.height/2;
    render();
    // startGame();
}

reset.addEventListener('click', resetGame);
