                            //Monkey Go Happy!!!
//Creating space
var monkey , monkey_running
var banana ,bananaImage, obstacles, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var bg,bgImage;
var survivalTime=0;
var eatenbananas=0;
var burp,monkeysound,collidingsound;
var reset,resetImage
gameState="play";
function preload(){
  
    //loadinf the imgs
     monkey_running =                     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana1.png");
    obstacleImage = loadImage("rock1.png");
    bgImage=loadImage("header banana palm.jpg");
    monkeysound=loadSound("monkeypatas.mp3");
    collidingsound = loadSound("monkey1.mp3");
    resetImage=loadImage("reset1.png");
  }


//setting up
function setup() {
    
  createCanvas(600,400);
  ground = createSprite(600,400,0,0);
  ground.visible = false;
  bg=createSprite(200,200,400,400)
  bg.addImage("white",bgImage)
  bg.scale=1.2;
  bg.velocityX=-4;
  monkey=createSprite(80,400,20,20);
  monkey.addAnimation("sahasra",monkey_running);
  monkey.scale=0.2;
  bananaGroup=new Group();
  obstaclesGroup=new Group();
  reset=createSprite(320,200,20,20);
  reset.addImage("sxs",resetImage);
  reset.visible=false;
  reset.scale=0.4;
}


function draw() {
  
background("white");
  //infinite ground
  if(ground.x<100){
    ground.x=ground.width/2;
  }
  //if "space" is pressed
  if(keyDown("space")&&monkey.y>100&&gameState==="play") {
    monkey.velocityY = -12;
   monkeysound.play();
  }
  //infinite bg
  if(bg.x<100){
    bg.x=200
  }
  //adding gravity
  monkey.velocityY=monkey.velocityY+0.8;
  //colliding the monkey off the ground
  monkey.collide(ground)
  //calling the functions to repeat again and again
  spawnbananas();
  spawnObstacles();
   //incrementation of score,no.of bananas eaten  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score+100;
    eatenbananas=eatenbananas+1;
  }
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  if(monkey.isTouching(obstaclesGroup)){
    gameState="end";
    collidingsound.play();
  }
  if(gameState==="end"){
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    bg.velocityX=0;
    if(gameState==="end"&&keyDown("space")){
      monkey.y=280;
    }
    score=0;
    eatenbananas=0;
  }
  if(gameState==="end"){
    reset.visible=true;
  }
  if(gameState==="end"&&mousePressedOver(reset)){
    gameState="play";
    reset.visible=false;
    bg.velocityX=-4;
  }
  if(monkey.y>280){
    monkey.y=280;
  }
 
  drawSprites();
  //displaying score,survival time and eaten bananas
  fill("brown");
  textSize(20);
  text("Your Score:"+score,250,30);
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SurvivalTime:"+survivalTime,250,50);
  text("No.of bananas eaten:"+eatenbananas,250,70);
}
//making the bananas appear at random Y positions
function spawnbananas(){
  if(World.frameCount%80===0){ 
    banana=createSprite(600,200,20,20);
    banana.scale=0.15;
   
    r=Math.round(random(1,4)); 

    if(r == 1) {
      banana.addImage(bananaImage);
    } 
    else if (r == 2){
      banana.addImage(bananaImage)
    } 
    else if (r == 3){
      banana.addImage(bananaImage)
    } 
    else if (r == 4){
      banana.addImage(bananaImage)
    }

    banana.y=Math.round(random(150,200))
    bananaGroup.add(banana); 
    banana.velocityX=-(5+score/100);
    banana.lifetime=200;
}

}
//doing the same for the obstacles
function spawnObstacles()
{
  if(World.frameCount%200===0){ 
    obstacles=createSprite(600,200,20,20);
    obstacles.scale=0.18;
    obstacles.addImage(obstacleImage);
   

    obstacles.y=Math.round(random(280,300))
    obstaclesGroup.add(obstacles); 
    obstacles.velocityX=-(5+score/100);
    obstacles.lifetime=200;
  }

}
                    //The end!!!