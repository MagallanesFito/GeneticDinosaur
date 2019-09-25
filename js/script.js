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
function restartGame(){
	generations++;
	console.log("generations: "+generations.toString());
	setup();
}
/*
Get x,y coordinates of first non passed obstacle, this is used for feed neural network
*/
function getNextObstacle(){
	var index = 0;
	var vectorCoordinates = [];
	if(obstacles.length > 0){
		while(obstacles[index].isPassed() && index<obstacles.length){
			index++;
		}
		//console.log(obstacles[0].isPassed());

		vectorCoordinates.push(obstacles[index].x);
		vectorCoordinates.push(obstacles[index].y);
		//[obstacles[0].x,obstacles[0].y];
	}
	else{
		vectorCoordinates.push(width);
		vectorCoordinates.push(height-dino.r);
	}
	//console.log(vectorCoordinates);
	return vectorCoordinates;
}
function draw(){
	//networkInfo();
	background(220);
	
	dino.show();
	dino.move();

	if(frames % 30 == 0){
		var obstacleGround = true;
		//Pick either ground obstacle or air obstacle randomly
		if(random(1) < OBSTACLE_TYPE){
			obstacleGround = false;
		}
		obstacles.push(new Obstacle(obstacleGround));
		//frameFrequency = (Math.floor(Math.random() * (maxFrame - minFrame + 1) ) + minFrame)*10;
		//frames = 0;

	}

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
		//pass obstacle
		if(obstacle.x <= dino.x && !obstacle.isPassed()){
			dino.score++;
			obstacle.pass();
		}
	});

	//var vCoordinates = getNextObstacle();
	dino.think();
	//console.log(vCoordinates);
	frames++;
}