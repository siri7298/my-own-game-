var policerunimg
var backgroundimg
var Cloudimg
var obstacle1
var obstacle2
var obstacle3
var obstacle4
var obstacle5
var police
var groundimg
var restartimg

var play = 1
var END = 0
var gamestate = play
var score = 0
var obstaclesGroup
var gameOverimg
var CloudsGroup
var invisibleGround





function preload() {
policerunimg= loadAnimation("assets/jumping.png","assets/shooting.png")
Cloudimg= loadImage("assets/cloud.png")
obstacle1= loadImage("assets/obstacle_1.png")
obstacle2= loadImage("assets/obstacle_2.png")
obstacle3 = loadImage("assets/obstacle_3.png")
obstacle4 = loadImage("assets/obstacle_4.png")
obstacle5 = loadImage("assets/obstacle_5.png")
groundimg = loadImage("assets/ground.png")
restartimg = loadImage("assets/restart.png")
gameOverimg= loadImage("assets/gameOver.png")
bgimage = loadImage("assets/backgroundImg.png")

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
police = createSprite(50,height-60,20,50);
police.addAnimation("running", policerunimg);
police.scale = 0.7;
police.setCollider("circle",0,0,150)


 
invisibleGround = createSprite(width/2,height-10,width,125);  
invisibleGround.shapeColor = "#f4cbaa";


ground = createSprite(width/2,height,width,2);
ground.addImage("ground",groundimg);
ground.x = width/2
ground.velocityX = -(6 + 3*score/100);

gameOver = createSprite(width/2,height/2- 50);
gameOver.addImage(gameOverimg);
gameOver.visible= false
  
restart = createSprite(width/2,height/2);
restart.addImage(restartimg);
restart.visible = false

obstaclesGroup = new Group();
CloudsGroup = new Group();
 
}

function draw() {
background(bgimage)
text("Score: "+ score, 500,50);
  if(gamestate===play){
    //score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);

    if( keyDown("SPACE")&& police.y  >= height-200 ) {
      police.velocityY = -20;
      
    }
    police.velocityY = police.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    police.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(police)){
        //collidedSound.play()
        gameState = END;
    }
  }
  
  
   
 
  
    
   
  
  else if(gameState === END) {
    console.log("unhere")
    gameOver.visible = true;
    restart.visible = true;
  
     ground.velocityX = 0;
     police.velocityY = 0;
     obstaclesGroup.setVelocityXEach(0);
     CloudsGroup.setVelocityXEach(0);
     
     
 
     
     //set lifetime of the game objects so that they are never destroyed
     obstaclesGroup.setLifetimeEach(-1);
     theifsGroup.setLifetimeEach(-1);
     
     if(mousePressedOver(restart)) {
       reset();}


  
  }


 drawSprites()
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(Cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = police.depth;
    police.depth = police.depth+1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

 function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(1300,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = police.depth;
    police.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
 
  
  
  score = 0;}




