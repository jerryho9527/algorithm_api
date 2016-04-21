//算法(第四版)第四章 4.2有向图(在4.4无环加权有向图上的特化应用)

//---------------------------图的表示--------------------------------//

var Digraph = function(){//有向图Digraph数据类型
	
	this.Init = function(){  
		this.V = 0; 		
		this.E = 0;
		this.adj=new Array();
		this.a=null;
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
		}//与无向图不同的地方:此处只添加一条v->w的单向路径,并不添加w->v的路径
		
		if(this.adj[w]==null){//额外增加的方法,使没有邻接表的节点至少生成一个空链表*
			this.adj[w]=new List();
		}
		this.E++;
	}
	
	this.Insert = function(a){//按照输入的图数组,设置图顶点的数值V以及添加边到邻接表中
		this.a=a;
		for(var i=0;i<a.length;i++){
			this.addEdge(a[i][0],a[i][1]);
		}
		this.V=this.adj.length;//有向图与无向图的区别在于,有向图的边是有方向的,因此可能会出现有顶点的邻接表为空链表的情况,导致顶点的数目与邻接表的大小不一致,因此于addEdge内添加改进方法,使没有邻接表的节点至少生成一个空链表*
	}
	
	this.Show = function(){//输出邻接表结构
		for(var i=0;i<this.adj.length;i++){
			if(this.adj[i].first==null){
				document.write('('+i+'):elements in save as follows: <br/>null<br/> ');
			}else{
				document.write('('+i+'):');this.adj[i].Print();
			}
			
		}
	}
	
	this.reverse = function(){//有向图取反,返回有向图的一个副本,但将其中所有边的方向反转
		var R = new Digraph();
		for(var i=0;i<this.a.length;i++){
			R.addEdge(this.a[i][1],this.a[i][0]);
		}
		R.V=R.adj.length;
		return R;
	}
	
	this.hasEdge = function(v,w){//若顶点v与w之间有边,则返回true
		var tempNode_1=this.adj[v].first;
		while(tempNode_1!=null){
			if(tempNode_1.item==w){
				var a=true;
				break;
			}
			tempNode_1=tempNode_1.next;
		}
		var tempNode_2=this.adj[w].first;
		while(tempNode_2!=null){
			if(tempNode_2.item==v){
				var b=true;
				break;
			}
			tempNode_2=tempNode_2.next;
		}
		if(a||b){
			return true;
		}else{
			return false;
		}
	}
}

//------------------计算可达性(对比无向图的连通性:由于边有向,只有从起点s通过有向边到达指定顶点v时,称v对于s可达)-----------------------//
var DirectedDFS = function(){//可达性采用深度优先搜索方法
	
	this.Init = function(G,s){  
		this.marked = new Array(); 	
	}
	this.Init();
	
	this.DirectedDFS = function(G,s){//输入图G以及一个顶点s,在图G中,找到从起点s可达的所有顶点//若s为一个数组,则找到数组中的顶点可达的所有顶点集
		if(s.constructor == Array){
			if(G.get_V()){
				this.marked=new Array(G.get_V());
				for(var i=0;i<this.marked.length;i++){
					this.marked[i]=false;
				}
			}
			for(i=0;i<s.length;i++){
				if(this.marked[s[i]]!=true){
					this.dfs(G,s[i]);
				}
			}
		}else{
			if(G.get_V()){
				this.marked=new Array(G.get_V());
				for(var i=0;i<this.marked.length;i++){
					this.marked[i]=false;
				}
			}
			this.dfs(G,s);
		}
	}
	
	this.dfs = function(G,v){
		this.marked[v]=true;//marked[v]意思为,顶点v与起点s是可达的吗?
		var arr=G.get_adj_to_array(v);//arr储存与当前顶点v连通的所有顶点
		for(var i=0;i<arr.length;i++){//遍历arr,当marked数组的[arr[i]]项仍未填充,则递归运行dfs(G,arr[i]),直至marked数组将所有直接或间接与顶点v相通的都填上true为止
			if(this.marked[arr[i]]!=true){//如果顶点marked[arr[i]]还没被标志过,则将其标记,并递归标记其邻居顶点
				this.dfs(G,arr[i]);
			}
		}
	}
	
	this.get_marked = function(v){//返回对于起点/起点集s,v是否可达
		return this.marked[v];
	}
}

