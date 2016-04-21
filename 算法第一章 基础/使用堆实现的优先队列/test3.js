//注:堆排序的操作对象皆为不考虑0位,从1位开始
function sortUp(){	
	var a=[0,'S','O','R','T','E','X','A','M','P','L','E'];
	// var a=[0,1,2,3,4,5,6,7,8,9]
	
	var pq=new MinPQ();
	pq.Insert(a);
	var m=pq.getSort();
	var b=pq.Pop();
	var m=pq.getSort();
	
	
	
	
	
}



