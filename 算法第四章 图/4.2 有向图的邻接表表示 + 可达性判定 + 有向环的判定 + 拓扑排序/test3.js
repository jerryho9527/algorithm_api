function sortUp(){
	var graph=[[4,2],[2,3],[3,2],[6,0],[0,1],[2,0],[11,12],[12,9],[9,10],[9,11],[8,9],[10,12],[11,4],[4,3],[3,5],[7,8],[8,7],[5,4],[0,5],[6,4],[6,9],[7,6]];
	// var graph=[[0,6],[0,1],[0,5],[2,3],[2,0],[3,5],[5,4],[6,4],[6,9],[8,7],[7,6],[9,10],[9,12],[9,11],[11,12]];//有向无环图例
	// var graph=[[0,1],[0,5],[2,0],[2,3],[3,2],[3,5],[4,2],[4,3],[5,4],[6,0],[6,4],[6,9],[7,6],[7,8],[8,7],[8,9],[9,10],[9,11],[10,12],[11,4],[11,12],[12,9]];//强连通分量图例
	
	var k=new Digraph();//有向图类
	k.Insert(graph);
	k.Show();
	// k=k.reverse();//反转k的边的方向
	// k.Show();
	// var a=k.hasEdge(11,4);//检测两顶点间是否有边
	
	// var direct=new DirectedDFS();//可达性检测
	// direct.DirectedDFS(k,0);
	// var a=direct.get_marked(11);//对于起点0,节点3是否可达?
	
	// var direct_2=new DirectedDFS();//可达性检测
	// direct_2.DirectedDFS(k,[1,2,6]);
	// var b=direct_2.get_marked(3);//对于起点集[0,8],节点3是否可达
	
	var cycle=new DirectedCycle();//有向环检测
	cycle.DirectedCycle(k);
	var c=cycle.get_cycle();
	
	// var order=new DepthFirstOrder();//基于深度优先搜索的顶点排序
	// order.DepthFirstOrder(k);
	// var reverse_post=order.get_reversePost();
	
	// var topo=new Topological();//拓扑排序
	// topo.Topological(k);
	// var order=topo.get_order();
	
	// var scc=new KosarajuSCC();//强连通量检测
	// scc.KosarajuSCC(k);
	
	// var degree=new Degrees();//图的顶点的出度,入度
	// degree.Degrees(k);
	// var a=degree.inDegree(4);
	// var arr_1=degree.sources();
	// var arr_2=degree.sinks();
	// var b=degree.isMap();
}
