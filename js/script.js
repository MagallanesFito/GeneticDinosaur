var dino;
var obstacles;
var vAlgebra = new VectorAlgebra();
var frames;
var minFrame = 3;
var maxFrame = 6;
var generations = 0;
var frameFrequency = (Math.floor(Math.random() * (maxFrame - minFrame + 1) ) + minFrame)*10;
//The arrival density of obstacles. MANAGE THIS AS A POISSON DIST LATER
var OBSTACLE_RATIO = 0.01;
var OBSTACLE_TYPE = 0.5;
function setup(){
	createCanvas(900,450);
	obstacles = [];
	dino = new Dinosaur();
	frames = 0;
}
function keyPressed(){
	//console.log(key);
	if(key == ' '){
		dino.jump();
	}
	else if (key === '(') {
		dino.down();
  	}
  	else{
  		dino.up();
  	}
}
/*function canAddNewObstacle(){
	//var newObstacle = new Obstacle();
	//The new obstacle's x position must be at least 100 px further than previous obstacles
	if(obstacles.length == 0){
		//obstacles.push(new Obstacle());
		return true;
	}
	obstacles.forEach(function(obstacle){
		if(width-(obstacle.x+obstacle.r) <300){
			console.log("jsdksd");
			return false;
			
		}
	});
	return true;
}*/
function restartGame(){
	generations++;
	console.log("generations: "+generations.toString());
	setup();
}
function draw(){
	
	if(frames % frameFrequency == 0){
		var obstacleGround = true;
		//Pick either ground obstacle or air obstacle randomly
		if(random(1) < OBSTACLE_TYPE){
			obstacleGround = false;
		}
		obstacles.push(new Obstacle(obstacleGround));
		frameFrequency = (Math.floor(Math.random() * (maxFrame - minFrame + 1) ) + minFrame)*10;
		frames = 0;

	}
	background(220);
	
	dino.show();
	dino.move();

	obstacles.forEach(function(obstacle,index){
		obstacle.move();
		obstacle.show();
		if(obstacle.erase()){
			obstacles.splice(index,1);
		}
		//If an obstacle collides dino, the game stops, CHANGE THIS FOR GENETIC ALGORITHM
		if(obstacle.collides(dino)){
			//if looses, restart the game
			//restartGame();
			noLoop();
		}
	});
	frames++;
}