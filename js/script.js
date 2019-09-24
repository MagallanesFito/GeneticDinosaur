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

	for(var i=0;i<obstacles.length;i++){
		obstacles[i].move();
		obstacles[i].show();
	}
}