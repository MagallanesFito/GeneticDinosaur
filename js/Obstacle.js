class Obstacle{
	constructor(groundObstacle){
		this.r = 50;
		this.x = width;
		if(groundObstacle){
			this.y = height - this.r;
		}
		else{
			this.y = height - 2*this.r;
		}
		this.passed = false;
		
	}
	move(){
		this.x -= 10;
	}
	show(){
		fill(77, 76, 75);
		rect(this.x,this.y,this.r,this.r);
	}
	collides(dino){
		//obstacle lies inside dino 
		if((this.x >= dino.x && this.x<=dino.x+dino.r) && (dino.y>=this.y && dino.y<=this.y+this.r)){
			return true;
		}
		return false;
	}
	//If obstacle lies outside screen, erase it. 
	erase(){
		if(this.x+this.r <= 0){
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