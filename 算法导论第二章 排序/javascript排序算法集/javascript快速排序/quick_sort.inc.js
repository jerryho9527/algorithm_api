function less(a,b){
	if((a-b)>0){
		return b;
	}else{
		return a;
	}
}

function exch(A,a,b){
	var temp=0;
	temp=A[a];
	A[a]=A[b];
	A[b]=temp;
}