function guiBingPaiXu_Up(){
	var arr=[2,3,8,6,1];
	merge_sort(arr,0,arr.length-1);
	alert(arr);
}

function merge(A,p,q,r){//归并:将相邻两个数组的元素分别存在两个独立数组,按照从小到大的顺序提取
	var n1=q-p+1;       //并复制回arr相应的位置中
	var n2=r-q;
	var L=new Array(n1+1);
	var R=new Array(n2+1);
	for(var i=0;i<n1;i++){
		L[i]=A[p+i];
	}
	for(var j=0;j<n2;j++){
		R[j]=A[q+j+1];
	}
	//------使用哨兵值中止判断算法的中止------//
	L[n1]=9999;
	R[n2]=9999;
	i=0;j=0;
	for(var k=p;k<=r;k++){
		if(L[i]<=R[j]){
			A[k]=L[i];
			i++;
		}else{
			A[k]=R[j];
			j++;
		}
	}
	//----------------------------------------//
}

function merge_sort(A,left,right){
	if(left<right){//当left>=right时子序列长度为1
		var mid=Math.floor((left+right)/2);
		merge_sort(A,left,mid);//分治法,递归将大数组分解成长度至多为1的小数组,然后分别进行归并
		merge_sort(A,mid+1,right);
		merge(A,left,mid,right);
	}
	
}
//分治法三步骤
//1.分解:分解待排序的n个元素序列为各具n/2个元素的两个子序列
//2.解决:直到分解成长度为1的元素时,规模足够小,长度为1即已排好序
//3.合并:合并两个已排序的子序列