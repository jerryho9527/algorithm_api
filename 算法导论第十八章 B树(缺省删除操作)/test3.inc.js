//B树的实现(算法第四版279页) 缺省删除操作
//注:B树的最小度数t (且t>=2) 的意义:例 t=3 ,意味每个B树的节点的子节点最小为3个,也即每个节点内包含的关键字最少为(t-1)=2个,也即每个B树的节点内包含的关键字最多为(2t-1)=5个,当关键字超过5个,则节点自动分裂成为高度为2的子树

function Node(t)//B树的节点包括
{
	this.n=t;//当前存储在节点中的关键字个数(样例设置为5,即一个节点内最多储存5个关键字)
	this.key=new Array();//n个关键字本身为数组,存储字符,数字等信息
	this.leaf=true;//如果节点为叶子节点,this.leaf为true,如果为内部节点,this.leaf为false
	this.c=new Array();
}

Node.prototype.BTreeSearch=function(x,k)//B树的搜索,x为起始节点,k为待搜索的关键字
{
	var i=0;
	while((i<x.key.length)&&(k>x.key[i])){
		i++;
	}
	if((i<x.key.length)&&(k==x.key[i])){
		return [x,i];//返回值为待搜索元素所在的节点以及其所在的位置(从0开始),所组合成的数组
	}else if(x.leaf){
		return null;//若直到叶子节点还没有匹配的元素,搜索失败,返回null
	}else{
		return this.BTreeSearch(x.c[i],k);
	}	
}

BTreeCreate=function(T)
{	
	var x=new Node();
	x.leaf=true;
	x.n=0;
	T.root=x;
}

Node.prototype.BTreeInsert=function(root,k)
{
	var t=root.n;
	if(root.key.length==(2*t-1)){
		var s=new Node();
		s.leaf=false;
		s.n=t;
		s.c[0]=root;
		this.BTreeSplitChild(s,0);
		this.BTreeInsertNonFull(s,k);
		return s;
	}else{
		this.BTreeInsertNonFull(root,k);
		return root;
	}
}

Node.prototype.BTreeInsertNonFull=function(x,k)//将关键字k插入未满节点x内
{
	var i=x.key.length;
	var t=x.n;
	if(x.leaf){//若x为叶子节点,将k直接插入x.key的适当位置中
		i--;
		while((i>=0)&&(k<x.key[i])){
			x.key[i+1]=x.key[i];
			i--;
		}
		x.key[i+1]=k;
	}else{//若x非叶子节点,必须将k插入以内部节点x为根的子树中合适的叶节点中去
		while((i>=0)&&(k<x.key[i-1])){
			i--;
		}
		if(x.c[i].key.length==(2*t-1)){
			this.BTreeSplitChild(x,i);
			if(k>x.key[i]){
				i++;
			}
		}
		this.BTreeInsertNonFull(x.c[i],k);
	}
}


Node.prototype.BTreeSplitChild=function(x,i)//分裂B树中关键字个数已满的节点,将原节点拆分为两个新节点,并将最中间的关键字上移至父节点中,x为待分裂节点的父节点,x.c[i]为需要分裂的节点
{
	// var t=4;
	// var i=1;
	
	var t=x.n;
	var y=x.c[i];//x为待分裂节点的父节点,y为待分裂的满节点
	var z=new Node(t)
	
	for(var j=0;j<t-1;){//将y.key后半部分共(t-1)个关键字转移至z.key中
		z.key.push(y.key.splice(j+t,1)[0]);
		if(y.key.length==t){
			break;
		}
	}
	//-----------------------------------
	if(!y.leaf){//如果y,z非叶子节点,则将y.c的关键字较大后半部分转移至z.c中
		for(var j=0;j<t;){
			z.c.push(y.c.splice(j+t,1)[0]);
			if(y.c.length==t){
				break;
			}
		}
	}
	//------------------------------------
	for(var j=x.c.length-1;j>i;j--){//在x.c中添加新节点z的位置
		x.c[j+1]=x.c[j];
	}
	x.c[i+1]=z;
	//-------------------------------------
	for(var j=x.key.length-1;j>i-1;j--){//将y.key中间的关键字上升至根节点x中
		x.key[j+1]=x.key[j];
	}	
	x.key[i]=y.key[t-1];
	y.key.pop();
	//-------------------------------------	
}


