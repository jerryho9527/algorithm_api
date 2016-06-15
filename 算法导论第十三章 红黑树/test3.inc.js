//注:本程序剩下一个问题,在RB_FixUp函数内,在paper说明的case3 的情况3 ,需要向上迭代的还没有完成

//-----------------------------------------------//
//-----基于2,3,4树的红黑树代码(含删除操作)-----//
////本例与2,3红黑树的区别在于将colorflip的顺序提前,使右红子节点有可能存在//
//----------------------------------------------//


//二叉红黑树的实现(比二叉查找树增加了颜色属性)
//红黑树的性质
//(1)每个节点是红色的或者黑色的
//(2)根节点是黑色的
//(3)每个叶子节点是黑色的
//(4)如果一个节点是红色的,那么它的两个子节点是黑色的
//(5)对每个节点,该节点到所有叶子节点的路径上,黑色节点数目相等
black=false;
red=true;
function Node()//二叉红黑树的节点包含
{
	this.left=null;//左节点
	this.right=null;//右节点
	this.p=null;//父节点
	this.key=null;//键
	this.value=null;//值
	this.color=black;//当color为默认black,从父节点指向它的链接约定为黑色链接
			 //若为red,约定为红色链接,则该节点可与父节点合成一个二元素节点
			 //且空链接为black
}

Node.prototype.isRed=function(h)//判断当前节点是否红节点(由红链接所指向)
{
	if(h==null){
		return false;
	}
	if(h.color==red){
		return true;
	}else if(h.color==black){
		return false;
	}
}

// red & black

Node.prototype.rotateLeft=function(x)//左旋操作(旋转轴为 this.node也就是h)
{
	var y = new Node();
	y = x.right;
	if(y.left!=null){
		y.left.p=x;
	}
	y.p=x.p;
	if(x.p==null){
		y.p=null;
	}else if(x==x.p.left){
		x.p.left=y;
	}else{
		x.p.right=y;
	}
	x.right = y.left;	
	y.left = x;
	y.color = x.color;
	x.color = red;
	x.p=y;
	return y;
	//示例用法: root=root.rotateLeft(root); 将root节点与root.right节点的右斜连线向左旋转成
	//左斜的红链接
}

Node.prototype.rotateRight=function(x)//右旋操作(旋转轴为 this.node也就是h)
{
	var y = new Node();
	y = x.left;
	if(y.right!=null){
		y.right.p=x;
	}
	y.p=x.p;
	if(x.p==null){
		y.p=null;
	}else if(x==x.p.left){
		x.p.left=y;
	}else{
		x.p.right=y;
	}
	x.left = y.right;
	y.right = x;
	y.color = x.color;
	x.color = red;
	x.p=y;
	return y;
	//示例用法: root=root.rotateRight(root); 将root节点与root.right节点的左斜连线向右旋转成
	//右斜的红链接
}

Node.prototype.rotateLeftRaw=function(x)//左旋操作(旋转轴为 this.node也就是h)
{
	var y = new Node();
	y = x.right;
	if(y.left!=null){
		y.left.p=x;
	}
	y.p=x.p;
	if(x.p==null){
		y.p=null;
	}else if(x==x.p.left){
		x.p.left=y;
	}else{
		x.p.right=y;
	}
	x.right = y.left;	
	y.left = x;
	x.p=y;
	return y;
	//示例用法: root=root.rotateLeft(root); 将root节点与root.right节点的右斜连线向左旋转成
	//左斜的红链接
}

Node.prototype.rotateRightRaw=function(x)//右旋操作(旋转轴为 this.node也就是h)
{
	var y = new Node();
	y = x.left;
	if(y.right!=null){
		y.right.p=x;
	}
	y.p=x.p;
	if(x.p==null){
		y.p=null;
	}else if(x==x.p.left){
		x.p.left=y;
	}else{
		x.p.right=y;
	}
	x.left = y.right;
	y.right = x;
	x.p=y;
	return y;
	//示例用法: root=root.rotateRight(root); 将root节点与root.right节点的左斜连线向右旋转成
	//右斜的红链接
}

Node.prototype.flipColors=function(h)//对一个拥有两个红色子节点的节点进行颜色转换,使其子节点皆成为黑
{                          //色,而自身变成红色节点与其父节点相连(就是把3-节点的中间值顶到
	                       //了上一层)
	h.color = red;
	h.left.color = black;
	h.right.color = black;
}


