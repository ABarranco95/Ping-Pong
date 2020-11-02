let game = document.querySelector('#pong')

const ctx = game.getContext('2d')

class Paddle {
    constructor(x) {
        this.x = x;
        this.y = height / 2;
        this.height = 80;
        this.width = 10;
    }
    createPaddle() {
        fill(255);
        rect(this.x, this.y, this.height, this.width)
    }
}

const userPaddle = '';

function setup() {
    userPaddle = new Paddle(20);
  }
   
  function draw() {
    background(0);
    userPaddle.createPaddle();
  }


  console.log(userPaddle)