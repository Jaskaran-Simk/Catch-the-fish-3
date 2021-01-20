var backgroundIMG;
var fisherman,fishermanIMG;
var river,rockImg;
var fishmed,fishsmall,fishbig;
var sharkImg;
var needleTip;
var smallFishGroup,bigFishGroup,medFishGroup,rockGroup,sharkGroup;
var score = 0;
var loseSound,winSound,gameOver;

function preload()
{
	backgroundIMG = loadImage("background.jpeg")
	fishermanIMG = loadImage("images/fisherman.png")
	fishmed = loadImage("images/Fishes/meduim fish.png")
	fishsmall = loadImage("images/Fishes/small fish.png")
	fishbig = loadImage("images/Fishes/bigfish.png")
	sharkImg = loadImage("images/shark.png")
	rockImg = loadImage("images/rock.png")
	loseSound = loadSound("sounds/lose.mp3")
	winSound = loadSound("sounds/win.mp3")
	gameOver = loadSound("sounds/gameOver.mp3")

}

function setup() {
	createCanvas(1000, 600);

	fisherman = createSprite(200,430,50,50)
	fisherman.addImage("fisher",fishermanIMG)
	// river = createSprite()
	
	needleTip = createSprite(fisherman.x+170,fisherman.y-51,3,50)
	smallFishGroup = new Group();
	bigFishGroup = new Group();
	medFishGroup = new Group();
	sharkGroup = new Group();
    rockGroup = new Group();
}


function draw() {  
	background("white");	
	image(backgroundIMG, 0, 0, 5000 + fisherman.x, 600);

	fisherManMovement();
	randomfish();
	randomRock();
	randomAnimal();

	needleTip.x = fisherman.x+170
	needleTip.y = fisherman.y-51
	camera.position.x = fisherman.x;

	if(rockGroup.isTouching(fisherman)){
		score=score - 50
		rockGroup.destroyEach();
		loseSound.play();
	}

	catchFish();
    textSize(32)
	fill("black")
	textFont("Agency FB")
	text("Score : " + score, camera.position.x, 100);
    
	drawSprites();
	
 
}

function catchFish() {

	var checkCatch = function(fishGroup, fishSize) {
		var points;
		switch(fishSize) {
			case "small" :
				points = 10;
				
				break;
			case "medium" :
				points = 20;
			
				break;
			case "big" :
				points = 30;
				
				break;	

		}
		if(needleTip.isTouching(fishGroup)) {
			for(var i = 0; i < fishGroup.length; i++) {
				var fish = fishGroup.get(i);
				if(needleTip.isTouching(fish)) {
					fish.destroy();
					score += points;
					winSound.play();
				}
			}
		}
	}

	checkCatch(smallFishGroup, "small");
	checkCatch(medFishGroup, "medium");
	checkCatch(bigFishGroup, "big");

	// if (needleTip.isTouching(smallFishGroup)){
	// 	score = score + 10
		
	// }

	


	
}

function fisherManMovement(){
	if(keyDown(UP_ARROW)){
		fisherman.y = fisherman.y - 5;
	}

	if(keyDown(DOWN_ARROW)){
		fisherman.y = fisherman.y + 5;
	}

	if(keyDown(LEFT_ARROW)){
		fisherman.x = fisherman.x - 5;
	}

	if(keyDown(RIGHT_ARROW)){
		fisherman.x = fisherman.x + 5;
	}
}




function randomfish() {
	if(frameCount % 60 === 0) {
		var fish = createSprite(random(4000,5000),random(300,500),10,40);
	  	fish.velocityX = -4;
	  
	  	//generate random obstacles
	  	var rand = Math.round(random(1,3))
	  	switch(rand){
			case 1:
				fish.addImage(fishsmall);
				
				smallFishGroup.add(fish);	
				fish.setCollider("rectangle",-50,0,200,100)	
				break;
			
			case 2: 		  
				fish.addImage(fishmed);
				medFishGroup.add(fish);		  
				break;
			
			case 3 :		  
				fish.addImage(fishbig);
				bigFishGroup.add(fish);	
				break;
			
			default :		  
				break;
		}

	  	//assign scale and lifetime to the obstacle           
	  	fish.scale = 0.5;
		fish.lifetime = 1000;
		fish.debug = true;
	}
}

function randomRock(){
  if(frameCount % 400 === 0) {
	var rock = createSprite(random(4000,5000),random(300,500),10,40);
	rock.velocityX = -3;
	rock.addImage(rockImg)
	
	rockGroup.add(rock)
	//assign scale and lifetime to the obstacle           
	rock.scale = 0.35;
	rock.lifetime = 1000;


  }

}
  function randomAnimal(){
	if(frameCount % 560 === 0) {
	  var animal = createSprite(random(2000,3000),random(300,500),10,40);
	  animal.velocityX = -3;
	  animal.addImage(sharkImg)
	  
	  sharkGroup.add(animal)
	  
	  //assign scale and lifetime to the obstacle           
	  animal.scale = 0.8;
	  animal.lifetime = 1000;

	
	}

  }