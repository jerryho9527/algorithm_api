function sortUp(){
	var graph=[[0,5],[4,3],[0,1],[9,12],[6,4],[5,4],[0,2],[11,12],[9,10],[0,6],[7,8],[9,11],[5,3]];//graph为输入的图结构数组,其结构为两个连接的顶点的值
	// var graph=[[0,5],[2,4],[2,3],[1,2],[0,1],[3,4],[3,5],[0,2]];
	// var graph=[[0,1],[0,2],[0,5],[0,6],[1,3],[3,5],[4,5],[4,6],[6,7],[7,8],[8,10],[9,10],[9,11],[10,12],[11,12]];//二分图样例
	var k=new Graph();
	k.Insert(graph);
	// k.Show();
	
	// var dfs=new DepthFirstSearch();//深度优先搜索  以0为起点
	// dfs.DepthFirstSearch(k,0);
	// var a=dfs.pathTo(3);//同样0-3的路径,两种搜索方式的路径是不同的
	
	// var bfs=new BreadthFirstSearch();//广度优先搜索  以0为起点
	// bfs.BreadthFirstSearch(k,0);
	// var b=bfs.pathTo(3);
	
	var cc=new CC();//连通分量搜索
	cc.CC(k);
	cc.connected_sort();
	
	// var cycle=new Cycle();//是否有环判断
	// cycle.Cycle(k);
	// var c=cycle.get_Cycle();
	
	// var two_color=new TwoColor();//是否二分图判断
	// two_color.TwoColor(k);
	// var color=two_color.isBipartite();
}
