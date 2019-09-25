/*
This class implements a series of 
Vector/Matrices operations
*/
class VectorAlgebra{
	constructor(){
		//this.links = links;
	}
	//Creates a mxn matrix.
	createMatrix(m,n,initValue){
		var matrix = [];
		for(var i=0; i<m; i++) {
		    matrix[i] = [];
		    for(var j=0; j<n; j++) {
		    	//if initValue == null matrix[i][j] = random value between -1,1 (not integer)
		        matrix[i][j] = ((initValue ==null) ? Math.random() * (1 - (-1)) +(-1) 
     : initValue);
		    }
		}
		return matrix;
	}
	/*
	params: 
		initValue: if this parameter is null, each element will be set random
	*/
	createVector(size,initValue){
		var vector= [];
		for(var i=0;i<size;i++){
			vector[i] = ((initValue ==null) ? Math.random() : initValue);
		}
		return vector;
	}
	/*
	Calculate p-norm of the vector v 
	*/
	norm(v,p){
		var sum = 0;
		for(var i=0;i<v.length;i++){
			var abs = Math.abs(v[i]);
			sum = sum + Math.pow(abs,p);
		}
		sum = Math.pow(sum,1/p);
		return sum;
	}
	/*
	params:
		v1 is expected to be a nxn matrix 
		v2 is expected to be a column vector
	*/
	multiply(v1,v2){
		var v_new =[];
		var curr_sum;
		for(var i=0;i<this.links;i++){
			curr_sum = 0;
			for(var j=0;j<this.links;j++){
				curr_sum+=(v1[i][j]*v2[j]);
			}
			v_new[i] = curr_sum;
		}
		return v_new;
	}
	/*
	Perform element-wise operation beweeen scalar and vector
	params:
		v is a column vector
		scalar is a real number
		operation is a string indicating the type of operation that will be performed: 
			"sum", "dif", "prod", "div"
	*/
	operateScalar(v,scalar,operation){
		var v_new = [];
		for(var i=0;i<this.links;i++){
			if(operation == "sum"){
				v_new[i] = v[i] + scalar;
			}
			else if(operation == "dif"){
				v_new[i] = v[i] - scalar;
			}
			else if(operation == "prod"){
				v_new[i] = v[i] * scalar;
			}
			else if(operation == "div"){
				v_new[i] = v[i] / scalar;
			}
		}
		return v_new;
	}
	//Calculate factor sum alpha*sum(w_i+w_i')
	factorsum(w1,w2,alpha){
		//Both matrices has the same dimensions
		var m = w1.length;
		var n = w1[0].length;
		var newMartix = this.createMatrix(m,n,0);
		for(var i=0;i<m;i++){
			for(var j=0;j<n;j++){
				newMartix[i][j] = alpha*(w1[i][j]+w2[i][j]);
			}
		}
		return newMartix;
	}
	/*
	Perform element-wise operation between two vectors. 
	v1,v2 are two vectors of the same size
	operation is a string indicating the type of operation that will be performed: 
			"sum", "dif", "prod", "div"
	*/
	operateVector(v1,v2,operation){
		var v_new = [];
		for(var i=0;i<this.links;i++){
			if(operation == "sum"){
				v_new[i] = v1[i] + v2[i];
			}
			else if(operation == "dif"){
				v_new[i] = v1[i] - v2[i];
			}
			else if(operation == "prod"){
				v_new[i] = v1[i] * v2[i];
			}
			else if(operation == "div"){
				v_new[i] = v1[i] / v2[i];
			}
		}
		return v_new;
	}
}