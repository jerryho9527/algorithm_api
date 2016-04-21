function sortUp(){//----------算法导论4.1 最大子数组问题-------------
	var arr=[1,20,-9,3,-8,7];
	var result=find_nocross(arr,0,arr.length-1);
}

function find_cross(A,low,mid,high){
	var maxleft=0;
	var sum=0;
	var leftsum=-Infinity;
	for(var i=mid;i>=low;i--){
		sum+=A[i];
		if(sum>leftsum){
			leftsum=sum;
			maxleft=i;
		}
	}
	var maxright=0;
	sum=0;
	var rightsum=-Infinity;
	for(var i=mid+1;i<=high;i++){
		sum+=A[i];
		if(sum>rightsum){
			rightsum=sum;
			maxright=i;
		}
	}
	return[maxleft,maxright,rightsum+leftsum];
}

function find_nocross(A,low,high){
	if(low==high){
		return[low,high,A[low]];
	}else{
		var mid=Math.floor((low+high)/2);
		var left=find_nocross(A,low,mid);
		var leftlow=left[0];
		var lefthigh=left[1];
		var leftsum=left[2];
		
		var right=find_nocross(A,mid+1,high);
		var rightlow=right[0];
		var righthigh=right[1];
		var rightsum=right[2];
		
		var cross=find_cross(A,low,mid,high);
		var crosslow=cross[0];
		var crosshigh=cross[1];
		var crosssum=cross[2];
		
		if((leftsum>=rightsum)&&(leftsum>=crosssum)){
			return[leftlow,lefthigh,leftsum];
		}
		if((rightsum>=leftsum)&&(rightsum>=crosssum)){
			return[rightlow,righthigh,rightsum];
		}
		if((crosssum>=leftsum)&&(crosssum>=rightsum)){
			return[crosslow,crosshigh,crosssum];
		}
	}
	
}