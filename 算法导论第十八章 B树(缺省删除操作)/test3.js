//算法导论十八章 B树
function sortUp(){
	var t=4;//设定最小度数t
	var data=['a','c','d','e','g','j','k','m','n','o','p','r','s','t','u','v','x','y','z'];
	
	var root=new Node(t);
	for(var i=0;i<data.length;i++){
		root=root.BTreeInsert(root,data[i]);
	}
	root=root.BTreeInsert(root,'w');
	
	var answer=root.BTreeSearch(root,'p');
	
	
}