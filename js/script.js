//var dino;
var obstacles;
var vAlgebra = new VectorAlgebra();
var frames;
var generations = 0;
//List of dinosaurs, defining the initial population
var dinosaurs = [];
//Define constants here
const OBSTACLE_TYPE = 0.5;
const POPULATION_SIZE = 10;
const MIN_FRAME = 3;
const MAX_FRAME = 6;
const FRAME_FREQUENCY = (Math.floor(Math.random() * (MAX_FRAME - MIN_FRAME + 1) ) + MIN_FRAME)*10;


function setup(){
	createCanvas(900,450);
	obstacles = [];
	//dino = new Dinosaur();
	for(var i=0;i<POPULATION_SIZE;i++){
		dinosaurs.push(new Dinosaur());
	}
	frames = 0;
}
function restartGame(){
	generations++;
	console.log("generations: "+generations.toString());
	setup();
}
/*
only for testing
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
*/
function draw(){
	background(220);
	//Check this contition first of all
	if(dinosaurs.length == 0){
		//If all dinosaurs all dead, stop the game
		//restartGame();
		noLoop();
	}
	dinosaurs.forEach(function(dino){
		dino.show();
		dino.move();
	});

	if(frames % 30 == 0){
		var obstacleGround = true;
		//Pick either ground obstacle or air obstacle randomly
		if(random(1) < OBSTACLE_TYPE){
			obstacleGround = false;
		}
		obstacles.push(new Obstacle(obstacleGround));
	}

	obstacles.forEach(function(obstacle,index){
		obstacle.move();
		obstacle.show();
		if(obstacle.erase()){
			obstacles.splice(index,1);
		}
		//For each dinosaur
		dinosaurs.forEach(function(dino,index){
			//If an obstacle collides dino, the game stops, CHANGE THIS FOR GENETIC ALGORITHM
			if(obstacle.collides(dino)){
				//if looses, kill actual dinosaur
				dinosaurs.splice(index,1);
			}
			//pass obstacle
			if(obstacle.x <= dino.x && !obstacle.isPassed()){
				dino.score++;
				obstacle.pass();
			}
		});
	});

	/*
	Let AI make its job
	*/
	dinosaurs.forEach(function(dino){
			dino.think();
	});
	frames++;
}