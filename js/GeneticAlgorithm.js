class GeneticAlgorithm{
	constructor(populationSize,nextGenerationRate,mutationRate,perturbationRate){
		this.populationSize = populationSize;
		this.nextGenerationRate = nextGenerationRate;
		this.mutationRate = mutationRate;
		this.perturbationRate = perturbationRate;
		//save an instance of vector algebra
		this.vAlgebraInstance = new VectorAlgebra();
	}
	createPopulation(){
		var dinosaurs = [];
		for(var i=0;i<this.populationSize;i++){
			dinosaurs.push(new Dinosaur());
		}
		return dinosaurs;
	}
	crossover(dino1,dino2){
		var newdino = new Dinosaur();
		//Crossover weights of input layer
		newdino.setW(this.vAlgebraInstance.factorsum(dino1.getW(0),dino2.getW(0),0.5),0);
		//Crossover weiths of hidden layer
		newdino.setW(this.vAlgebraInstance.factorsum(dino1.getW(1),dino2.getW(1),0.5),1);
		return newdino;	
	}
	perturbateWeights(matrix){
		for(var i=0;i<matrix.length;i++){
			for(var j=0;j<matrix[0].length;j++){
				if(random(1) < this.mutationRate){
					var perturbation = Math.random() * (this.perturbationRate - (-this.perturbationRate)) +(-this.perturbationRate);
					matrix[i][j] += perturbation;
				}
				//Generate a random perturbation [-perturbation,perturbation](change this for gaussian noise)
			}
		}
		return matrix;
	}
	 mutate(dino){
		//Mutate each weitght in matrices
		var inputMatrix = dino.getW(0);
		var hiddenMatrix = dino.getW(1);

		var inputPerturbated = this.perturbateWeights(inputMatrix);
		var hiddenPerturbated = this.perturbateWeights(hiddenMatrix);

		dino.setW(inputPerturbated,0);
		dino.setW(hiddenPerturbated,1);

		return dino;

	}
	nextGeneration(previousGeneration){
		var sorted = previousGeneration.sort((a, b) => (a.score < b.score) ? 1 : -1);
		console.log("highest fitness: "+previousGeneration[0].score);
		console.log("------------------");
		//Crate new generation
		var dinosaurs = [];
		var nextGenerationLength = int(previousGeneration.length*this.nextGenerationRate);
		for(var i=0;i<nextGenerationLength;i++){
			var actualDino = previousGeneration[i];
			actualDino.score = 0;
			dinosaurs.push(actualDino);
		}
		
		
		//Fill the remaining generation by picking random individuals of new generation and crossover them
		//console.log("length: "+dinosaurs.length.toString());
		while(dinosaurs.length<this.populationSize){
			//console.log("heheheh");
			var individual1= (Math.floor(Math.random() * (dinosaurs.length) ));
			var individual2= (Math.floor(Math.random() * (dinosaurs.length) ));
			var dino1 = dinosaurs[individual1];
			var dino2 = dinosaurs[individual2];
			//Make sure individuals are not the same
			while(individual2 == individual1){
				individual2= (Math.floor(Math.random() * (dinosaurs.length) ));
			}
			var newIndividual = this.crossover(dino1,dino2);
			var mutated = this.mutate(newIndividual);
			dinosaurs.push(mutated);
		}
		return dinosaurs;
	}
}