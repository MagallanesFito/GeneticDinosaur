class Obstacle{
	constructor(){
		this.r = 100;
		this.x = width;
		this.y = height - this.r;
	}
	move(){
		this.x -= 10;
	}
	show(){
		rect(this.x,this.y,30,this.r);
	}
}