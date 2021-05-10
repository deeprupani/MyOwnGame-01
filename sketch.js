var player, playerImage;
var backgroundImage, Background;
var pickaxe, pickaxeGroup, pickaxeImage;
var gameState = "STORY"
var spaceCount = 0
var monkeyImage, monkeyGroup;
var Score = 0;
var HP = 2;
var wolf, wolfImage, wolfGroup;
var berry, berryImage, berryGroup;

function preload() {
  playerImage = loadImage("Images/player1.png");
  backgroundImage = loadImage("Images/jungle.jpg");
  pickaxeImage = loadImage("Images/pickaxe1.png")
  monkeyImage = loadImage("Images/Monkey.png")
  wolfImage = loadImage("Images/wolf.png");
  berryImage=loadImage("Images/berry.png");
}

function setup() {
  createCanvas(1000, 400);

  pickaxeGroup = new Group();
  monkeyGroup = new Group();
  wolfGroup = new Group();
  berryGroup = new Group();

  Background = createSprite(0, 0);
  Background.addImage(backgroundImage);
  Background.scale = 1.5
  Background.velocityX = -5;
  Background.visible = false;

  player = createSprite(100, 200, 50, 50);
  player.addImage(playerImage);
  player.scale = 0.4
  player.visible = false;
  
}

function draw() {
  background(255, 255, 255);

  if (spaceCount === 0) {
    gameState = "TIPS"
  }

  if (gameState === "TIPS") {
    background(0);

    drawSprites();
    textSize(32)
    fill("red")
    text("Crio's Great Rescue", 300, 50);
    text("Collect Jellies to Stay Alive", 200, 100);
    text("Stay away from the Monkeys", 200, 150);
    text("Collect The Power Ups for a Special Ability", 200, 200);
    text("Fight Bosses at the end of each level", 200, 250);
    text("What  are you waiting for ,GO RESCUE CRIO!!", 200, 300);

    textSize(18);
    fill("blue");
    text("Press Space  key to Start the Game", 650, 50)


    /*textSize(24);
    fill("yellow");
    text("Jepx and Crionel lived in the ancient city of Cloudina ",200,50)
    text("They were the best of friends and loved playing with each other",200,100)
    text("One day,they went to a a river which was close to a dense forest",200,150)
    text("While they were playing , a pack of wolves appeared out of the forest ",200,200)
    text("The leader of the pack came close to Crionel,who was crying because she was scared",200,250)
    text("the wolves picked her up and took her away,while Jepx stood there in utter shock",200,300)
    text("After the wolves left,Jepx became full of determination to find Crionel",200,350)
    text("And thus began Crionels Great Rescue",200,395)*/

    if (keyCode === 32) {
      gameState = "PLAY"
      //drawSprites();
    }
  }

  if (gameState === "PLAY") {
    background(0);

    Background.visible = true;
    player.visible = true;
    

    if (frameCount % 60 === 0) {
      var monkey = createSprite(100, 200, 30, 30);
      monkey.x = Math.round(random(800, 950))
      monkey.y = Math.round(random(50, 260));
      monkey.addImage(monkeyImage);
      monkey.scale = 0.4
      monkey.velocityX = -5
      monkey.lifetime = 130
      monkeyGroup.add(monkey)
    }

    if (frameCount % 150 === 0) {
      var wolf = createSprite(100, 200, 30, 30);
      wolf.x = Math.round(random(800, 950))
      wolf.y = Math.round(random(50, 260));
      wolf.addImage(wolfImage);
      wolf.scale = 0.4
      wolf.velocityX = -8
      wolf.lifetime = 130
      wolfGroup.add(wolf)
    }

    if (frameCount % 300 === 0) {
      var berry = createSprite(100, 200, 30, 30);
      berry.x = Math.round(random(500, 700))
      berry.y = Math.round(random(50, 260));
      berry.addImage(berryImage);
      berry.scale = 0.2
     berry.velocityX = -2
      berry.lifetime = 110
      berryGroup.add(berry)
    }

    if (Background.x < 400) {
      Background.x = width / 2
      Background.x = Background.width / 2;
    }

    if (Background.velocityX === -5) {
      player.x = World.mouseX;
      player.y = World.mouseY;
      Score++
    }

    if(HP===0){
      reset();
    }

    if (keyDown("SPACE")) {
      createPickaxes();
    }

    if (pickaxeGroup.isTouching(monkeyGroup)) {
      monkeyGroup.destroyEach();
    }

    if (pickaxeGroup.isTouching(wolfGroup)) {
      wolfGroup.destroyEach();
    }

    if (pickaxeGroup.isTouching(berryGroup)) {
      berryGroup.destroyEach();
      HP=HP+3;
    }

    if (wolfGroup.isTouching(player)) {
      HP = HP - 2
      wolfGroup.destroyEach();
    }

    if (monkeyGroup.isTouching(player)) {
      Score = 0
      monkeyGroup.destroyEach();
    }

    drawSprites();

    fill("yellow")
    text("Score:" + Score, 700, 50)
    text("HP:" + HP, 550, 50)
  }
}

function createPickaxes() {
  pickaxe = createSprite(player.x, player.y, 30, 50);
  pickaxe.addImage(pickaxeImage);
  pickaxe.velocityX = 6;
  pickaxe.scale = 0.2;
  pickaxe.lifetime = 100;
  pickaxeGroup.add(pickaxe);

}

function reset(){
  background(0);
  wolfGroup.destroyEach();
  berryGroup.destroyEach();
  monkeyGroup.destroyEach();
  player.destroy();
  pickaxeGroup.destroyEach();
  Background.visible=false;
  HP.visible=false;
 Score.visible=false;

  textSize(48);
  fill("red");
  text("You Lose",500,150)
  
}