//------------------------------分析图是否有向无环图-------------------------------//
var DirectedCycle = function(){
	
	this.marked = new Array();
	this.edgeTo=new Array();//从起点到一个顶点的已知路径上的最后一个顶点,即当起点为s时,在s到点w的路径上,点w的紧接上一个顶点为edgeTo(w)
	this.cycle = new Array();
	this.onStack = new Array();
		
	this.DirectedCycle = function(G){
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
		var arr=G.get_adj_to_array(v);//arr储存与当前顶点v连通的所有顶点
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

//--------------基于深度优先搜索的顶点排序 1.前序:在递归调用前将顶点加入队列 2.后序:在递归调用后将顶点加入队列 3.逆后序:在递归调用后将顶点压入堆栈----------------------------//
var DepthFirstOrder = function(){
	this.marked=new Array();
	this.pre=new Queue();
	this.post=new Queue();
	this.reversePost=new Stack();
	
	this.DepthFirstOrder = function(G){
		if(G.get_V()){
			this.marked=new Array(G.get_V());
			for(var i=0;i<this.marked.length;i++){
				this.marked[i]=false;
			}
		}
		for(var v=0;v<G.get_V();v++){
			if(this.marked[v]!=true){
				this.dfs(G,v);
			}
		}
	}
	
	this.dfs = function(G,v){
		this.pre.Push(v);
		this.marked[v]=true;
		var arr=G.get_adj_to_array_in_num(v);//以数字形式输出有向边顶点
		for(var i=0;i<arr.length;i++){
			if(this.marked[arr[i]]!=true){
				this.dfs(G,arr[i]);
			}
		}		
		this.post.Push(v);
		this.reversePost.Push(v);
	}
	
	this.get_pre = function(){
		return this.pre.toArray();
	}
	this.get_post = function(){
		return this.post.toArray();
	}
	this.get_reversePost = function(){
		return this.reversePost.toArray();
	}
}

//-------------------------------------拓扑排序-------------------------------------//
var Topological = function(){	
	this.order=null;
	
	this.Topological = function(G){
		this.cyclefinder=new DirectedCycle();//先判断图是否有向无环图,仅当一副有向图为无环图时才能进行拓扑排序
		this.cyclefinder.DirectedCycle(G);
		if((this.cyclefinder.hasCycle())!=true){//若是,则找出图的顶点以逆后序排列,输出至order
			this.dfs=new DepthFirstOrder();
			this.dfs.DepthFirstOrder(G);
			this.order=this.dfs.get_reversePost();//此处有一个问题,作为对象元素插入Stack以后,不能正常遍历输出为array形式,因此修改了link_with_weight.inc.js中link的toArray(方法,)采用折中方式输出逆序拓扑排序为数组形式
		}
	}
	
	this.get_order = function(){
		return this.order;//拓扑排序得出的排列
	}
	
	this.isDAG = function(){
		if(order!=null){
			return true;
		}else{
			return false;
		}
	}
}

//------------------有向图中的强连通性  算法第四版381页证明-----------------------------//
//----------------强连通分量为顶点集,各个集内的顶点互相具有强连通性-------------------//
var KosarajuSCC = function(){
	
	this.Init = function(){  
		this.marked = new Array(); 		
		this.count = 0;//强连通分量的数量
		this.id = new Array();//强连通分量标志符,当两个顶点id值相等,证明其处于同一个强连通分量之中
	}
	this.Init();
	
	this.KosarajuSCC = function(G){
		this.marked = new Array(G.get_V());
		for(var i=0;i<this.marked.length;i++){
			this.marked[i]=false;
		}
		this.id = new Array(G.get_V());
		
		var order=new DepthFirstOrder();//注意此处与无向图求连通量的区别
		order.DepthFirstOrder(G.reverse());
		var arr=order.get_reversePost();//先求图G的反向图的逆后序排列,存于arr
		
		for(var s=0;s<arr.length;s++){//本来s是从0,1,2.....V的顺序求深度优先搜索,经过修改后,s遍历的顺序改变为G(反向)的逆后序排列 1,0,2,4,5,3.......
			if(!this.marked[arr[s]]){
				this.dfs(G,arr[s]);
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
	this.stronglyConnected = function(v,w){//判断两个顶点是否强连通的
		return (this.id[v]==this.id[w])?true:false;
	}
	this.get_id = function(v){//获得顶点v位于哪个强连通分量内
		return id[v];
	}
	this.get_count = function(){//获得图里有多少个强连通分量
		return count;
	}
}


