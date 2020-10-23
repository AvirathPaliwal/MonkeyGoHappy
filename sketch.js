var PLAY = 1
var END = 0
var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var bananaimage, banana
var Ground, groundimage, invisibleGround, jumpImage
var score = 0
var stopImage,jumpImage
var sunImage

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  groundimage = loadImage("ground.jpg")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  sunImage=loadImage("sun.png");
  jumpImage = loadAnimation("jump.png");
  stopImage=loadAnimation("sprite_0.png");
}



function setup() {
  createCanvas(600, 400);
  Ground = createSprite(600, 200, 600, 600)
  Ground.addImage("gb", groundimage);
  Ground.scale = 5
  Ground.velocityX = -4
  swanpmonkey()
  invisibleGround = createSprite(300, 430, 600, 50)
  invisibleGround.visible = false
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
monkey.setCollider("rectangle",0,0,monkey.width,monkey.heigh)
monkey.debug=false
}


function draw() {


  background("white")
  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -7
    
    
    }
monkey.velocityY = monkey.velocityY + 0.5

    swanpObstacle();
    swanpbanana()
   

    if (monkey.isTouching(FoodGroup) ) {
          
       monkey.changeAnimation("jump",jumpImage)
      
      FoodGroup.destroyEach();
    }


    score = score + Math.round(getFrameRate()/ 60);

    if (score > 0 && score % 100 === 0) {}
  }
  if (monkey.isTouching(obstacleGroup) ){ 
    
    
  gameState=END;
    
    } 

  if (gameState === END) {
    monkey.changeAnimation("stop", stopImage); monkey.velocityX = 0 
    Ground.velocityX = 0
    obstacleGroup.setVelocityXEach(0); FoodGroup.setVelocityXEach(0);
  }


   if (Ground.x < 0) {
      Ground.x = Ground.width / 2;
    }
  monkey.collide(invisibleGround);
swanpsun()
  drawSprites();
 text("score:" + score, 100, 50);
  fill("blue");
  stroke("white");
  textSize(20)
  

}

function swanpObstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 350, 10, 10);
    obstacle.addImage("ob", obstaceImage)
    obstacle.scale = 0.4
    obstacle.velocityX = -7
    obstacle.lifetime = -1
    obstacleGroup.add(obstacle);
  }
}

function swanpbanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 200, 10, 10);
    banana.addImage("eating", bananaImage)
    banana.velocityX = -7
    banana.scale = 0.1
    banana.lifetime = -1
    FoodGroup.add(banana);
  }
}

function swanpmonkey() {
  monkey = createSprite(200, 350, 10, 10);
  monkey.addAnimation("runing", monkey_running);
  monkey.addAnimation("stop",stopImage);
  monkey.addAnimation("jump",jumpImage)
  monkey.scale = 0.2
  //monkey.velocityY = -5
}

function swanpsun(){
  sun=createSprite(590,0,10,10);
  sun.addImage(sunImage);
  sun.scale=0.1
  
}