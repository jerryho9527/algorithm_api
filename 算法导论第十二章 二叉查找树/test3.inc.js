//二叉查找(排序)树的实现
function Node()//二叉查找树的节点包含
{
  this.left=null;//左节点
  this.right=null;//右节点
  this.key=null;//键
  this.value=null;//值
  this.number=1;//以该节点为根节点,其所有子节点(含自身)的节点计数器
           //公式为空链接为0,非空 子节点数=左子树节点数+右子树节点数+1
}

Node.prototype.add=function(key,value)//子节点的增加*
{   
   if(key!=null && typeof key != 'undefined')
   {
       if(this.key==null)//当树为空,将键值赋予第一个节点,使其成为根节点
	   {
		   this.key=key;
		   this.value=value;
		   return;
	   }	   
	   var node=new Node();//建立一个新节点,其键与值为输入值.
       node.key=key;   
	   node.value=value;
	   //通过判断输入的键与当前的根节点的键做对比
	   //(一)若小于当前根的键,判断当前根节点左子节点是否为空
	   //     1)若为空,将新的节点添加到左子节点
	   //     2)若不为空,将根节点移动到其左子节点上,递归add函数,对新的根节点
	   //     进行重新判断,直到能成功添加新的节点
	   //----------------------------------------------------------//
	   //(二)若大于当前根的键,判断当前根节点右子节点是否为空
	   //     1)若为空,将新的节点添加到右子节点
	   //     2)若不为空,将根节点移动到其右子节点上,递归add函数,对新的根节点
	   //     进行重新判断,直到能成功添加新的节点
	   //----------------------------------------------------------//
	   //(三)若等于当前根的键,直接跟新根节点的值为新的输入值
	   //----------------------------------------------------------//
	   if(this.key > key)// on left
	   {	   
	      if(this.left==null)
		  {		     
			 this.left=node;
		  }
		  else
		  {			 
		     this.left.add(key,value);
		  }
	   }
	   else if(this.key < key)// on right
	   {
	      if(this.right==null)
		  {		     
			 this.right=node;
		  }
		  else
		  {		    
			this.right.add(key,value);
		  }
	   }
	   else if(this.key == key)// equare
	   {
		   this.value = value;
	   }
	   
	   this.number=this.size(this.left)+this.size(this.right)+1;	   
   }
}

Node.prototype.get=function(key)//查找是否有键为key的节点
{
	if(key!=null && typeof key != 'undefined')
	{
		if(this == null){//如果树为空,返回空值
			return null;
		}
		if(this.key == key){//如果查找命中,返回该节点的值
			return this.value;
		}else if(this.key > key){//如果查找不命中,按照键值的大小递归至左或右子节点
			//当其应出现的左或右子节点为空时,判断其为不存在该键值,返回null
			if(this.left==null){return null};
			return(this.left.get(key));
		}else if(this.key < key){
			if(this.right==null){return null};
			return(this.right.get(key));
		}
	}else{
		return false;
	}	
}

Node.prototype.min=function()//返回树的键最小值节点
{
	if(this.left==null){
		return this; 
	}else{
		return this.left.min();
	}
}

Node.prototype.max=function()//返回树的键最大值节点
{
	if(this.right==null){
		return this; 
	}else{
		return this.right.min();
	}
}

Node.prototype.select=function(k)//返回键值排名为k(从1开始)的节点
{
	if((k==null)||(this==null)){
		return null;
	}
	if((this.size(this.left)+1)==k){//若该节点左子树总节点数加1等于k,返回当前节点
		return this;
	}else if((this.size(this.left)+1)>k){//若子树节点数加1大于k,该节点应位于左子树
		return this.left.select(k);//内,将根节点移向其左子节点,递归select(k)
		
	}else if((this.size(this.left)+1)<k){//若子树节点数加1小于k,该节点位于右子树内
		var temp=this.size(this.left)+1;//将根节点移向其右子节点,因为原根节点为第
		if(this.right==null)return null;//temp个元素,目标节点应为从temp开始的第
		return this.right.select(k-temp);//(k-temp)个元素,递归select(k-temp)
	}                                   
}

