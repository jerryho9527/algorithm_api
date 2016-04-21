//优先队列,最大堆的实现 || 堆排序的实现 算法(第四版) 207页
//注:堆排序的操作对象皆为不考虑0位,从1位开始
function sortUp(){	
	var graph=['S','O','R','T','E','X','A','M','P','L','E'];
	var graph_2=[[1,'S'],[2,'O'],[3,'R'],[4,'T'],[5,'E'],[6,'X'],[7,'A'],[8,'M'],[9,'P'],[10,'L'],[11,'E']];
	
	var pq=new MinPQ();//单字优先队列
	pq.Insert(graph);
	var arr=pq.getSort();
	
	var indexpq=new IndexMinPQ();//带索引的优先队列
	for(var i=0;i<graph_2.length;i++){
		indexpq.Insert(graph_2[i][0],graph_2[i][1]);
	}
	var arr_2=indexpq.getSort();
	indexpq.change(7,'G');
	var a=indexpq.min();
	var b=indexpq.delMin();
	
	var sort=new pqSort();//堆排序样例(从大到小)  堆排序与优先队列的区别,堆排序为从大到小的排序,堆有序只是堆顶为最大值
	sort.Insert(graph);
	var arr=sort.getSort();
}



