var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dog, dogImage;
var ground, groundImage, invisibleGround;
var stone, stoneImg, stoneGroup;
var game, gameOver, gameOverImg;
var restart, restartImg;

function preload(){
  dogImage = loadAnimation("d1.png","d2.png","d3.png","d4.png","d5.png","d6.png","d7.png","d8.png","d9.png","d10.png")
  groundImage = loadImage("newg.png");
  stoneImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup(){
  createCanvas(600,200);
  dog = createSprite(50,160);
  dog.addAnimation("running",dogImage);
  dog.scale = 0.2;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  ground = createSprite(300,180,600,20);
  ground.addImage(groundImage);

  invisibleGround = createSprite(300,180,600,10);
  invisibleGround.visible = false;

  stoneGroup = new Group();

  score = 0;
}

function draw(){
  background("white");
  text("Score: "+ score, 500,50);
   console.log("this is ",gameState)
  
   if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -(4 + 3 * score / 100);
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& dog.y >= 100) {
        dog.velocityY = -12;
    }
  
    //add gravity
    dog.velocityY = dog.velocityY + 0.8
  
    //spawn stone on the ground
    spawnStones();
    
    if(stoneGroup.isTouching(dog)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     console.log("try again")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      dog.velocityY = 0
     
      //change the dog animation
      dog.changeAnimation("collided", dog_collided);
     
      //set lifetime of the game objects so that they are never destroyed
     stoneGroup.setLifetimeEach(-1);
     stoneGroup.setVelocityXEach(0);
     
     if (mousePressedOver(restart)) {
      reset();
    }
   }
  
 
  //stop dog from falling down
  dog.collide(invisibleGround);
  
  if(ground.x <= 200) {
    ground.x = ground.width/2;
  }
  spawnStones();
  dog.collide(invisibleGround)
  drawSprites();
}

function spawnStones(){
  if(frameCount % 160 === 0) {
    stone = createSprite(600,150);
    stone.velocityX = -(6 + score / 100);
    stone.addImage(stoneImg)
    stone.scale = 0.15;
    stone.velocityX = -3;
   
    stone.lifetime = 200;
  }
}