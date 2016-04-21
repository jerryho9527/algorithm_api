//2,3红黑树的性质
//(1)每个节点是红色的或者黑色的
//(2)根节点是红色的
//(3)每个叶子节点是黑色的
//(4)如果一个节点是红色的,那么它的两个子节点是黑色的
//(5)对每个节点,该节点到所有叶子节点的路径上,黑色节点数目相等

function sortUp(){	
	var data=['E','A','S','Y','Q','U','T','I','O','N']; 
	var value=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
	
	var root=new Node();//以下构造二叉树
	  
	for(var i=0;i<data.length;i++)
	{
		root=root.add(root,data[i],value[i]);
		root.color=black;//注:必要!重置根节点的color为黑,使其保持红黑树的性质(2)
	}
	
	var a=new Array();
	root.print(a);
	document.write(a);
	
}



