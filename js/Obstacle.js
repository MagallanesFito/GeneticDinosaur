class Obstacle{
	constructor(){
		this.r = 100;
		this.x = width;
		this.y = height - this.r;
		this.height = 30;
	}
	move(){
		this.x -= 10;
	}
	show(){
		rect(this.x,this.y,this.height,this.r);
	}
	collides(dino){
		//obstacle lies inside dino CHANGE 15 LATER
		if(this.x >= dino.x && this.x<=dino.x+dino.r && dino.y+dino.r >= this.y+15){
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
}