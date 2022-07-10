/*Oi vitor, estava tudo certinho, tinha esquecido de algumas coisa
como chamar a função  na draw e também adicionar velocidade negativa
nas nuvens para elas se deslocarem para a esquerda*/

var bird, birdImg;
var gameOver, gameOverImg
var keyboard, keyboardImg;
var grupoObs, obsImg;
var restartButton, restartButtonImg;
var menuPressSpace, meunuPressSpaceImg
var restartButton, restarButtonImg;
var solo

function preload() {
  birdImg = loadImage('assets/bird.webp');
  menuPressSpaceImg = loadImage('assets/menuPressSpace.png');
  keyboardImg = loadImage('assets/keyboard.png');
  restartButtonImg = loadImage('assets/restartButton.png');
  gameOverImg = loadImage('assets/gameOver.png');
  obsImg = loadImage("assets/obs.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bird = createSprite(200,200,0,0);
  bird.addImage(birdImg);
  bird.scale = 0.25;
  bird.visible = false;

  menuPressSpace = createSprite(750,200,0,0);
  menuPressSpace.addImage(menuPressSpaceImg);
  menuPressSpace.scale = 8.0;
  menuPressSpace.visible = true;

  keyboard = createSprite(700,500,0,0);
  keyboard.addImage(keyboardImg);
  keyboard.scale = 2.0;
  keyboard.visible = true;

  restartButton = createSprite(200,200,0,0);
  restartButton.addImage(restartButtonImg);
  restartButton.scale = 0.25;
  restartButton.visible = false;

  gameOver = createSprite(200,200,0,0);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.25;
  gameOver.visible = false;

  solo = createSprite(width/2 - 5,height,width,2);
  solo.x = width/2
  solo.visible = false;

  grupoObs = new Group();
}

function draw() {
  background(0,0,200);

  bird.collide(solo);

  if(grupoObs.isTouching(bird)){
    restartButton.visible = true;
    gameOver.visible = true;
  }

  if((touches.length > 0 || keyDown("SPACE")) && bird.y  >= height-700) {
    bird.velocityY = -12;
    touches = [];
  }
  bird.velocityY = bird.velocityY + 0.8
  gerarObstáculos(); //Você tinha esquecido de chamar a função na draw;

  if(keyDown("space")) {
    invisible();
    show();
  }

  if(mousePressedOver(restartButton)){
    reset();
  }
drawSprites();
}

function invisible() {
  menuPressSpace.visible = false;
  keyboard.visible = false;
}

function show() {
  bird.visible = true;
}

function gerarObstáculos() { //a função gerar obstáculos está certinha!
  if (frameCount % 60 === 0) {
    var obstáculo = createSprite(width+20,height-300,40,10); 
    obstáculo.y = Math.round(random(100,220)); //eu aumentaria isso, estão nascendo muito grudadas uma na outra. 
    obstáculo.addImage(obsImg);
    obstáculo.scale = 1.0;
    obstáculo.velocityX =  -2; //tinha esquecido de colocar a velocidade
    //para o obstáculo se mover.
  
   grupoObs.add(obstáculo);
  }
  
}

function reset() {
  bird.visible = false;
  restartButton.visible = false;
  gameOver.visible = false;
  menuPressSpace.visible = true;
  keyboard.visible = true;
}