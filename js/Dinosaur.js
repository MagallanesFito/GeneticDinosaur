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
}