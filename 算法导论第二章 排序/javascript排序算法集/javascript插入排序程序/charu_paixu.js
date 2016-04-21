var count=0;
function chaRuPaiXu_Up(){
	var arr=['s','h','e','l','l','s','o','r','t','e','x','a','m','p','l','e'];
	for(var i=1;i<arr.length;i++){//循环不变式为i左侧的arr[0,...,i-1]的已排序数组
		var key=arr[i];
		var j=i-1;
		while((j>=0)&&(arr[j]>key)){//将当前i的值按顺序插入至arr[0,...,i-1]的已排序数组中
			exch(arr,j,j+1);
			j--;
		}
	}
}

function chaRuPaiXu_Down(){
	var arr=['s','h','e','l','l','s','o','r','t','e','x','a','m','p','l','e'];
	for(var i=1;i<arr.length;i++){//循环不变式为i左侧的arr[0,...,i-1]的已排序数组
		var key=arr[i];
		var j=i-1;
		while((j>=0)&&(arr[j]<key)){//将当前i的值按顺序插入至arr[0,...,i-1]的已排序数组中
			exch(arr,j,j+1);
			j--;
		}
	}
	alert(arr);
}

function exch(a,i,j){
	var temp=0;
	temp=a[i];
	a[i]=a[j];
	a[j]=temp;
}
//循环不变式的证明
//1.初始化:当i=1时,左侧只有arr[0]一个值,已排序为真
//2.保持:当i增长,左侧的数组总是已排序,依然为真
//3.终止:当i=arr.length时,左侧为arr[0,....arr.length]的全数组,并且已排序,得证