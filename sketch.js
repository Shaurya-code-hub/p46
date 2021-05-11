  var bg;
  var Indian_soldier;
  var knife;
  var enemy, enemy2;
  var boss;
  var bullet;
  var bulletImg;
  var bulletSound;
  var enemyGroup;
  var deathSound;
  

function preload(){
  bg = loadImage("images/BG4.jpg");
  Indian_soldierImg = loadImage("images/Indian soldier.png");
  enemyImg = loadImage("images/enemy.png");
  enemy2Img= loadImage("images/enemy2-removebg-preview.png");
  boss = loadImage("images/boss.jfif");
 
  bulletSound = loadSound("sound/Bullet.mp3");
  bulletImg = loadImage("images/bullet1.png");

  deathSound = loadSound("sound/death.mp3");
}

function setup() {
  createCanvas(displayWidth, displayHeight - 120);

  Indian_soldier = createSprite(40,250,20,20);
  Indian_soldier.addImage(Indian_soldierImg);
  Indian_soldier.scale = 0.3;

  enemyGroup = new Group(); 
}


function draw() {
  background(bg);  
 
  if(Indian_soldier.y > 0 && keyDown ("up_arrow")){
   Indian_soldier.y = Indian_soldier.y - 8;
  }

  if(Indian_soldier.y < displayHeight - 120 && keyDown ("down_arrow")){
    Indian_soldier.y = Indian_soldier.y + 8;  
  }
   
  if(Indian_soldier.x < displayWidth/4 && keyDown ("right_arrow")){
    Indian_soldier.x = Indian_soldier.x + 8;  
  }

  if(Indian_soldier.x > 0 ){
    if(keyDown ("left_arrow")){
      Indian_soldier.x = Indian_soldier.x - 8; 
    }
  }

  spawnEnemy();

   drawSprites();


   if(keyWentDown("space")){
    spawnBullet();
    
    }

    
}

function spawnEnemy(){
  if(frameCount % 80 === 0 ){
    enemy = createSprite(displayWidth, Math.round(random(10,displayHeight - 150)));
    enemy.velocityX = -18;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: enemy.addImage(enemyImg);
              enemy.scale = 0.3;
              break;
      case 2: enemy.addImage(enemy2Img);
              enemy.scale = 0.3;
              break;
    }
    //enemy.debug = true;
    enemy.setCollider("rectangle", 0, 0, 390, 390);
    enemyGroup.add(enemy);          
  }

  if(enemyGroup.isTouching(bullet)){
    console.log("aaa");
    enemyGroup.destroyEach();
    bullet.destroy();
    deathSound.play();
  }
}

function spawnBullet(){
  bullet = createSprite(Indian_soldier.x, Indian_soldier.y,20,5);
  bullet.addImage(bulletImg);
 //bullet.debug = true;
  bullet.setCollider("rectangle", 0, 0, 100, 20);
  bullet.scale = 0.2;
  bullet.velocityX = 20;
  // bullet.shapeColor = "	#FFFF00"

  bulletSound.play();
  
  
}

