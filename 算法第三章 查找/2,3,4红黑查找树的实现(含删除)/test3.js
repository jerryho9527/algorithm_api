//2,3,4红黑树的性质
//(1)每个节点是红色的或者黑色的
//(2)根节点是红色的
//(3)每个叶子节点是黑色的
//(4)如果一个节点是红色的,那么它的两个子节点是黑色的
//(5)对每个节点,该节点到所有叶子节点的路径上,黑色节点数目相等

//本例与2,3红黑树的区别在于将colorflip的顺序提前,使右红子节点有可能存在

function sortUp(){	
	// var data=['E','A','S','Y','Q','U','T','I','O','N']; 
	var data=[41,38,31,12,19,8,15,16];
	var value=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
	
	var root=new Node();//以下构造二叉树
	  
	for(var i=0;i<data.length;i++)
	{
		root=root.add(root,data[i],value[i]);
		root.color=black;//注:必要!重置根节点的color为黑,使其保持红黑树的性质(2)
	}
	
	// root=root.del(root,'E');
	// root=root.del(root,'O');
	// root=root.del(root,'Q');
	// root=root.del(root,'Y');
	// root=root.del(root,'A');
	root=root.del(root,16);
}



