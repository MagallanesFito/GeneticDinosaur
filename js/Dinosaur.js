class Dinosaur{
	constructor(){
		this.r = 50;
		this.x = this.r;
		this.y = height - this.r;
		this.vy = 0;
		this.gravity  = 2;
	}
	show(){
		fill(77, 76, 75);
		rect(this.x,this.y,this.r,this.r);
	}
	jump(){
		if(this.y == height - this.r){
			this.vy = -30;
		}
	}
	move(){
		this.y += this.vy;
		this.vy += this.gravity;
		this.y = constrain(this.y,0,height-this.r);
	}
}