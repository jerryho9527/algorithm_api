//本文件的最小生成路径都以最小索引值的顶点为起点  
function sortUp(){
	var graph=[[4,5,0.35],[4,7,0.37],[5,7,0.28],[0,7,0.16],[1,5,0.32],[0,4,0.38],[2,3,0.17],[1,7,0.19],[0,2,0.26],[1,2,0.36],[1,3,0.29],[2,7,0.34],[6,2,0.40],[3,6,0.52],[6,0,0.58],[6,4,0.93]];

	var k=new EdgeWeightedGraph();//加权无向图类
	k.Insert(graph);
	// k.Show();
	
	// var prim_lazy=new LazyPrimMST();
	// prim_lazy.LazyPrimMST(k);
	// var arr=prim_lazy.edges();
	//
	// var prim=new PrimMST();
	// prim.PrimMST(k);
	// var arr_2=prim.edges();

	var kruskal=new KruskalMST();
	kruskal.KruskalMST(k);
	var arr_3=kruskal.edges();

}
