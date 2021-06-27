var dog, sitDog, happyDog, deadDog, lazyDog, runRightDog, runLeftDog, nothing;
var bedroom, livingroom, washroom, garden;
var foodS, foodStock; 
var database;
var feedFood, addFood;
var fedTime, lastFed;
var foodObj;
var gameState, readState, happy;

function preload() {
  sitDog = loadImage("images/sitDog.png");
  happyDog = loadImage("images/happyDog.png");
  deadDog = loadImage("images/deadDog2.png");
  lazyDog = loadImage("images/lazyDog.png");
  runRightDog = loadImage("images/runRightDog.png");
  runLeftDog = loadImage("images/runLeftDog.png");
  nothing = loadImage("images/nothing.png");

  bedroom = loadImage("images/bedRoom.png");
  garden = loadImage("images/garden.png");
  washroom = loadImage("images/washRoom.png");
  livingroom = loadImage("images/livingRoom.png");
}

function setup() {
	createCanvas(500, 812);

  bg = createSprite(250, 406);
  bg.addImage(nothing);
  bg.addImage("garden", garden);
  bg.addImage("bedroom", bedroom);
  bg.addImage("washroom", washroom);
  bg.addImage("livingroom", livingroom);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(sitDog);
  dog.scale = 0.25;

  database = firebase.database();
  
  foodObj = new Milk();

  feedFood = createButton("Feed the Dog");
  feedFood.position(375,95);
  feedFood.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(750,95);
  addFood.mousePressed(addFoods);

  var foodStockRef = database.ref("food");
  foodStockRef.on("value", function(data){
    foodS = data.val();
  });

  readState = database.ref("gameState");
  readState.on("value", function(data){
    gameState = data.val();
  });

  fedTime = database.ref("feedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  });
}


function draw() {  
  background("#2e8b57");

  var currentTime = hour();
  if (currentTime === 0) {
    currentTime = 12;
  }

  if (currentTime%12===(lastFed%12+1)){
    update("Playing");
    bg.changeImage("garden", garden);
  }
  else if (currentTime%12===(lastFed%12+2)){
    update("Sleeping");
    bg.changeImage("bedroom", bedroom);
  }
  else if (currentTime%12===(lastFed%12+3)){
    update("Bathing");
    bg.changeImage("washroom", washroom);
  }
  else if (currentTime%12===(lastFed%12+4)){
    update("Chilling");
    bg.changeImage("livingroom", livingroom);
  }
  else {
    update("Hungry");
    foodObj.display();
  }

  if(gameState !== "Hungry"){
    feedFood.hide();
    addFood.hide();
    dog.addImage(nothing);
    happy = "no";
  }
  else if (gameState === "Hungry" && happy === "no") {
    feedFood.show();
    addFood.show();
    dog.addImage(sitDog);
  }
  
  drawSprites();

  fill(255,255,254);
  textSize(15);
  textAlign(CENTER);

  if(lastFed>=12){
    text("Last Feed: " + lastFed%12 + " PM", 250, 30);
  }else if(lastFed===0){
    text("Last Feed: 12 AM", 250, 30);
  }else{
    text("Last Feed: " + lastFed + " AM", 250, 30);
  }
}


function feedDog(){
  if (foodS > 0) {

    dog.addImage(happyDog);
    happy = "yes";

    foodS+=-1;

    database.ref("/").update({
      food: foodS,
      feedTime: hour()
    });
  }
}

function addFoods(){
  dog.addImage(sitDog);
  
  foodS++;
  
  database.ref("/").update({
    food: foodS
  });
}

function update(state){
  database.ref("/").update({
    gameState: state
  })
}
