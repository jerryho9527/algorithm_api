//最大堆:堆顶的值总是树的最大值
function exch(A,i,j){
	var temp=A[i];
	A[i]=A[j];
	A[j]=temp;
}

function less(a,i,j){
	if(a[i]<a[j]){
		return true;
	}else{
		return false;
	}
}


//成堆操作1:当一个数从优先队列尾部加入,对其进行上浮操作,使其重新成堆

function swim(a,i){//上浮操作,从i向上将较大的元素移向上级节点
	while(i>1&&less(a,Math.floor(i/2),i)){
		exch(a,Math.floor(i/2),i);
		i=Math.floor(i/2);
	}	
}

//成堆操作2:优先队列弹出最大值,是使其根节点与最后一个节点进行交换,弹
//          出最后一个节点然后对新的根节点进行下沉操作,使其重新成堆

function sink(a,k,N){//下沉操作,从i向下将较大的元素移向上级节点
	while(2*k<=N){
		var j=2*k;
		if((j<N)&&(less(a,j,j+1))){//优先与右子节点进行交换,若右子节点小于父节点
			j++;   //再与左节点进行交换
		}
		if(!less(a,k,j)){
			break;			
		}
		exch(a,k,j);
		k=j;//将指针指向其子节点,重复操作
	}
}


var MinPQ = function(){//最小优先队列的类	
	this.Init = function(){  
		this.arr=new Array();			
	}
	this.Init();
	
	this.Insert = function(a){
		for(var i=0;i<a.length;i++){
			this.arr.push(a[i]);
		}
		var N=this.arr.length-1;
		for(var k=Math.floor(N/2);k>0;k--){//第一步:参考堆的下降操作,对其所有父节点均
			sink(this.arr,k,N);  //进行一次下沉,使数组从随机序转变成堆成序(父节点大于两个子
		}                 //节点的值)
		
		for(var i=N;i>1;i--){//第二步:分别将最大值(根节点)与最后一位节点值交换,然后将
			exch(this.arr,1,i); //数组长度减一,这样最大值就保留在当前最后一位,然后对变换后的
			i--;         //根节点进行下沉,使其重新获得堆成序,然后重复操作.
			sink(this.arr,1,i);
			i++;
		}
	}
	
	this.Pop = function(){
		if(this.arr.length==0){
			return false;
		}else{
			var a=this.arr.splice(1,1);
			return a;
		}
	}
	
	this.getSort = function(){
		return this.arr;
	}
}

