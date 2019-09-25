//var dino;
var obstacles;
var vAlgebra = new VectorAlgebra();

var frames;
var generations = 0;
//List of dinosaurs, defining the initial population
var dinosaurs = [];
//Stores all dead dinosaurs for genetic algorithm
var previous_generation = [];
//Define constants here
const OBSTACLE_TYPE = 0.5;
const MIN_FRAME = 3;
const MAX_FRAME = 6;
var FRAME_FREQUENCY = (Math.floor(Math.random() * (MAX_FRAME - MIN_FRAME + 1) ) + MIN_FRAME)*10;
//Constants for genetic Algorithm
const POPULATION_SIZE = 10;
const NEXT_GENERATION = 0.5;
const MUTATION_RATE = 0.05;
const PERTURBATION = 0.1;
var geneticAlgorithm = new GeneticAlgorithm(POPULATION_SIZE,NEXT_GENERATION,MUTATION_RATE,PERTURBATION);
//percentage of individuals that goes to next generation 50% by default


function setup(){
	createCanvas(900,450);
	obstacles = [];
	//Show information of first generation
	console.log("generations: "+generations.toString());
	dinosaurs = geneticAlgorithm.createPopulation();
	console.log("highest fitness: "+dinosaurs[0].score);
	console.log("------------------");
	frames = 0;
}
/*Restart game to initial configuration and make Genetic Algorithm work*/
function restartGame(){
	generations++;
	console.log("generations: "+generations.toString());
	dinosaurs = geneticAlgorithm.nextGeneration(previous_generation);
	obstacles = [];
	previous_generation = [];
	frames = 0;
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
	//Check this contition first of all
	if(dinosaurs.length == 0){
		//If all dinosaurs all dead, stop the game
		restartGame();
		//noLoop();
	}
	background(220);
	dinosaurs.forEach(function(dino){
		dino.show();
		dino.move();
	});

	if(frames % FRAME_FREQUENCY == 0){
		var obstacleGround = true;
		//Pick either ground obstacle or air obstacle randomly
		if(random(1) < OBSTACLE_TYPE){
			obstacleGround = false;
		}
		obstacles.push(new Obstacle(obstacleGround));
		//FRAME_FREQUENCY = (Math.floor(Math.random() * (MAX_FRAME - MIN_FRAME + 1) ) + MIN_FRAME)*10;
	}

	obstacles.forEach(function(obstacle,index){
		obstacle.move();
		obstacle.show();
		if(obstacle.erase()){
			obstacles.splice(index,1);
		}
		//For each dinosaur
		dinosaurs.forEach(function(dino,index){
			if(obstacle.collides(dino)){
				//if collides, kill actual dinosaur
				//Store actual dinosaur in killed dinosaurs list and then kill it
				previous_generation.push(dino);
				//Kill :(
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