Node.prototype.add=function(node_h,key,value)//红黑树子节点的增加**
{
	if(key!=null && typeof key != 'undefined')
	{
		if(node_h.key==null)//当树为空,将键值赋予第一个节点,使其成为根节点
		{
			node_h.key=key;
			node_h.value=value;
			return node_h;
		}	   
		var node=new Node();//建立一个新节点,其键与值为输入值.
		node.key=key;   
		node.value=value;
		node.color=red;//新增加的节点设置为红链接,以便与父节点结合
		
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
	   
		if(node_h.key > key)// on left
		{	   
			if(node_h.left==null)
			{		     
				node_h.left=node;
				node.p=node_h;
			}
			else
			{			 
				node_h.left = node_h.left.add(node_h.left,key,value);//注:需要将左子节点更新
			}
		}
		else if(node_h.key < key)// on right
		{
			if(node_h.right==null)
			{		     
				node_h.right=node;
				node.p=node_h;
			}
			else
			{		    
				node_h.right = node_h.right.add(node_h.right,key,value);//注:需要将右子节点更新
			}
		}
		else if(node_h.key == key)// equare
		{
			node_h.value = value;
		}
	   
	   //----------------------算法第四版279页-----------------------//
	   //以下为 二叉红黑树插入 比 二叉查找树插入 多出的独特判断过程
	   //(1)当右子节点为红色,左子节点为黑色(违背了性质(5)),以其为轴进行左旋转
	   //(2)当其左子节点为红色,其左子节点的左子节点也是红色(违背了性质(4)),以其为轴进行右旋转
	   //(3)当左,右子节点都为红色,自身节点为黑色(违背了性质(4)),进行颜色转换(就是3-节点构建完毕,将中间值向上层送)
	   //------------------------------------------------------------//
	   //当插入一个新的红节点时,分析父节点
	   //(1)当父节点为2-节点,新节点与父节点组成3-节点(完成)
	   //(2)当父节点为3-节点时,情况有3
	   //	1.插入大于父节点的两个节点,形成情况(3),进行颜色变换(完成)
	   //	2.插入小于父节点的两个节点,形成情况(2),以中值为轴右旋,形成情况(3),颜色转换(完成)
	   //	3.插入位于父节点的两个节点之间,形成情况(1),以最小值为轴左旋,形成情况(2),然后如2.操作
		
		if((node_h.isRed(node_h.left))&&(node_h.isRed(node_h.right))&&!(node_h.isRed(node_h))){
			node_h.flipColors(node_h);//情况(3) //colorflip判断提前了,使得右红子节点可以存在
		}	
		
		if(!(node_h.isRed(node_h.left))&&(node_h.isRed(node_h.right))){
			node_h=node_h.rotateLeft(node_h);//情况(1)
		}
	   
		if((node_h.isRed(node_h.left))&&(node_h.isRed(node_h.left.left))){
			node_h=node_h.rotateRight(node_h);//情况(2)
		}
	   
		return node_h;
	}
}


Node.prototype.print=function(data)//打印排序数组键,输出至数组data内(二叉树中序遍历)
{
   if(this.left!=null)
   {
     this.left.print(data);//先递归输出根节点的左子树
   }   
   if(this.key!=null){data.push(this.key);}//输出根节点
   if(this.right!=null)
   {
      this.right.print(data);  //递归输出根节点的右子树
   }   
}

Node.prototype.add_T_Nil=function()//二叉树中序遍历,为所有叶子节点的左右子节点增加哨兵T.nil
{                                  //以适应删除操作
   var a=new Node();
   var b=new Node();
   if(this.left!=null)
   {
     if(this.left.key!=null)this.left.add_T_Nil();//先递归输出根节点的左子树
   }   
   if(this.left==null)this.left=a;a.p=this;
   if(this.right==null)this.right=b;b.p=this;
   if(this.right!=null)
   {
      if(this.right.key!=null)this.right.add_T_Nil();  //递归输出根节点的右子树
   }   
}

//红黑树的删除操作部分

Node.prototype.sibling=function(n)//找出键为 n 的节点的兄弟节点
{
	if(n.p==null){
		return null;
	}else if(n==n.p.left){
		return n.p.right;
	}else{
		return n.p.left;
	}
}

Node.prototype.min=function()//返回树的键最小值节点
{
	if((this.left==null)||(this.left.key==null)){
		return this; 
	}else{
		return this.left.min();
	}
}

