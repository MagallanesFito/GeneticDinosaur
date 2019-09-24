class NeuralNetwork{
	constructor(inputNodes,outputNodes,hiddenNodes){
		this.x = inputNodes;
		this.h = hiddenNodes;
		this.y = outputNodes;
		/*
		Both weight matrices are initialized random
		*/
		this.w1 = vAlgebra.createMatrix(this.x.length,this.h.length,null);
		this.w2 = vAlgebra.createMatrix(this.h.length,this.y.length,null);
	}
	sigmoid(x){
		return 1/(1+exp(-x));
	}
}