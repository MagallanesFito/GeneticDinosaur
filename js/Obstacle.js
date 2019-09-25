class Obstacle{
	constructor(groundObstacle){
		this.r = 50;
		this.height = 200;
		this.x = width;
		this.groundObstacle = groundObstacle;
		if(this.groundObstacle){
			this.y = height - this.r;
		}
		else{
			this.y = height - 2*this.r+10;
		}
		this.passed = false;
		
	}
	move(){
		this.x -= 10;
	}
	show(){
		fill(77, 76, 75);
		if(this.groundObstacle){
			rect(this.x,this.y,this.r,this.r);
		}
		else{
			rect(this.x,this.y,this.height,this.r);
		}
	}
	collides(dino){
		var obstacleHeight = this.height;
		if(this.groundObstacle){
			obstacleHeight = this.r;
		}
		return collideRectRect(this.x,this.y,obstacleHeight,this.r,dino.x,dino.y,dino.r,dino.r);
	}
	//If obstacle lies outside screen, erase it. 
	erase(){
		//Make sure the largest obstacles are erased one are off the screen
		if(this.x+this.r <= -200){
			return true;
		}
		return false;
	}
	/*Determines if a dinosaur has passed this obstacle*/
	isPassed(){
		return this.passed;
	}
	pass(){
		this.passed = true;
	}
}