
  //creating moving background sprites
 var bg;
//creating sword variable
 var sword,swordImage;

 //creating 4 wall boundaries
 var left,up,right,down;

 // creating fruit and enemy variables
 var  fruit,fruit1, fruit1Image, fruit2, fruit2Image, fruit3, fruit3Image, 
     fruit4, fruit4Image;

 var alien1,alien1Image,alien2,alien2Image, bomb;

 // creating variables that will store the data of the random numbers
 var rand, r;
 
 //creating group variables
 var fruitg, bombg; 

 //creating score variable
 var score = 0;

 //creating variable for Game Over
 var goI;

 //creating gamestates
 var play = 1;
 var end = 2;
 var gameState = 1;

 //creating sound variables
 var knifeSound, gos;

 var rr, rl;


 
  function preload() {
    
    //loading sword image
    swordImage = loadImage("sword.png");
    
    //loading fruits and aliens images
    fruit1Image = loadImage("fruit1.png");
    fruit2Image = loadImage("fruit2.png");
    fruit3Image = loadImage("fruit3.png");
    fruit4Image = loadImage("fruit4.png");
  
    alien1Image = loadImage("alien1.png");
    alien2Image = loadImage("alien2.png"); 
    
    //loading game over image
    goI = loadImage("gameover.png");
    
    //loading the sound
    knifeSound = loadSound("knifeSwooshSound.mp3");
    gos = loadSound("gameover.mp3");
      
  }

  function setup() {
    

    
    createCanvas(600,600);
    
    //code regarding sword
    sword = createSprite(300,300,20,20);
    sword.scale = 0.85;
    
    //creating 4 walls and making them invisible
    left = createSprite(0,300,20,600);
    up = createSprite(300,0,600,20);
    right = createSprite(600,300,20,600);
    down = createSprite(300,600,600,20);
    
    left.visible = false;
    up.visible = false;
    right.visible = false
    down.visible = false;
    
    //creating the new groups
    fruitg = new Group();
    bombg = new Group();
    
  }

  function draw() {
    
    background("lightblue");
    
 //creating random number creation
  rr = Math.round(random(1,2));
  rl = Math.round(random(1,2));
    
    if (gameState === 1) {
      
      //making sword move according the the mouse and collision
      sword.x = World.mouseX;
      sword.y = World.mouseY;
      sword.addImage(swordImage);
      bombs();
      fruits(); 
      
    }
    
    if (sword.isTouching(bombg)) {
      gameState = 2;
      gos.play();
    }
    
    if (gameState === 2) {
      
      bombg.destroyEach();
      fruitg.destroyEach();
      bombg.setVelocityEach(0);
      fruitg.setVelocityEach(0);
      sword.addImage(goI);
      sword.x = 300;
      sword.y = 300;
      sword.scale = 1.5;
      textFont("Courier New")
      textSize(20);
      text("Press space to restart", 180,250);
    }
    
    if (keyDown("space")) {
      gameState = play;
    }
    
    sword.collide(left);
    sword.collide(up);
    sword.collide(right);
    sword.collide(down);

    drawSprites();
    
    //making text score appear on the screen
    textSize(15);
    fill("black");
    textFont("Courier New");
    text("Score:" + score,10,15);
    
    
    //Making the score dynamic
    
    if (sword.isTouching(fruitg)) {
      fruitg.destroyEach();
      score = score + 2;
      knifeSound.play();
    }
    
  }
 
  function fruits() {
    
   if (World.frameCount%50 === 0) {
     fruit = createSprite(600,250,20,20);
     rand = Math.round(random(1,4));
     fruit.scale = 0.25
     
     if (rand === 1) {
       fruit.addImage(fruit1Image);
     } else if (rand === 2) {
       fruit.addImage(fruit2Image);
     } else if (rand === 3) {
       fruit.addImage(fruit3Image);
     } else if (rand === 4) {
       fruit.addImage(fruit4Image);
     }
     
     fruit.y = Math.round(random(25,575));
     //console.log(fruit.y);
     fruit.velocityX = -(10 + score/5);
     fruit.lifetime = 60;  
     fruitg.add(fruit);
     //console.log(fruit.velocityX);
     
     if (rr === 1) {
       fruit.x = 600;
     } else if (rr ===2) {
       fruit.x = 15;
       fruit.velocityX = 10 + score/5;      
     }

   }  
    
  }

  function bombs() {
    
    if (World.frameCount%150 ===0) {
      bomb = createSprite(600,sword.y,20,20);
      r = Math.round(random(1,2));
      
      if (r === 1) {
        bomb.addImage(alien1Image);
      } else if (r === 2) {
        bomb.addImage(alien2Image);
      }
      bomb.velocityX = -(13 + score/7.5);
      bomb.lifetime =  47;
      bombg.add(bomb);
      //console.log(bomb.velocityX);
      
      if (rl === 1) {
        bomb.x = 600;
      } else if (rl === 2) {
        bomb.x = 0;
        bomb.velocityX = 13 + score/7.5
      }
    }  
    
  }
