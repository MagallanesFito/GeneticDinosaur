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
const POPULATION_SIZE = 10;
const MIN_FRAME = 3;
const MAX_FRAME = 6;
const FRAME_FREQUENCY = (Math.floor(Math.random() * (MAX_FRAME - MIN_FRAME + 1) ) + MIN_FRAME)*10;
//Constants for genetic Algorithm
//percentage of individuals that goes to next generation 50% by default
const NEXT_GENERATION = 0.5;
//Mutation rate set to 5% by default
const MUTATION_RATE = 0.05;
const PERTURBATION = 0.1;

function setup(){
	createCanvas(900,450);
	obstacles = [];
	console.log("generations: "+generations.toString());
	//dinosaurs = [];
	//previous_generation = [];
	//dino = new Dinosaur();
	for(var i=0;i<POPULATION_SIZE;i++){
		dinosaurs.push(new Dinosaur());
	}
	console.log("highest fitness: "+dinosaurs[0].score);
	console.log("------------------");
	frames = 0;
}
//IF GA ISN'T WORKING PROPERLY CHANGE THIS 
function crossover(dino1,dino2){

	var newdino = new Dinosaur();
	//Crossover weights of input layer
	newdino.setW(vAlgebra.factorsum(dino1.getW(0),dino2.getW(0),0.5),0);
	//Crossover weiths of hidden layer
	newdino.setW(vAlgebra.factorsum(dino1.getW(1),dino2.getW(1),0.5),1);
	return newdino;	
}
function perturbateWeights(matrix){
	for(var i=0;i<matrix.length;i++){
		for(var j=0;j<matrix[0].length;j++){
			if(random(1) < MUTATION_RATE){
				var perturbation = Math.random() * (PERTURBATION - (-PERTURBATION)) +(-PERTURBATION);
				matrix[i][j] += perturbation;
			}
			//Generate a random perturbation [-perturbation,perturbation](change this for gaussian noise)
		}
	}
	return matrix;
}
//IF GA ISN'T WORKING PROPERLY CHANGE THIS 
function mutate(dino){
	//Mutate each weitght in matrices
	var inputMatrix = dino.getW(0);
	var hiddenMatrix = dino.getW(1);

	var inputPerturbated = perturbateWeights(inputMatrix);
	var hiddenPerturbated = perturbateWeights(hiddenMatrix);

	dino.setW(inputPerturbated,0);
	dino.setW(hiddenPerturbated,1);

	return dino;

}
/*Restart game to initial configuration and make Genetic Algorithm work*/
function restartGame(){
	generations++;
	console.log("generations: "+generations.toString());
	//Sort individuals by their fitness value 
	var sorted = previous_generation.sort((a, b) => (a.score < b.score) ? 1 : -1);
	console.log("highest fitness: "+previous_generation[0].score);
	console.log("------------------");
	//Crate new generation
	dinosaurs = [];
	var nextGenerationLength = int(previous_generation.length*NEXT_GENERATION);
	for(var i=0;i<nextGenerationLength;i++){
		dinosaurs.push(previous_generation[i]);
	}
	//console.log(dinosaurs.length);
	
	//Fill the remaining generation by picking random individuals of new generation and crossover them
	//console.log("length: "+dinosaurs.length.toString());
	while(dinosaurs.length<POPULATION_SIZE){
		//console.log("heheheh");
		var individual1= (Math.floor(Math.random() * (dinosaurs.length) ));
		var individual2= (Math.floor(Math.random() * (dinosaurs.length) ));
		var dino1 = dinosaurs[individual1];
		var dino2 = dinosaurs[individual2];
		//Make sure individuals are not the same
		while(individual2 == individual1){
			individual2= (Math.floor(Math.random() * (dinosaurs.length) ));
		}
		var newIndividual = crossover(dino1,dino2);
		var mutated = mutate(newIndividual);
		dinosaurs.push(mutated);
	}
	
	//console.log(dinosaurs);
	//noLoop();
	//setup();
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