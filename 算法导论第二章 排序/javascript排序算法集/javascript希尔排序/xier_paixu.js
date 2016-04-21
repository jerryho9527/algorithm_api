var count=0;
function sortUp(){//----------<<算法>>希尔排序-------------
	var a=['s','h','e','l','l','s','o','r','t','e','x','a','m','p','l','e'];
	var n=a.length;
	var h=1;
	while(h<n/3){
		h=3*h+1; //注:该h的递增序列选择并不固定,但以此递增序列 1,4,13,.... 为佳
	}
	while(h>=1){
		for(var i=h;i<n;i++){
			for(var j=i;j>=h;j=j-h){
				if(a[j-h]>a[j]){					
					exch(a,j,j-h);
					count++;
				}
			}
		}
		h=Math.floor(h/3);
	}	
}
//完成希尔排序需要count=35

