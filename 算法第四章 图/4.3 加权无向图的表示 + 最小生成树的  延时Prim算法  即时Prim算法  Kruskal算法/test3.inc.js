//算法(第四版)第四章 4.3最小生成树
//本文件提供了最小生成树生成算法Prim的延时实现LazyPrimMST,以及实时实现PrimMST,区别为已判定为非横切边的边是否存留于最小生成树队列内

//---------------------------加权无向图的表示--------------------------------//
//Edge定义在link_with_weight.inc.js中
var EdgeWeightedGraph = function(){//加权无向图
	
	this.Init = function(){  
		this.V = 0; 		
		this.E = 0;
		this.adj=new Array();			
	}
	this.Init();	

	this.get_V = function(){
		return this.V;
	}
	
	this.get_E = function(){
		return this.E;
	}
	
	this.get_adj = function(v){//返回顶点v所接的链表
		return this.adj[v].first;
	}
	
	this.get_adj_to_array = function(v){//数组形式返回顶点v所接的链表
		var array=new Array();
		if(this.adj[v]==null){//当节点为单独节点,返回空数组
			return [];
		}
		var node=this.adj[v].first;
		while(node!=null){
			array.push(node);
			node=node.next;
		}
		return array;
	}
	
	this.addEdge = function(v,w,weight){//添加Edge加权边类型的数据到图中
		if(this.adj[v]==null){
			this.adj[v]=new List();
			this.adj[v].Push(v,w,weight);
		}else{
			this.adj[v].Push(v,w,weight);
		}		
		if(this.adj[w]==null){
			this.adj[w]=new List();
			this.adj[w].Push(v,w,weight);
		}else{
			this.adj[w].Push(v,w,weight);
		}
		this.E++;
	}

	this.Insert = function(a){//按照输入的图数组,设置图顶点的数值V以及添加边到邻接表中
		for(var i=0;i<a.length;i++){
			this.addEdge(a[i][0],a[i][1],a[i][2]);
		}
		this.V=this.adj.length;//对比有向图的情况,因为无向图的边都是双向的,因此不会出现空链表的情况,顶点的数量就是邻接表的大小
	}
	
	this.Show = function(){//输出邻接表结构
		for(var i=0;i<this.adj.length;i++){
			if(this.adj[i]==null){
				document.write('('+i+'):elements in save as follows: <br/>null<br/> ');
			}else{
				document.write('('+i+'):');this.adj[i].Print();
			}			
		}
	}
	
	this.edges = function(){//输出图的所有边
		var b=new Array();
		for(var v=0;v<this.V;v++){
			var newNode=this.get_adj(v);//arr储存与当前顶点v连通的所有顶点
			while(newNode!=null){
				if(newNode.other(v)>v){
					b.push([newNode.v,newNode.w,newNode.weight]);
				}
				newNode=newNode.next;
			}
		}
		return b;
	}
	
}


//最小生成树Prim算法的延时实现(指的是优先队列中会保留失效的边,只是当检测到边的两端都已遍历,会跳过该边)
var LazyPrimMST = function(){

	this.marked=new Array();
	this.mst=new Array();
	this.pq=new MinPQ();
	
	this.LazyPrimMST = function(G){
		this.marked=new Array(G.get_V());
		for(var i=0;i<G.get_V();i++){
			this.marked[i]=false;
		}
		for(var i=0;i<G.adj.length;i++){//选出图中最小索引值作为路径起点
			if(G.adj[i]!=null){
				var min=i;
			}
		}
		this.visit(G,min);//从顶点索引值最小的顶点开始进行最小生成树的构建
		while(!this.pq.isEmpty()){
			var e=this.pq.delMin();//弹出优先队列pq内的最小值,将此边加入最小生成树mst中,并对两端顶点都已处于遍历数组marked[]内的边进行忽略
			
			var v=e.either()
			var w=e.other(v);
			if(this.marked[v]&&this.marked[w]){
				continue;
			}
			this.mst.push(e);
			if(!this.marked[v]) this.visit(G,v);//当这条边e的任意顶点未处于已遍历数组marked[]里面时,对当前节点v的对端顶点w进行递归操作,直至所有的顶点都已被遍历,循环结束
			if(!this.marked[w]) this.visit(G,w);
		}
	}
	
	this.visit = function(G,v){
		this.marked[v]=true;
		var arr=G.get_adj_to_array(v);//将当前顶点v的邻接边中,若边的另一端顶点未被遍历(marked[other[v]]==false),则将这些边加入优先队列pq内
		for(var i=0;i<arr.length;i++){
			if(!this.marked[arr[i].other(v)]){
				this.pq.Insert([arr[i]]);
			}
		}
	}
	
	this.edges = function(){
		return this.mst;
	}
	
	this.printEdges = function(){
		for(var i=0;i<this.mst.length;i++){
			var tempNode=this.mst[i];
			document.write("|"+tempNode.v+"|"+tempNode.w+"|"+tempNode.weight+"| -> <br/>");
		}
	}
}


