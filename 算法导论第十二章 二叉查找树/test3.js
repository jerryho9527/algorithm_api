function sortUp(){	
	
	var data=[7,3,9,1,6,8,2,5,4]; 
	var value=[1,2,3,4,5,6,7,8];
	
	var root=new Node();
	  //以下构造二叉树
	for(var i=0;i<data.length;i++)
	{
		root.add(data[i],value[i]);
	}
}



