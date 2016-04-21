//算法(第四版)第四章 4.4最短路径
//本文件提供了 (有环/无环)加权有向图最短路径算法Dijkstra||最长路径算法||一般加权有向图的最短路径BellmanFord算法

//---------------------------加权有向图的表示--------------------------------//
//DirectedEdge定义在link_with_weight.inc.js中
var EdgeWeightedDigraph = function(){//加权有向图
	
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
	
	this.get_adj_to_array = function(v){//数组形式返回顶点v所接的链表(以有向边形式输出)
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
	
	this.get_adj_to_array_in_num = function(v){//数组形式返回顶点v所接的链表(以边的终点形式输出)
		var array=new Array();
		if(this.adj[v]==null){//当节点为单独节点,返回空数组
			return [];
		}
		var node=this.adj[v].first;
		while(node!=null){
			array.push(node.w);
			node=node.next;
		}
		return array;
	}
	
	this.addEdge = function(v,w,weight){//添加DirectedEdge加权有向边类型的数据到图中
		if(this.adj[v]==null){
			this.adj[v]=new List();
			this.adj[v].Push(v,w,weight);
		}else{
			this.adj[v].Push(v,w,weight);
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


//---------加权有向图的最短路径生成的Dijkstra算法,与加权无向图Prim算法思想类似
//关键思想,边的松弛:若边 e 为从 v 指向 w 的边, s 为路径的起点,若 distTo[v]+e.weight()>=distTo[w] 则证明s到w的路径为最短路径,并保持,若 distTo[v]+e.weight()<distTo[w] 则证明s到w的路径中经过v通过e到达w,比起原到达w的路径为更短的路径,则放弃原路径,更新distTo[w]为经过v并通过e的路径长度
//顶点的松弛:将顶点v所有向外指出的边都进行一次边的松弛操作
var DijkstraSP = function(){

	this.edgeTo=new Array();//最短路径上,顶点v是从哪一条边过来的
	this.distTo=new Array();//从起点到顶点v的距离
	this.pq=new IndexMinPQ();
	
	this.DijkstraSP = function(G,s){//s为需要查找最短路径的起点
		this.edgeTo=new Array(G.get_V());
		this.distTo=new Array(G.get_V());
		for(var i=0;i<G.get_V();i++){
			this.distTo[i]=Infinity;
		}
		this.distTo[s]=0;//将从起点到任何顶点的距离初始化为正无穷,顶点到自身的距离初始化为0
		this.pq.Insert(s,0);//用起点0和权重0初始化优先队列pq_i
		while(!this.pq.isEmpty()){//对每一条边都进行松弛操作,直至从s可达的顶点都已加入最短路径树中,循环结束
			this.relax(G,this.pq.delMin());
		}
	}
	
	this.relax = function(G,v){//顶点松弛操作
		var arr=G.get_adj_to_array(v);
		for(var i=0;i<arr.length;i++){//对当前顶点v所指出的每一条边都进行松弛操作
			var w=arr[i].to();//w为当前边的终点
			if(this.distTo[w]>this.distTo[v]+arr[i].get_weight()){
				this.distTo[w]=this.distTo[v]+arr[i].get_weight();//s到w的路径中经过v通过e到达w,比起原到达w的路径为更短的路径,则放弃原路径,更新distTo[w]为经过v并通过e的路径长度
				this.edgeTo[w]=arr[i];
				if(this.pq.contains(w)){
					this.pq.change(w,this.distTo[w]);
				}else{
					this.pq.Insert(w,this.distTo[w]);
				}
			}
		}
	}
	
	this.get_distTo = function(v){//返回起点s到顶点v的最短路径距离
		return this.distTo[v];
	}
	
	this.hasPathTo = function(v){//返回从起点s是否有到顶点达v的路径
		if(this.distTo[v]<Infinity){
			return true;
		}else{
			return false;
		}
	}
	
	this.pathTo = function(v){//返回从起点s到顶点v最短路径的轨迹
		if(!this.hasPathTo(v))return null;
		var path=new Array();
		for(var e=this.edgeTo[v];e!=null;e=this.edgeTo[e.from()]){
			path.push(e);
		}
		return path.reverse();
	}
	
	this.showPathTo = function(v){//可视化轨迹
		var path=this.pathTo(v);
		for(var i=0;i<path.length;i++){
			document.write('Edge '+(i+1)+': '+path[i].v+' To '+path[i].w+' Length '+path[i].weight+' --><br/>')
		}
		document.write('<br/>');
	}
}


//----------------------------无环加权有向图的最短路径生成-----------------------------------//
var AcyclicSp = function(){
	this.edgeTo=new Array();//最短路径上,顶点v是从哪一条边过来的
	this.distTo=new Array();//从起点到顶点v的距离
	
	this.AcyclicSp = function(G,s){//s为需要查找最短路径的起点
		this.edgeTo=new Array(G.get_V());
		this.distTo=new Array(G.get_V());
		for(var i=0;i<G.get_V();i++){
			this.distTo[i]=Infinity;
		}
		this.distTo[s]=0;//将从起点到任何顶点的距离初始化为正无穷,顶点到自身的距离初始化为0
		var top=new Topological();
		top.Topological(G);
		var order=top.get_order();
		for(var i=0;i<order.length;i++){
			this.relax(G,order[i]);
		}
	}
	
	this.relax = function(G,v){//顶点松弛操作
		var arr=G.get_adj_to_array(v);
		for(var i=0;i<arr.length;i++){//对当前顶点v所指出的每一条边都进行松弛操作
			var w=arr[i].to();//w为当前边的终点
			if(this.distTo[w]>this.distTo[v]+arr[i].get_weight()){
				this.distTo[w]=this.distTo[v]+arr[i].get_weight();//s到w的路径中经过v通过e到达w,比起原到达w的路径为更短的路径,则放弃原路径,更新distTo[w]为经过v并通过e的路径长度
				this.edgeTo[w]=arr[i];
			}
		}
	}
	
	this.get_distTo = function(v){//返回起点s到顶点v的最短路径距离
		return this.distTo[v];
	}
	
	this.hasPathTo = function(v){//返回从起点s是否有到顶点达v的路径
		if(this.distTo[v]<Infinity){
			return true;
		}else{
			return false;
		}
	}
	
	this.pathTo = function(v){//返回从起点s到顶点v最短路径的轨迹
		if(!this.hasPathTo(v))return null;
		var path=new Array();
		for(var e=this.edgeTo[v];e!=null;e=this.edgeTo[e.from()]){
			path.push(e);
		}
		return path.reverse();
	}
	
	this.showPathTo = function(v){//可视化轨迹
		var path=this.pathTo(v);
		for(var i=0;i<path.length;i++){
			document.write('Edge '+(i+1)+': '+path[i].v+' To '+path[i].w+' Length '+path[i].weight+' --><br/>')
		}
		document.write('<br/>');
	}
}


//----------------------------无环加权有向图的最长路径生成(与最短路径算法的区别:将distTo初始值变为-Infinity,并改变relax()方法中不等式的方向)----------------------------------//
var AcyclicLp = function(){
	this.edgeTo=new Array();//最短路径上,顶点v是从哪一条边过来的
	this.distTo=new Array();//从起点到顶点v的距离
	
	this.AcyclicLp = function(G,s){//s为需要查找最短路径的起点
		this.edgeTo=new Array(G.get_V());
		this.distTo=new Array(G.get_V());
		for(var i=0;i<G.get_V();i++){
			this.distTo[i]=-Infinity;
		}
		this.distTo[s]=0;//将从起点到任何顶点的距离初始化为正无穷,顶点到自身的距离初始化为0
		var top=new Topological();
		top.Topological(G);
		var order=top.get_order();
		for(var i=0;i<order.length;i++){
			this.relax(G,order[i]);
		}
	}
	
	this.relax = function(G,v){//顶点松弛操作
		var arr=G.get_adj_to_array(v);
		for(var i=0;i<arr.length;i++){//对当前顶点v所指出的每一条边都进行松弛操作
			var w=arr[i].to();//w为当前边的终点
			if(this.distTo[w]<this.distTo[v]+arr[i].get_weight()){
				this.distTo[w]=this.distTo[v]+arr[i].get_weight();//s到w的路径中经过v通过e到达w,比起原到达w的路径为更短的路径,则放弃原路径,更新distTo[w]为经过v并通过e的路径长度
				this.edgeTo[w]=arr[i];
			}
		}
	}
	
	this.get_distTo = function(v){//返回起点s到顶点v的最短路径距离
		return this.distTo[v];
	}
	
	this.hasPathTo = function(v){//返回从起点s是否有到顶点达v的路径
		if(this.distTo[v]<Infinity){
			return true;
		}else{
			return false;
		}
	}
	
	this.pathTo = function(v){//返回从起点s到顶点v最短路径的轨迹
		if(!this.hasPathTo(v))return null;
		var path=new Array();
		for(var e=this.edgeTo[v];e!=null;e=this.edgeTo[e.from()]){
			path.push(e);
		}
		return path.reverse();
	}
	
	this.showPathTo = function(v){//可视化轨迹
		var path=this.pathTo(v);
		for(var i=0;i<path.length;i++){
			document.write('Edge '+(i+1)+': '+path[i].v+' To '+path[i].w+' Length '+path[i].weight+' --><br/>')
		}
		document.write('<br/>');
	}
}


//--------------------一般加权有向图(有负权重路径,含环)的最短路径生成 基于队列的BellmanFord算法--------------------//
//对于从起点不可达的顶点,最短路径为正无穷
//对于从起点可达但是路径上某一个顶点属于一个负权重环的顶点,最短路径为负无穷
//对于其他所有顶点,计算最短路径
//并可以对含有负权重环的加权有向无环图找出该负权重环
//找出负权重环的原理,当加权有向图的最短路径出现环路,是因为掉入了负权重环之中,导致路径长度无限减少,通过设置每松弛操作V次检测一次最短路径中的环,该环即是负权重环
var BellmanFordSP = function(){
	this.edgeTo=new Array();//最短路径上,顶点v是从哪一条边过来的
	this.distTo=new Array();//从起点到顶点v的距离
	this.onQ=new Array();//该顶点是否处于队列上
	this.queue=new Array();//队列顶为正在被放松的顶点,紧接为下一轮中的有效顶点
	this.cost=0;//relax的调用次数
	this.cycle=new Array();//edgeTo[]中是否有负权重环
	
	this.BellmanFordSP = function(G,s){
		this.edgeTo=new Array(G.get_V());
		this.distTo=new Array(G.get_V());
		this.onQ=new Array(G.get_V());
		for(var i=0;i<G.get_V();i++){
			this.distTo[i]=Infinity;
		}
		this.distTo[s]=0;//将从起点到任何顶点的距离初始化为正无穷,顶点到自身的距离初始化为0
		this.queue.push(s);
		this.onQ[s]=true;
		while((this.queue.length!=0)&&!this.hasNegativeCycle()){
			var v=this.queue.splice(0,1)[0];//弹出当轮队列中的顶点,对其进行松弛操作
			this.onQ[v]=false;
			this.relax(G,v);
		}
	}
	
	this.relax = function(G,v){
		this.G=G;
		var arr=G.get_adj_to_array(v);
		for(var i=0;i<arr.length;i++){//对当前顶点v所指出的每一条边都进行松弛操作
			var w=arr[i].to();//w为当前边的终点
			if(this.distTo[w]>this.distTo[v]+arr[i].get_weight()){
				this.distTo[w]=this.distTo[v]+arr[i].get_weight();//s到w的路径中经过v通过e到达w,比起原到达w的路径为更短的路径,则放弃原路径,更新distTo[w]为经过v并通过e的路径长度
				this.edgeTo[w]=arr[i];
				if(!this.onQ[w]){//当所当前顶点的指出边所指向的顶点从未被加入过队列中时,将其顶点加入队列以作为下一轮放松,否则跳过
					this.queue.push(w);//将当前顶点指出边指向的顶点加入队列之中,代表着下一轮中的有效顶点
					this.onQ[w]=true;
				}
				
			}
			this.cost++;			
			if(this.cost%G.get_V()==0){//每放松一条边cost加一,直到放松完全部顶点,即cost=G.V时,进行一次负权重环的检测
				this.findNegativeCycle();//检查负权重环的必要性参见 算法(第四版)438页命题Y  (若存在负权重环,则队列永远不可能为空)
			}
		}
	}
	
	this.findNegativeCycle = function(){//负权重环的检测:当最短路径树的放松操作次数超过顶点数V,证明最短路径树中出现了负权重环,即 有向边集合edgeTo[]中存在环,且该环为负权重环
		var v=this.edgeTo.length;
		var spt=new EdgeWeightedDigraph();
		for(var v=0;v<this.G.get_V();v++){//将edgeTo[]集合看成图G的子图spt,将子图spt所包含的有向边进行有向环的检测
			if(this.edgeTo[v]!=null){
				spt.addEdge(this.edgeTo[v].v,this.edgeTo[v].w,this.edgeTo[v].weight);
			}
		}
		spt.V=spt.adj.length;
		
		var cf=new EdgeWeightedCycleFinder();
		cf.EdgeWeightedCycleFinder(spt);
		
		this.cycle=cf.get_cycle();//子图spt中存在的有向环即图G中存在的负权重环
		
	}
	
	this.hasNegativeCycle = function(){
		if(this.cycle.length!=0){
			return true;
		}else{
			return false;
		}
	}
	
	this.negativeCycle = function(){
		return this.cycle;
	}
	
}


//------------------------------分析图是否有向无环图-------------------------------//
var EdgeWeightedCycleFinder = function(){//本函数为BellmanFord算法中检测最短路径子图中所含的负权重环所特化,因为从顶点指出的不再是单数字,而是有向边,因此检测onStack的时候检测的是边的to()方法所得的边所指的顶点
	
	this.marked = new Array();
	this.edgeTo=new Array();//从起点到一个顶点的已知路径上的最后一个顶点,即当起点为s时,在s到点w的路径上,点w的紧接上一个顶点为edgeTo(w)
	this.cycle = new Array();
	this.onStack = new Array();
		
	this.EdgeWeightedCycleFinder = function(G){
		if(G.get_V()){			
			this.onStack=new Array(G.get_V());//onstack栈正是当前正在遍历的有向路径,一旦找到一条有向边v->w且w已存在与栈中,就找到一个环,因为栈表示的是w->v的有向路径,一旦找到v->w,就补全了这个环
			this.marked=new Array(G.get_V());
			this.edgeTo=new Array(G.get_V());
			for(var i=0;i<this.marked.length;i++){
				this.onStack[i]=false;
				this.marked[i]=false;
				this.edgeTo[i]=null;
			}
		}
		for(var s=0;s<G.get_V();s++){//遍历图中的所有顶点以查找是否具有有向环
			if(this.marked[s]!=true){
				this.dfs(G,s);//?
			}
		}
	}
	
	this.dfs = function(G,v){
		this.marked[v]=true;//marked[v]意思为,顶点v与起点s是连通的吗?
		this.onStack[v]=true;//将路径经过的节点保存在onStack内
		var arr=G.get_adj_to_array_in_num(v);//arr储存与当前顶点v连通的所有顶点		
		for(var i=0;i<arr.length;i++){//遍历arr,当marked数组的[arr[i]]项仍未填充,则递归运行dfs(G,arr[i]),直至marked数组将所有直接或间接与顶点v相通的都填上true为止
		
		//3种情况
			if(this.hasCycle()){//1.如果前面的顶点已经证明图为有向环图,返回
				return;
			}else if(this.marked[arr[i]]!=true){//2.若深度优先搜索路径仍可继续,则继续下探
				this.edgeTo[arr[i]]=v;
				this.dfs(G,arr[i]);
			}else if(this.onStack[arr[i]]==true){//3.当深度优先搜索路径遇到已标记的节点,且该节点出现在onStack中,则证明出现有向环,将环路径保存于cycle中
				this.cycle=new Array();
				for(var x=v;x!=arr[i];x=this.edgeTo[x]){
					this.cycle.push(x);
				}
				this.cycle.push(arr[i]);
				this.cycle.push(v);
			}
		}
		this.onStack[v]=false;//将onStack路径上的节点逐一清空
	}
	
	this.hasCycle = function(){//判断是否有有向环
		if(this.cycle.length!=0){
			return true;
		}else{
			return false;
		}
	}
	
	this.get_cycle = function(){//获得其中一条有向环的路径
		return this.cycle;
	}
}





















