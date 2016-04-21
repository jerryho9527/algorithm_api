

//-----------------------------------------------//
//-----基于2,3树的红黑树代码(无删除操作)-------//
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
	this.number=1;//以该节点为根节点,其所有子节点(含自身)的节点计数器
           //公式为空链接为0,非空 子节点数=左子树节点数+右子树节点数+1
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

Node.prototype.size=function(x)//返回节点x的子节点数
{
	if(x==null){
		return 0;
	}else{
		return x.number;
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
	y.number = x.number;
	x.number = x.size(x.left)+x.size(x.right)+1;
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
	y.number = x.number;
	x.number = x.size(x.left)+x.size(x.right)+1;
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
	   
		if(!(node_h.isRed(node_h.left))&&(node_h.isRed(node_h.right))){
			node_h=node_h.rotateLeft(node_h);//情况(1)
		}
	   
		if((node_h.isRed(node_h.left))&&(node_h.isRed(node_h.left.left))){
			node_h=node_h.rotateRight(node_h);//情况(2)
		}
	   
		if((node_h.isRed(node_h.left))&&(node_h.isRed(node_h.right))&&!(node_h.isRed(node_h))){
			node_h.flipColors(node_h);//情况(3)
		}	   
	   
		node_h.number=node_h.size(node_h.left)+node_h.size(node_h.right)+1;
		return node_h;
	}
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


//delete about