//最小生成树Prim算法的即时实现(指的是优先队列中不会保留失效的边,只是当检测到边的两端都已遍历,会跳过该边)
var PrimMST = function(){

	this.marked=new Array();
	this.edgeTo=new Array();
	this.distTo=new Array();
	this.pq_i=new IndexMinPQ();
	
	this.PrimMST = function(G){
		this.marked=new Array(G.get_V());
		this.edgeTo=new Array(G.get_V());
		this.distTo=new Array(G.get_V());
		for(var i=0;i<G.get_V();i++){
			this.marked[i]=false;
			this.distTo[i]=Infinity;
		}
		
		for(var i=0;i<G.adj.length;i++){//选出图中最小索引值min作为路径起点
			if(G.adj[i]!=null){
				var min=i;
			}
		}
		
		this.distTo[min]=0.0;
		this.pq_i.Insert(min,0.0);//用起点0和权重0初始化优先队列pq_i
		while(!this.pq_i.isEmpty()){
			this.visit(G,this.pq_i.delMin());
		}
	}
	
	this.visit = function(G,v){
		this.marked[v]=true;
		var arr=G.get_adj_to_array(v);//将当前顶点v的邻接边中,若边的另一端顶点未被遍历(marked[other[v]]==false),则将这些边加入优先队列pq内
		for(var i=0;i<arr.length;i++){
			var w=arr[i].other(v);
			if(this.marked[w]){
				continue;//当一条边的两个顶点v,w都已经处于最小生成树中,则这条边不再是横切边,将其跳过
			}
			if(arr[i].get_weight()<this.distTo[w]){
				this.edgeTo[w]=arr[i];
				this.distTo[w]=arr[i].get_weight();
				if(this.pq_i.contains(w)){
					this.pq_i.change(w,this.distTo[w]);
				}else{
					this.pq_i.Insert(w,this.distTo[w]);
				}
			}
		}
	}
	
	this.edges = function(){//返回最小生成树edges
		var mst=new Array();
		for(var i=0;i<this.edgeTo.length;i++){
			if(this.edgeTo[i]==null)continue;
			mst.push(this.edgeTo[i]);
		}
		return mst;
	}
	
	this.printEdges = function(){
		for(var i=0;i<this.edgeTo.length;i++){
			var tempNode=this.edgeTo[i];
			if(tempNode==null)continue;
			document.write("|"+tempNode.v+"|"+tempNode.w+"|"+tempNode.weight+"| -> <br/>");
		}
	}
}

//最小生成树的Kruskal算法,与Prim算法的区别是,Prim算法从起始点开始通过加入邻接边权重最小的边来构建最小生成树,因此最小生成树是一条一条边生长的;;而Kruskal算法是将图中所有边权重进行排序,通过选择其中权重最小而不会与已选中的边构成环的边进行最小生成树的构建,因此最小生成树是从破碎的边开始慢慢结合而成
var KruskalMST = function () {
	this.marked=new Array();
	this.mst=new Array();
	this.pq_k=new IndexMinPQ();
	this.uf=new UF();

	this.KruskalMST = function(G) {
		this.uf.UF(G.get_V());
		this.marked=new Array(G.get_V());
		for(var i=0;i<G.get_V();i++){
			this.marked[i]=false;
		}

		for(var i=0;i<G.adj.length;i++){//将图中所有的边都放入最小优先队列pq_k内
			if(G.adj[i]!=null) {
				this.marked[i]=true;
				var arr = G.get_adj_to_array(i);
				for (var j = 0; j < arr.length; j++) {
					if ((!this.marked[arr[j].v])||(!this.marked[arr[j].w])) {
						this.pq_k.Insert(arr[j],arr[j].weight);
					}
				}
			}
		}

		while(!this.pq_k.isEmpty()){
			var e=this.pq_k.delMin();
			var v=e.either();
			var w=e.other(v);
			if(this.uf.connected(v,w)){
				continue;
			}
			this.uf.union(v,w);
			this.mst.push(e);
		}
	}

	this.edges = function () {//返回最小生成树所包含的边
		return this.mst;
	}
}


