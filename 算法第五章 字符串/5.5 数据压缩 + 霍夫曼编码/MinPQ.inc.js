//最小堆:堆顶的值总是树的weight值的最小值
////本文件为加权边所特化,优先队列扩展为Edge类型 添加了 v,w,weight,该值为边的两个顶点,与边的权重值

//--------------------------------单字最小优先队列api--------------------------------//
var MinPQ = function(){//最小优先队列的类	
	this.Init = function(){  
		this.arr=[0];			
	}
	this.Init();
	
	this.Insert = function(graph){
		for(var i=0;i<graph.length;i++){
			var a=new Edge(graph[i].v,graph[i].w,graph[i].weight);
			this.arr.push(a);
		}
		var N=this.arr.length-1;
		for(var k=Math.floor(N/2);k>0;k--){//第一步:参考堆的下降操作,对其所有父节点均
			sink_2(this.arr,k,N);  //进行一次下沉,使数组从随机序转变成堆成序(父节点大于两个子节点的值)
		}//至此,堆为最小堆
	}
	
	this.delMin = function(){
		if(this.arr.length==0){
			return false;
		}else{
			var a=this.arr.splice(1,1);
			return a[0];
		}
	}
	
	this.getSort = function(){
		return this.arr;
	}
	
	this.isEmpty = function(){
		if(this.arr.length<=1){
			return true;
		}else if(this.arr.length>1){
			return false;
		}
	}
}



//---------------------------带索引的最小优先队列api--------------------------------//
var IndexMinPQ = function(){//带索引最小优先队列的类	
	this.Init = function(){  
		this.arr=new Array();
		this.arr[0]=0;
	}
	this.Init();
	
	this.Insert = function(index,item){//插入一个元素,与索引k相关联
		var b=new Node(index,item);
		this.arr.push(b);
		
		var N=this.arr.length-1;
		for(var k=Math.floor(N/2);k>0;k--){
			sink_2_i(this.arr,k,N);  
		}//至此,该堆为最小堆,最小的值总在堆顶
	}
	
	this.min = function(){//返回最小元素
		if(this.arr.length==0){
			return false;
		}else{
			var a=this.arr[1];
			return a;
		}
	}
	
	this.delMin = function(){//删除最小元素并返回
		if(this.arr.length==0){
			return false;
		}else{
			var a=this.arr.splice(1,1);
			var N=this.arr.length-1;
			for(var k=Math.floor(N/2);k>0;k--){
				sink_2_i(this.arr,k,N);  
			}
			return a[0];
		}
	}
	
	this.getSort = function(){
		return this.arr;
	}
	
	this.isEmpty = function(){//优先队列是否为空
		if(this.arr.length<=1){
			return true;
		}else if(this.arr.length>1){
			return false;
		}
	}
	
	this.contains = function(k){//是否存在索引为k的元素
		for(var i=0;i<this.arr.length;i++){
			if(this.arr[i].index==k){
				return true;
			}
		}
		return false;
	}
	
	this.change = function(k,item){//将索引为k的元素的item值设为item
		if(!this.contains(k))return false;
		for(var i=0;i<this.arr.length;i++){
			if(this.arr[i].index==k){
				this.arr[i].item=item;//改变索引为k的元素item值后,对优先队列重新进行堆排序
				var N=this.arr.length-1;
				for(var k=Math.floor(N/2);k>0;k--){
					sink_2_i(this.arr,k,N);  
				}
				return;
			}
		}
	}
}











//---------------------------------以下为工具函数分割线------------------------------//
function exch(A,i,j){
	var temp=A[i];
	A[i]=A[j];
	A[j]=temp;
}

function less(a,i,j){//使用less函数使堆为最大堆
	if(a[i].weight<a[j].weight){
		return true;
	}else{
		return false;
	}
}

function more(a,i,j){//使用more函数使堆为最小堆
	if(a[i].weight>a[j].weight){
		return true;
	}else{
		return false;
	}
}

//-----------------------最大堆的上浮,下沉操作-------------------------------------//

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

function insert(a,k){//将key=k的项插入至堆a中,并重新成堆
	a.push(k);
	var N=a.length-1;
	for(var i=Math.floor(N/2);i>0;i--){
		sink(a,i,N);
	}  
	return a;
}

function extract_max(a){//将堆a的最大值弹出,并重新成堆,返回最大值的key值
	var N=a.length-1;
	exch(a,1,N);
	var b=a.pop();
	sink(a,1,N-1);
	return b;
}


//-----------------------最小堆的上浮,下沉操作-------------------------------------//

function swim_2(a,i){//上浮操作,从i向上将较大的元素移向上级节点
	while(i>1&&more(a,Math.floor(i/2),i)){
		exch(a,Math.floor(i/2),i);
		i=Math.floor(i/2);
	}	
}

function sink_2(a,k,N){//下沉操作,从i向下将较大的元素移向上级节点
	while(2*k<=N){
		var j=2*k;
		if((j<N)&&(more(a,j,j+1))){//优先与右子节点进行交换,若右子节点小于父节点
			j++;   //再与左节点进行交换
		}
		if(!more(a,k,j)){
			break;			
		}
		exch(a,k,j);
		k=j;//将指针指向其子节点,重复操作
	}
}




//----------------------------以下工具内容'索引'优先队列所特化----------------------------//
var Node = function(index,item){
	this.Init = function(){  
		this.index = index;  
		this.item = item; 
	};  
	this.Init();
}

function less_i(a,i,j){//使用less函数使堆为最大堆
	if(a[i].item<a[j].item){
		return true;
	}else{
		return false;
	}
}

function more_i(a,i,j){//使用less函数使堆为最大堆
	if(a[i].item>a[j].item){
		return true;
	}else{
		return false;
	}
}
//------------------------生成最大堆-----------------------------------
function swim_i(a,i){//上浮操作,从i向上将较大的元素移向上级节点
	while(i>1&&less_i(a,Math.floor(i/2),i)){
		exch(a,Math.floor(i/2),i);
		i=Math.floor(i/2);
	}	
}

function sink_i(a,k,N){//下沉操作,从i向下将较大的元素移向上级节点
	while(2*k<=N){
		var j=2*k;
		if((j<N)&&(less_i(a,j,j+1))){//优先与右子节点进行交换,若右子节点小于父节点
			j++;   //再与左节点进行交换
		}
		if(!less_i(a,k,j)){
			break;			
		}
		exch(a,k,j);
		k=j;//将指针指向其子节点,重复操作
	}
}
//-------------------------生成最小堆--------------------------------------
function swim_2_i(a,i){//上浮操作,从i向上将较大的元素移向上级节点
	while(i>1&&more_i(a,Math.floor(i/2),i)){
		exch(a,Math.floor(i/2),i);
		i=Math.floor(i/2);
	}	
}

function sink_2_i(a,k,N){//下沉操作,从i向下将较大的元素移向上级节点
	while(2*k<=N){
		var j=2*k;
		if((j<N)&&(more_i(a,j,j+1))){//优先与右子节点进行交换,若右子节点小于父节点
			j++;   //再与左节点进行交换
		}
		if(!more_i(a,k,j)){
			break;			
		}
		exch(a,k,j);
		k=j;//将指针指向其子节点,重复操作
	}
}