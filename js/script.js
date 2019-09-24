var dino;
var obstacles = [];
var vAlgrbra = new VectorAlgebra();
function setup(){
	createCanvas(600,450);
	dino = new Dinosaur();
}
function keyPressed(){
	if(key == ' '){
		dino.jump();
	}
}
function draw(){
	if(random(1) < 0.01){
		obstacles.push(new Obstacle());
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
			noLoop();
		}
	});
}