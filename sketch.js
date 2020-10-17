var dog,happydog,foodS, database;
var foodstock;
var dogImg;
var feed,addfood;
var fedTime,lastFed;

function preload(){

dogImg=loadImage("dogImg.png");
doghappy=loadImage("dogImg1.png");
//milk=loadImage("Milk.png");
}

function setup(){

  database = firebase.database();
  console.log(database);
 
  createCanvas(1000,400);

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
   dog.scale=0.15;

  var foodstock = database.ref('food');
  foodstock.on("value", readStock);

  foodobj=new Food();

  feed = createButton('Feed the dog');
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addfood  = createButton('Add the Food');
  addfood.position(800, 95);
addfood.mousePressed(addFood);
}

function draw(){
  background(46,139,87);

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("playing");
    foodobj.garden();
  }else if(currentTime==(lastFed+2)){
    update("sleeping");
    foodobj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime <=(lastFed+4)){
    update("bathing");
    foodobj.washroom();
  } else{
    update("hungry")
    foodobj.display();
  }
  
fedTime=database.ref('lastFed');
fedTime.on("value",function(data){
lastFed=data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("last Feed : "+ lastFed % 12+"PM",350,30);
}else if(lastFed==0){
  text("last Feed : 12 PM",350,30);
}else{
  text("last Feed : "+ lastFed +"AM",350,30);
}

drawSprites();

}

function readStock(data){
foodS=data.val();
foodobj.updateFoodStock(foodS)
}

function addFood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function feedDog(){
  dog.addImage(doghappy);

  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodobj.getFoodStock(),
    fedTime:hour()
  })
}
