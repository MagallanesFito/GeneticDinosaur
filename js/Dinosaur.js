class Dinosaur{
	constructor(){
		this.r = 50;
		this.x = this.r;
		this.y = height - this.r;
		this.vy = 0;
		this.gravity  = 2;
		this.score = 0;
		//A neural network with two inputs, 3 hidden layers and 3 output layers
		this.brain = new NeuralNetwork(2,3,3);
	}
	show(){
		//fill(77, 76, 75);
		fill(227, 65, 11);
		rect(this.x,this.y,50,this.r);
	}
	onGround(){
		return this.y == height - this.r;
	}
	jump(){
		if(this.onGround()){
			this.vy = -30;
		}
	}
	move(){
		this.y += this.vy;
		this.vy += this.gravity;
		this.y = constrain(this.y,0,height-this.r);
	}
	
	down(){
		if(this.onGround()){
			this.r = 25;
			this.y = height - this.r/2;
		}
		
	}
	up(){
		if(this.onGround()){
			this.r = 50;
			this.y = height - this.r;
		}
	}
	/*
	Get x,y coordinates of first non passed obstacle, this is used for feed neural network
	*/
	getNextObstacle(){
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
	think(){
		var inputvector = this.getNextObstacle();
		var result = this.brain.predict(inputvector);

		//given result, decide which action perform
		if(result == 0){
			//console.log("up");
			this.up();
		}
		else if(result == 1){
			//console.log("down");
			this.down();
		}
		else if(result == 2){
			//console.log("jump");
			this.jump();
		}

	}
}