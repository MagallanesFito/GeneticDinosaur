class NeuralNetwork{
	constructor(inputNodes,hiddenNodes,outputNodes){
		this.x = inputNodes;
		this.h = hiddenNodes;
		this.y = outputNodes;
		/*
		Both weight matrices are initialized random
		*/
		this.algebraInstance = new VectorAlgebra();
		//INCORPORATE VALGEBRA CLASS LATER
		this.w1 = this.algebraInstance.createMatrix(this.x,this.h,null);
		this.w2 = this.algebraInstance.createMatrix(this.h,this.y,null);
	}
	sigmoid(x){
		return 1/(1+exp(-x));
	}
	//for testing
	getW1(){
		return this.w1;
	}
	getW2(){
		return this.w2;
	}
	//-------------------
	/*Make weighted matrix multplication between previous and current layers and apply activation function*/
	operate(inputVector,nextSize,w){
		//Create resulting vector of 0's
		var newVector =  this.algebraInstance.createVector(nextSize,0);
		for(var i=0;i<newVector.length;i++){
			var weightedSum = 0;
			for(var j=0;j<inputVector.length;j++){
				weightedSum += (w[j][i]*inputVector[j]);
			}
			newVector[i] = this.sigmoid(weightedSum);
		}
		return newVector;
	}
	//Receives the x,y location of next obstacle and predicts whether up,down,jump
	predict(invector){
		//var inVector = [x,y];
		var hiddenVector = this.operate(invector,this.h,this.w1);
		var outputVector = this.operate(hiddenVector,this.y,this.w2);

		/*decide whether
		0 up
		1 down
		2 jump
		as the max value of output vector
		*/
		var maxOutput = 0;
		if(outputVector[1] > outputVector[maxOutput]) maxOutput = 1;
		if(outputVector[2] > outputVector[maxOutput]) maxOutput = 2;
		return maxOutput;
		
	}

}