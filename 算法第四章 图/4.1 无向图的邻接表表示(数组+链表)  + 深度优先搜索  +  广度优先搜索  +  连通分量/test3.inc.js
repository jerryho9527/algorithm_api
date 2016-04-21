//算法(第四版)第四章 4.1无向图 图的邻接表表示方法
//深度优先搜索与广度优先搜索总结:
//深度优先搜索就好像是一个人在走迷宫,访问其中一个顶点时,将其标记为已访问,递归访问其没有被标记过的邻居顶点     
//广度优先搜索则好像一组人一起朝各个方向走迷宫,出现新的岔路时,分裂为更多的人来搜索各个方向,当两个探索者相遇时,会合二为一(并继续使用先到达者的绳子)

//---------------------------图的表示--------------------------------//

var Graph = function(){//Graph数据类型
	
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
			array.push(node.item);
			node=node.next;
		}
		return array;
	}
	
	this.addEdge = function(v,w){//添加边到邻接表中,并更新边的数目
		if(this.adj[v]==null){
			this.adj[v]=new List();
			this.adj[v].Push(w);
		}else{
			this.adj[v].Push(w);
		}
		
		if(this.adj[w]==null){
			this.adj[w]=new List();
			this.adj[w].Push(v);
		}else{
			this.adj[w].Push(v);
		}
		this.E++;
	}
	
	this.Insert = function(a){//按照输入的图数组,设置图顶点的数值V以及添加边到邻接表中
		for(var i=0;i<a.length;i++){
			this.addEdge(a[i][0],a[i][1]);
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
	
	this.degree = function(v){//返回v的度数
		var degree=0;
		if(this.adj[v]!==null){
			var node=this.adj[v].first;
			while(node!=null){
				node=node.next;
				degree++;
			}
			return degree;
		}else{
			return false;
		}
	}
	
	this.maxDegree = function(){//计算所有顶点的最大度数
		var max=0;
		for(var i=0;i<this.V;i++){
			if(this.degree(i)>max){
				max=this.degree(i);
			}
		}
		return max;
	}
}

//--------------------------深度优先搜索 (以及寻找路径)---------------------------------//
//算法(第四版) 340页  描述深度优先搜索:在访问其中一个顶点时 (1)将他标志为已访问 (2)递归地访问它所有没有被标志过的邻居顶点
var DepthFirstSearch = function(){
	
	this.Init = function(G,s){  
		this.marked = new Array(); 		
		this.count = 0;
		
		this.edgeTo=new Array();//从起点到一个顶点的已知路径上的最后一个顶点,即当起点为s时,在s到点w的路径上,点w的紧接上一个顶点为edgeTo(w)
		this.s='';
	}
	this.Init();
	
	this.DepthFirstSearch = function(G,s){//输入图G以及一个顶点s,在图G中,找到和起点s连通的所有顶点
		if(G.get_V()){
			this.marked=new Array(G.get_V());
			this.edgeTo=new Array(G.get_V());
			this.s=s;
			this.count = 0;
			for(var i=0;i<this.marked.length;i++){
				this.marked[i]=false;
				this.edgeTo[i]=null;
			}
		}
		this.dfs(G,s);
	}
	
	this.dfs = function(G,v){
		this.marked[v]=true;//marked[v]意思为,顶点v与起点s是连通的吗?
		this.count++;//count是与s连通的顶点总数
		var arr=G.get_adj_to_array(v);//arr储存与当前顶点v连通的所有顶点
		for(var i=0;i<arr.length;i++){//遍历arr,当marked数组的[arr[i]]项仍未填充,则递归运行dfs(G,arr[i]),直至marked数组将所有直接或间接与顶点v相通的都填上true为止
			if(this.marked[arr[i]]!=true){//如果顶点marked[arr[i]]还没被标志过,则将其标记,并递归标记其邻居顶点
				this.edgeTo[arr[i]]=v;
				this.dfs(G,arr[i]);
			}
		}
	}
	
	this.hasPathTo = function(v){//返回s与w是否相通
		return this.marked[v];
	}
	
	this.get_count = function(){//返回与s相通的顶点总数
		return this.count;
	}
	//----------------------------------------------------------------//
	this.pathTo = function(v){//找出从起点s到顶点v的深度优先搜索路径
		if(!this.hasPathTo(v)){
			return null;
		}
		var path=new Array();
		for(var x=v;x!=this.s;x=this.edgeTo[x]){
			path.push(x);
		}
		path.push(this.s);
		return path.reverse();
	}
}


//--------------------------广度优先搜索 (以及寻找路径)---------------------------------//
var BreadthFirstSearch = function(){
	
	this.Init = function(G,s){  
		this.marked = new Array(); 	
		this.level = new Array();//使用level数组定义图中各顶点与起点s的距离,level[s]=0,下一层加1,如此类推
		this.edgeTo=new Array();//从起点到一个顶点的已知路径上的最后一个顶点,即当起点为s时,在s到点w的路径上,点w的紧接上一个顶点为edgeTo(w)
		this.s='';
	}
	this.Init();
	
	this.BreadthFirstSearch = function(G,s){//输入图G以及一个顶点s,在图G中,找到和起点s连通的所有顶点
		if(G.get_V()){
			this.marked=new Array(G.get_V());
			this.edgeTo=new Array(G.get_V());
			this.level=new Array(G.get_V());
			this.s=s;
			for(var i=0;i<this.marked.length;i++){
				this.marked[i]=false;
				this.edgeTo[i]=null;
				this.level[i]=-Infinity;//如果两点不连通,则距离为无穷大
			}
		}
		this.bfs(G,s);
	}
	
	this.bfs = function(G,s){
		this.marked[s]=true;//marked[v]意思为,顶点v与起点s是连通的吗?
		this.level[s]=0;
		
		var queue=new Array();//使用一个队列queue来从有待搜索的通道中,选择最早遇到的那条
		queue.push(s);
		
		while(queue.length!=0){
			var v=queue.splice(0,1)[0];
			var arr=G.get_adj_to_array(v);//arr储存与当前顶点v连通的所有顶点
			for(var i=0;i<arr.length;i++){//遍历arr,当marked数组的[arr[i]]项仍未填充,则递归运行bfs(G,arr[i]),直至marked数组将所有直接或间接与顶点v相通的都填上true为止
				if(this.marked[arr[i]]!=true){
					this.edgeTo[arr[i]]=v;
					this.marked[arr[i]]=true;
					this.level[arr[i]]=this.level[v]+1;
					queue.push(arr[i]);
				}
			}
		}
	}
	
	this.hasPathTo = function(v){//返回s与w是否相通
		return this.marked[v];
	}
	
	this.pathTo = function(v){//找出从起点s到顶点v的广度优先搜索路径
		if(!this.hasPathTo(v)){
			return null;
		}
		var path=new Array();
		for(var x=v;x!=this.s;x=this.edgeTo[x]){
			path.push(x);
		}
		path.push(this.s);
		return path.reverse();
	}
}


//------------------------------计算连通分量--------------------------------//
//基于深度优先搜索方法
var CC = function(){
	
	this.Init = function(G){  
		this.marked = new Array(); 		
		this.count = 0;
		this.id = new Array();//当顶点间互相连通时,其id[]值相同,则id[]值最大值为图中各个不连通分量的数量(子图数量),同时通过查找共享id[]值的顶点,可以查询出其是否相通,以及所有相通的顶点值
	}
	this.Init();
	
	this.CC = function(G){
		this.marked = new Array(G.get_V());
		for(var i=0;i<this.marked.length;i++){
			this.marked[i]=false;
		}
		this.id = new Array(G.get_V());
		for(var s=0;s<G.get_V();s++){
			if(!this.marked[s]){
				this.dfs(G,s);
				this.count++;
			}
		}
	}
	this.dfs = function(G,v){
		this.marked[v]=true;
		this.id[v]=this.count;
		var arr=G.get_adj_to_array(v);
		for(var i=0;i<arr.length;i++){
			if(this.marked[arr[i]]!=true){
				this.dfs(G,arr[i]);
			}
		}
	}
	this.connected = function(v,w){
		return (this.id[v]==this.id[w])?true:false;
	}
	
	this.connected_sort = function(){
		for(var i=0;i<this.count;i++){
			var a='';
			for(var j=0;j<this.id.length;j++){
				if(this.id[j]==i){
					a+=j+' ';
				}
			}
			document.write('connected '+i+' is : '+a+'.<br/>');
		}
	}
}

//---------------------------------判断是否无环图--------------------------------//

var Cycle = function(){
	
	this.Init = function(G){  
		this.marked = new Array(); 
		this.hasCycle = false;
	}
	this.Init();
	
	this.Cycle = function(G){
		this.marked = new Array(G.get_V());
		for(var i=0;i<this.marked.length;i++){
			this.marked[i]=false;
		}
		for(var s=0;s<G.get_V();s++){
			if(!this.marked[s]){
				this.dfs(G,s,s);
			}
		}
	}
	this.dfs = function(G,v,u){//从起点开始,v指代的是深度搜索中当前处于的节点,u指代的是路径上一个节点,当v的连通节点集arr[i]上出现了已标志的节点(marked[arr[i]==true]),且该节点并非其深度优先搜索路径的上一个节点u时,证明当前节点v与深度优先搜索路径上,一个以上的,更早的节点相连通,证明v,u与arr[i]形成一个环路,图为有环图
		this.marked[v]=true;
		var arr=G.get_adj_to_array(v);
		for(var i=0;i<arr.length;i++){
			if(this.marked[arr[i]]!=true){
				this.dfs(G,arr[i],v);
			}else if(arr[i]!=u){
				this.hasCycle=true;
			}
		}
	}
	this.get_Cycle = function(){
		return this.hasCycle;
	}
}

//--------------------------判断是否二分图(能够用两种颜色将图的所有顶点着色,使得任意一条边两个端点的颜色都不相同)--------------------------//
var TwoColor = function(){
	
	this.Init = function(G){  
		this.marked = new Array();
		this.color = new Array();
		this.isTwoColorable = true;
	}
	this.Init();
	
	this.TwoColor = function(G){
		this.marked = new Array(G.get_V());
		this.color = new Array(G.get_V());
		for(var i=0;i<this.marked.length;i++){
			this.marked[i]=false;
		}
		for(var s=0;s<G.get_V();s++){
			if(!this.marked[s]){
				this.dfs(G,s);
			}
		}
	}
	this.dfs = function(G,v){//在v的连通节点集arr中,设置arr[i]为v颜色的相反值,当arr[i]中出现已标志的节点,且该节点值颜色与v相同,则有一条边两个端点的颜色相同,证明图G不是二分图
		this.marked[v]=true;
		var arr=G.get_adj_to_array(v);
		for(var i=0;i<arr.length;i++){
			if(this.marked[arr[i]]!=true){
				this.color[arr[i]] = !this.color[v];
				this.dfs(G,arr[i]);
			}else if(this.color[arr[i]] == this.color[v]){
				this.isTwoColorable = false;
			}
		}
	}
	this.isBipartite = function(){
		return this.isTwoColorable;
	}
}

//--------------------------------符号图的实现(略)------------------------------//
//应用散列表,将节点的字符串键值转变为数字键值,然后沿用邻接表的图表示方法










