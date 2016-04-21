//算法(第四版) 5.2单词查找树

//-----------------------R向节点-------------------------//
var stringNode = function(val){//单词查找树的节点,每个节点含有R个链接,因此例子处限制字符串为小写字母,因此R=26,即每个节点隐含26个指向子节点的链接,第一条指向a,第二条指向b等等	
	this.val=arguments[0]?arguments[0]:null;	
	var R=26;
	this.next=new Array(R);
}

//---------------------------------基于单词查找树的符号表-----------------------------------
//-----R向单词查找树,树的节点有R条链接,每个非空链接的索引隐式地表示了它所对应的字符-----//
var TrieST = function(){
	this.root = null;//根节点
	
	//-------------------------------插入查找删除操作----------------------------------//
	this.get = function(key){//查找x为根节点时,单词查找树中与字符串key关联的值
		var x=this.get_i(this.root,key,0);//返回字符串key遍历路径的最后一个顶点
		if(x==null){
			return null;
		}else{
			return x.val;
		}
	}
	
	this.get_i = function(x,key,d){
		if(x==null){
			return null;
		}
		if(d==key.length){
			return x;
		}
		var c=key.charCodeAt(d)-97;
		return this.get_i(x.next[c],key,d+1);
	}
	
	this.put = function(key,val){//在单词查找树中加入为key的字符串,并在其位于树中的结尾节点赋上值val
		this.root=this.put_i(this.root,key,val,0);
	}
	
	this.put_i = function(x,key,val,d){
		if(x==null){
			x=new stringNode();
		}
		if(d==key.length){//当输入的key扫描至结尾时,对最后一个节点赋值val
			x.val=val;
			return x;
		}
		var c=key.charCodeAt(d)-97;//将字母以数字代表,此处默认字符串皆为小写字母,a转为0
		x.next[c]=this.put_i(x.next[c],key,val,d+1);
		return x;
	}
	
	this.delete = function(key){//从单词查找树删除'key'字符串
		this.delete_i(this.root,key,0);
	}
	
	this.delete_i = function(x,key,d){
		var R=26;
		if(x==null){
			return null;
		}
		if(d==key.length){
			x.val=null;
		}else{
			var c=key.charCodeAt(d)-97;
			x.next[c]=this.delete_i(x.next[c],key,d+1);
		}
		if(x.val!=null){
			return x;//如果值非空,不能删除节点(返回指向该节点的链接)
		}
		for(var c=0;c<R;c++){
			if(x.next[c]!=null){
				return x;//如果链接数组非空,不能删除节点(返回指向该节点的链接)
			}
		}
		return null;//如果该节点值和链接皆为空,删去该节点(返回一个空连接)
	}
	
	//----------------------------------查找键操作-------------------------------------//
	this.keys = function(){//获取单词查找树中所有字符串(前缀为空) 算法(第四版)478页
		return this.keysWithPrefix('');
	}
	
	this.keysWithPrefix = function(pre){//获取所有pre为前缀的字符串
		var q=new Queue();
		this.collect(this.get_i(this.root,pre,0),pre,q);//this.get_i(this.root,pre,0)返回从单词查找树走过字符串pre之后的最后一个顶点,该顶点即为已经先包含字符串pre,并以此为前缀的子单词查找树,且当pre='',前缀为空则该节点为根节点,返回所有节点(即方法key)
		return q;
	}
	
	this.collect = function(x,pre,q){
		var R=26;
		if(x==null){
			return;
		}
		if(x.val!=null){
			q.Push(pre);//保存从根节点往下走,每一个val不为null的节点(非空节点)至队列中
		}
		for(var c=0;c<R;c++){//遍历其子索引列表,对其非空部分(即指向的子节点)进行递归
			var str=String.fromCharCode(c+97);//将索引表中的数字c映射回字母,并存入队列中
			this.collect(x.next[c],pre+str,q);
		}
	}
	
	//----------------------------通配符匹配('.'匹配任意字符)---------------------------//
	this.keyThatMatch = function(pat){//pat为待匹配含通配符的字符串
		var q=new Queue();
		this.collect_i(this.root,'',pat,q);
		return q;
	}
	this.collect_i = function(x,pre,pat,q){//pre为储存从起点以来,遍历路径上的所有字符
		var R=26;
		var d=pre.length;
		if(x==null){
			return;
		}
		if((d==pat.length)&&(x.val!=null)){//若某字符串至pat结尾皆匹配,且该字符串存在(val!=null),则将其加入队列
			q.Push(pre);
		}
		if(d==pat.length){//若该字符串不存在,则返回
			return;
		}		
		var next=pat.charAt(d);
		for(var c=0;c<R;c++){
			var str=String.fromCharCode(c+97);//将索引表中的数字c映射回字母
			if((next=='.')||(next==str)){
				this.collect_i(x.next[c],pre+str,pat,q);
			}
		}
		
	}
}


