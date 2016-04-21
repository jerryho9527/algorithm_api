var count=0;
function sortUp(){
	var arr=['s','h','e','l','l','s','o','r','t','e','x','a','m','p','l','e'];
	var least=0;
	var index=0;
	var temp=0;
	for(var i=0;i<arr.length;i++){
		least=arr[i];
		index=i;
		for(var j=i+1;j<arr.length;j++){
			if(arr[j]<least){
				least=arr[j];
				index=j;
				count++;
			}
		}
		temp=arr[index];
		arr[index]=arr[i];
		arr[i]=temp;
	}
	alert(arr);
}

function sortDown(){
	var arr=['s','h','e','l','l','s','o','r','t','e','x','a','m','p','l','e'];
	var least=0;
	var index=0;
	var temp=0;
	for(var i=0;i<arr.length;i++){
		least=arr[i];
		index=i;
		for(var j=i+1;j<arr.length;j++){
			if(arr[j]>least){
				least=arr[j];
				index=j;
				count++;
			}
		}
		temp=arr[index];
		arr[index]=arr[i];
		arr[i]=temp;
	}
	alert(arr);
}
//完成选择排序需要count=48