Node.prototype.max=function()//返回树的键最大值节点
{
	if((this.right==null)||(this.right.key==null)){
		return this; 
	}else{
		return this.right.min();
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
	return this;
}

Node.prototype.RB_Transplant=function(root,u,v)
{
	if(v==null){
		v=new Node();
	}
	if(u.p==null){
		root=v;
	}else if(u==u.p.left){
		u.p.left=v;
	}else{
		u.p.right=v;
	}
	v.p=u.p;
	root=v;
	return root;
}


Node.prototype.del=function(root,key)//删除键值为key的节点**      
{
	this.add_T_Nil();
	//已解决的问题:参照<算法导论>,在每个叶子节点的子节点添加哨兵节点,键为null,但有p属性
	 //因此可以对其进行RB_FixUp的操作
	var z=new Node();
	z=root;
	
	if(z==null){//若树为空,返回空值
		return null;
	}
	if(z.left.key==key){//当移动到与key匹配的节点的父节点时,按照匹配节点位于左`右子节点分析
	
		var k=z;//选出一个k节点当成匹配节点的父节点
		z=z.left;
		
		var x=new Node();
		var y=new Node();
		y=z;
		var y_origin_color=y.color;		
		
		if(z.left.key==null){                 //-------------------------------//
			x=z.right;                        //此段为判断待删除的节点是否拥有
			z=this.RB_Transplant(z,z,z.right);//单子节点,若否,则为双子节点
			x=z;k=z;
		}else if(z.right.key==null){          //单子节点,空缺x为自身
			x=z.left;			              //双子节点,空缺x为后继
			z=this.RB_Transplant(z,z,z.left);
			x=z;k=z;                          //--------------------------------//
		}else{
			var flag=1;
			y=z.right.min();//取y为z的后继结点
			y_origin_color=y.color;
			x=y.right;
			if(y.p==z){//paper: case3-情况(1)
				x.p=y;
				var temp=new Node();
				temp=y;
			}else{
				var temp=new Node();
				temp=y;
				y=this.RB_Transplant(y,y,y.right);//备份y,并将y与子节点作一次传递
				temp.right=z.right;
				temp.right.p=temp;
				if(y.color==red){
					y_origin_color=y.color;
					y.color=black;
				}
			}
			temp=this.RB_Transplant(z,z,temp);//将z与y的备份作一次传递,完成后新z为原y所移动
			temp.left=z.left;   //新y为原x所移动,并判断当 原y 的颜色不同情况时是否需要Fix
			temp.left.p=temp;
			temp.color=z.color;
			z=temp;
			
			k=z;			
		}
		
		if(y_origin_color==black)//注:只有当真正删除的节点y为黑节点时需要Fix颜色
		{
			 //以下进入paper的 case3 判断
			k=this.RB_FixUp(x);
		}	
		
		if(flag==1){
			root=k.p;
		}else{
			root=k;
		}
		
		
	}else if(z.right.key==key){//当移动到key匹配的节点时,分析该节点的子节点情况
		var k=z;
		z=z.right;
		var x=new Node();
		var y=new Node();
		y=z;
		var y_origin_color=y.color;		
		
		if(z.left.key==null){                 //-------------------------------//
			x=z.right;                        //此段为判断待删除的节点是否拥有
			z=this.RB_Transplant(z,z,z.right);//单子节点,若否,则为双子节点
			x=z;k=z;
		}else if(z.right.key==null){          //单子节点,空缺x为自身
			x=z.left;			              //双子节点,空缺x为后继
			z=this.RB_Transplant(z,z,z.left);
			x=z;k=z;                          //--------------------------------//
		}else{
			var flag=1;
			y=z.right.min();//取y为z的后继结点
			y_origin_color=y.color;
			x=y.right;
			if(y.p==z){//paper: case3-情况(1)
				x.p=y;
				var temp=new Node();
				temp=y;
			}else{
				var temp=new Node();
				temp=y;
				y=this.RB_Transplant(y,y,y.right);//备份y,并将y与子节点作一次传递
				temp.right=z.right;
				temp.right.p=temp;
				if(y.color==red){
					y_origin_color=y.color;
					y.color=black;
				}
			}
			temp=this.RB_Transplant(z,z,temp);//将z与y的备份作一次传递,完成后新z为原y所移动
			temp.left=z.left;   //新y为原x所移动,并判断当 原y 的颜色不同情况时是否需要Fix
			temp.left.p=temp;
			temp.color=z.color;
			z=temp;
			
			k=z;			
		}
		
		if(y_origin_color==black)//注:只有当真正删除的节点y为黑节点时需要Fix颜色
		{
			 //以下进入paper的 case3 判断
			k=this.RB_FixUp(x);
		}	
		
		if(flag==1){
			root=k.p;
		}else{
			root=k;
		}

		
	}else if(z.key>key){//从根节点开始,判断当前节点与key的大小关系,当前节点key大于key
		if(z.left==null)return z;//当前节点向左移动,反之向右移动,同时判断当
		z.left=this.del(z.left,key);//节点移动至边界仍未匹配,判断key无法匹配,不更
	}else if(z.key<key){//改任何节点
		if(z.right==null)return z;
		z.right=this.del(z.right,key);
		
		
	}else if(z.key==key){
		var x=new Node();
		var y=new Node();
		y=z;
		var y_origin_color=y.color;	
		
		if(z.left.key==null){                 //-------------------------------//
			x=z.right;                        //此段为判断待删除的节点是否拥有
			z=this.RB_Transplant(z,z,z.right);//单子节点,若否,则为双子节点
			x=z;
		}else if(z.right.key==null){          //单子节点,空缺x为自身
			x=z.left;			              //双子节点,空缺x为后继
			z=this.RB_Transplant(z,z,z.left);
			x=z;                              //--------------------------------//
		}else{
			var flag=1;
			y=z.right.min();//取y为z的后继结点
			y_origin_color=y.color;
			x=y.right;
			if(y.p==z){//paper: case3-情况(1)
				x.p=y;
				var temp=new Node();
				temp=y;
			}else{
				var temp=new Node();
				temp=y;
				y=this.RB_Transplant(y,y,y.right);//备份y,并将y与子节点作一次传递
				temp.right=z.right;
				temp.right.p=temp;
				if(y.color==red){
					y_origin_color=y.color;
					y.color=black;
				}
			}
			temp=this.RB_Transplant(z,z,temp);//将z与y的备份作一次传递,完成后新z为原y所移动
			temp.left=z.left;   //新y为原x所移动,并判断当 原y 的颜色不同情况时是否需要Fix
			temp.left.p=temp;
			temp.color=z.color;
			z=temp;
			
			k=z;			
		}
		
		if(y_origin_color==black)//注:只有当真正删除的节点y为黑节点时需要Fix颜色
		{
			 //以下进入paper的 case3 判断
			k=this.RB_FixUp(x);
		}	
		
		root=k;
		
	}
	return root;
}

Node.prototype.RB_FixUp=function(x)//注:这里的x为节点删除所产生移动后,真正空缺的节点
//如:当符合key的节点z为单子节点或无子节点时,z由自身的子节点或T.nil哨兵所代替,因此空
//洞为自身,进行参考时的兄弟节点w为 原x 的兄弟节点
//当z为双子节点时,z由其后继结点所代替,因此空洞为其后继结点,因此参考的兄弟节点w为原
//后继结点的兄弟节点
{
	while((x.p!=null)&&(x.color==black)){
		if(x==x.p.left){//判断x是x.p的哪一个子节点,决定旋转方向
			var w=x.p.right;
			if(w.color==red){//paper: case3-情况(2)
				w.color=black;
				x.p.color=red;
				x.p.p=this.rotateLeftRaw(x.p);//注:这个raw是不涉及颜色转换的旋转,颜色转换在外面完成
				w=x.p.right;
			}
			if((w.left.color==black)&&(w.right.color==black)){//paper: case3-情况(3)
				w.color=red;
				if(x.p.color==red){
					x.p.color=black;
					return x.p.p;
				}
				x=x.p;
				x.color=black;
				return this.RB_FixUp(x);//㈠
			}else if(w.right.color==black){//paper: case3-情况(5)
				w.left.color=black;
				w.color=red;
				w=this.rotateRightRaw(w);
				w=x.p.right;
			}
			w.color=x.p.color;//所有的目标都为将情况调整至情况6的样式,转换后才能得出结果
			x.p.color=black;//paper: case3-情况(6)
			w.right.color=black;
			w=this.rotateLeftRaw(x.p);
			return w;
			
		}else{
			var w=x.p.left;//与以上一段为镜像关系,也为paper内容的镜像关系
			if(w.color==red){
				w.color=black;
				x.p.color=red;
				x.p.p=this.rotateRightRaw(x.p);//注:这个raw是不涉及颜色转换的旋转,颜色转换在外面完成
				w=x.p.left;
			}
			if((w.left.color==black)&&(w.right.color==black)){
				w.color=red;
				if(x.p.color==red){
					x.p.color=black;
					return x.p.p;
				}
				x=x.p;
				x.color=black;
				return this.RB_FixUp(x);//㈡
			}else if(w.left.color==black){
				w.right.color=black;
				w.color=red;
				w=this.rotateLeftRaw(w);
				w=x.p.left;
			}
			w.color=x.p.color;
			x.p.color=black;
			w.left.color=black;
			w=this.rotateRightRaw(x.p);
			return w;
		}	
		
	}
	x.color=black;//此处为当以上 行(一),或行(二)进行迭代,上升至x.p节点时,由于情况(3),(4)
	              //之分,当新x为红时,迭代结束,若否,继续上升
	return x.p;
}


