//-------------------------------三向单词查找树符号表(算法(第四版)485页)----------------------------------//
var stringNode_2 = function(val){
	this.val=arguments[0]?arguments[0]:null;//节点中储存的值
	this.left=null;
	this.mid=null;//左中右三向单词查找树
	this.right=null;
	this.c=null;//节点中储存的字符
}
//------------------三向单词查找树,与R向单词查找树相比,区别是树中的节点只含有3个链接,分别对应当前字母小于,等于,大于节点字母的所有键,节点代表的字母显式地储存在节点中--------------------//
var TST = function(){
	this.root=null;
	
	this.get = function(key){//在查找时,首先比较输入键首字母与根节点的字母,若小于,选择左链接;如果较大,选择右链接;如果相等,选择中链接,然后使用相同的算法.如果遇到一个空连接,或当输入键结束时节点的值为空,则查找未命中||若值非空则查找命中
		var x=this.get_i(this.root,key,0);//从根节点、输入键的首位,开始查找
		if(x==null){
			return null;
		}else{
			return x.val;
		}
	}
	
	this.get_i = function(x,key,d){
		if(x==null){
			return null;
		}
		if(key==''){
			return this.root;//为下面的collect方法服务,当需要取的字符串为空,返回root节点
		}
		var c=key.charAt(d);//取待查找键d位字符
		if(c<x.c){//比较输入键d位字母与当前节点储存的字符
			return this.get_i(x.left,key,d);//若小于,选择左链接
		}else if(c>x.c){
			return this.get_i(x.right,key,d);//如果较大,选择右链接
		}else if(d<key.length-1){
			return this.get_i(x.mid,key,d+1);//如果相等,且待查找键未遍历完全,选择中链接(由于命中了第一个字符,所以将待查找键从d位右移一位)
		}else{
			return x;//返回递归最终到达的节点
		}		
	}
	
	this.put = function(key,val){//在插入新键时,先进行查找,然后补全键末尾的节点
		this.root=this.put_i(this.root,key,val,0);
	}
	
	this.put_i = function(x,key,val,d){
		var c=key.charAt(d);
		if(x==null){//在插入键过程向下推进时,若待插入的键在第d位的字符节点不存在,则为其新建一个节点,其储存的字符为当前第d位的字符
			x=new stringNode_2();
			x.c=c;
		}
		if(c<x.c){
			x.left=this.put_i(x.left,key,val,d);
		}else if(c>x.c){
			x.right=this.put_i(x.right,key,val,d);
		}else if(d<key.length-1){
			x.mid=this.put_i(x.mid,key,val,d+1);
		}else{
			x.val=val;//已到达待插入键的结尾,在结尾节点新增值val			
		}
		return x;
	}
	
	//----------------------------------查找键操作-------------------------------------//
	this.keys = function(){//获取单词查找树中所有字符串(前缀为空) 算法(第四版)478页
		var q=new Queue();
		if(this.root==null){			
			return q;
		}
		this.collect_x(this.root,'',q);
		return q;
	}
	
	this.keysWithPrefix = function(pre){//获取所有pre为前缀的字符串
		var q=new Queue();
		this.collect(this.get_i(this.root,pre,0),pre,q);//this.get_i(this.root,pre,0)返回从单词查找树走过字符串pre之后的最后一个顶点,该顶点即为已经先包含字符串pre,并以此为前缀的子单词查找树,且当pre='',前缀为空则该节点为根节点,返回所有节点(即方法key)
		return q;
	}
	
	this.collect = function(x,pre,q){
		if(x==null){
			return;
		}
		if(x.val!=null){
			q.Push(pre);//保存从根节点往下走,每一个val不为null的节点(非空节点)至队列中
		}
		if(x.mid!=null){
			if(x.mid.left!=null)this.collect(x.mid.left,pre+x.mid.left.c,q);
			if(x.mid.right!=null)this.collect(x.mid.right,pre+x.mid.right.c,q);
			this.collect(x.mid,pre+x.mid.c,q);
		}
	}
	
	this.collect_x = function(x,pre,q){//专为keys方法设计
		if(x==null){
			return;
		}
		if(x.val!=null){
			q.Push(pre+x.c);//保存从根节点往下走,每一个val不为null的节点(非空节点)至队列中
		}
		if(x.left!=null)this.collect_x(x.left,pre,q);
		if(x.right!=null)this.collect_x(x.right,pre,q);
		this.collect_x(x.mid,pre+x.c,q);
	}
	
	//----------------------------通配符匹配('.'匹配任意字符)---------------------------//
	this.keyThatMatch = function(pat){//pat为待匹配含通配符的字符串
		var q=new Queue();
		this.collect_i(this.root,'',pat,q);
		return q;
	}
	this.collect_i = function(x,pre,pat,q){//pre为储存从起点以来,遍历路径上的所有字符
		var d=pre.length;
		if(x==null){
			return;
		}
		if((d==pat.length-1)&&(x.val!=null)){//若某字符串至pat结尾皆匹配,且该字符串存在(val!=null),则将其加入队列
			q.Push(pre+x.c);
		}
		if(d==pat.length){//若该字符串不存在,则返回
			return;
		}		
		var next=pat.charAt(d);
		
		var str_1=x.c;
		if(x.left!=null) var str_2=x.left.c;
		if(x.right!=null) var str_3=x.right.c;
		
		if((next=='.')||(next==str_2)){
			if(x.left!=null)this.collect_i(x.left,pre,pat,q);
		}
		if((next=='.')||(next==str_3)){
			if(x.right!=null)this.collect_i(x.right,pre,pat,q);
		}
		if((next=='.')||(next==str_1)){
			this.collect_i(x.mid,pre+x.c,pat,q);
		}
			
	}
}