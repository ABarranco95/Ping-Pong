# Ping-Pong

Pong is a table tennis-themed arcade video game, featuring simple two-dimensional graphics, manufactured by Atari and originally released in 1972. It was one of the earliest arcade video games

# Technologies and Languages

The main portion of the game is built mainly around Javascript

# Game Objective

The game in similar to table tennis but in a web arcade version. You will play against the AI and try to get the ball past him . Using your mouse yo will move the paddle to hit the ball. Beware! Contact with the ball on different parts of the paddle will make it bounce off the other walls. Use this knowledge wisely(and perhaps to your advantage).

# Functions 

Set up various functions right from the start to begin foundations of the game. 
```
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
```

# Create game pieces visually on web

```
// Run the game on board

function render() {
    createBackground(0, 0, game.width, game.height, '#02BDFD');

    createPaddle(divider.x, divider.y, divider.width, divider.height, divider.color)
    
    createPaddle(userPaddle.x, userPaddle.y, userPaddle.width, userPaddle.height, userPaddle.color)
    
    createPaddle(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height, aiPaddle.color)
    
    createCircle(pingPongBall.x, pingPongBall.y, pingPongBall.radius, pingPongBall.color)

    gameScore(userPaddle.score, game.width/4, game.height/5, '#fff')

    gameScore(aiPaddle.score, game.width/1.35, game.height/5, '#fff')

    if(userPaddle.score === 1) {
        clearInterval(gameLoop);
       return winningDisplay('Winner, Winner, Chicken Dinner!', game.width/90, 200, 'white')
    
    } else if (aiPaddle.score === 1) {
        clearInterval(gameLoop);
        return winningDisplay('No Chicken Dinner Tonight..', game.width/1.8, 200, 'white')
    }

}
```