Node.prototype.delMin=function()//删除树的键最小值节点
{
	if(this.left==null){
		return this.right; //当节点的左子节点为空,该节点为最小节点,返回其右子节点
	}
	this.left=this.left.delMin();//对当前节点的左子节点递归运行delMin,当最小节点
	                     // 被删除以后,将被删除节点的右子节点拼接回上一节点的左
					     // 子节点上,并更新其子节点数量,修复树完毕
	this.number=this.size(this.left)+this.size(this.right)+1;
	return this;
}

Node.prototype.del=function(key)//删除键值为key的节点**
{
	if(this==null){//若树为空,返回空值
		return null;
	}
	if(this.key>key){//从根节点开始,判断当前节点与key的大小关系,当前节点key大于key
		if(this.left==null)return this;//当前节点向左移动,反之向右移动,同时判断当
		this.left=this.left.del(key);//节点移动至边界仍未匹配,判断key无法匹配,不更
	}else if(this.key<key){//改任何节点
		if(this.right==null)return this;
		this.right=this.right.del(key);
	}else if(this.key==key){//当移动到key匹配的节点时,分析该节点的子节点情况
		if(this.left==null){//  1)当该节点为无子节点,直接删除(返回null与父节点拼接)
			return this.right;//2)当该节点为单子节点,将其子节点代替自身与父节点拼接  
		}else if(this.right==null){
			return this.left;
		}
		var t=new Node();//  3)当该节点为双子节点
		t=this;          //     1.将当前节点备份
		this.key=t.right.min().key;//2.选择当前节点的右子树中的最小值,即当前节点的
		this.value=t.right.min().value;//后继节点(紧接下一个的节点),将其代替当前节
		t.right.delMin();//点的位置,同时对原右子树进行删除最小值的操作,去除原后继
		this.left=t.left;//节点,将当前新节点与原左子树,新右子树进行拼接,并更新number
		this.right=t.right;//值,完成删除节点操作
	}
	this.number=this.size(this.left)+this.size(this.right)+1;
	return this;
}

Node.prototype.print=function(data)//打印排序数组键,输出至数组data内(二叉树中序遍历)
{
   if(this.left!=null)
   {
     this.left.print(data);//先递归输出根节点的左子树
   }   
   data.push(this.key);//输出根节点
   if(this.right!=null)
   {
      this.right.print(data);  //递归输出根节点的右子树
   }   
}

Node.prototype.size=function(x)//返回节点x的子节点数
{
	if(x==null){
		return 0;
	}else{
		return x.number;
	}
}

//extra
Node.prototype.height=function()//返回二叉树最大深度
{
	if(!((this.left==null)&&(this.right==null))){
		if(this.left!=null){
			var a=this.left.height();//递归深入各条子树,从下往上通过各层数加1,并
		}else if(this.left==null){//向上返回层数的最大值,得出最大层数
			a=0;
		}
		if(this.right!=null){
			var b=this.right.height();
		}else if(this.right==null){
			b=0;
		}
		if(a>b){
			return a+1;
		}else if(b>=a){
			return b+1;
		}
	}
	return 0;
}

Node.prototype.heightOfLeast=function()//返回二叉树最小深度
{
	if(!((this.left==null)&&(this.right==null))){
		if(this.left!=null){
			var a=this.left.height();//递归深入各条子树,从下往上通过各层数加1,并
		}else if(this.left==null){//向上返回层数的最小值,得出最小层数
			a=0;
		}
		if(this.right!=null){
			var b=this.right.height();
		}else if(this.right==null){
			b=0;
		}
		if(a>b){
			return b+1;
		}else if(b>=a){
			return a+1;
		}
	}
	return 0;
}



