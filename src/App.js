import './App.css';

let gamePiece;
let obstacle;
let obstacle2;
let obstacle3;
let obstacle4;
let obstacle5;
let ctx;

function startGame(){
  gamePiece = new component(30, 30, "red", 10, 120);
  obstacle = new component(400, 10, "white", 0, 800);
  obstacle2 = new component(400, 10, "white", 400, 950);
  obstacle3 = new component(400, 10, "white", 800, 750);
  obstacle4 = new component(400, 10, "white", 1200, 1000);
  obstacle5 = new component(400, 10, "white", 1600, 1100);
  gameArea.start();
}

let gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 2000;
    this.canvas.height = 1200;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
      gameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
      gameArea.key = false;
    })
  },
  clear : function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.update = function(){
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
  }

  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }

}

function updateGameArea() {
  if (gamePiece.crashWith(obstacle) && gamePiece.speedY < 0){
    gameArea.stop();
  } else {
    gameArea.clear();
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;
    if (gameArea.key && gameArea.key == 37) {gamePiece.speedX = -4; }
    if (gameArea.key && gameArea.key == 39) {gamePiece.speedX = 4; }
    if (gameArea.key && gameArea.key == 38) {accelerate(-1.5); }
    if (gameArea.key && gameArea.key == 40) {gamePiece.speedY = 1; }
    gamePiece.newPos();
    gamePiece.update();
    obstacle.update();
    obstacle2.update();
    obstacle3.update();
    obstacle4.update();
    obstacle5.update();
  }

  function accelerate(n) {
    gamePiece.speedY = n;
    gamePiece.gravity = 0;
  }

}

function App() {
  startGame()
  return (
      <body>

      </body>
  );
}

export default App;
