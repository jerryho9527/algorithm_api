//贪心算法求解霍夫曼编码(算法导论16.3)
var Huffman = function(C){
	
	this.Q=new IndexMinPQ();
	var n=C.length;
	for(var i=0;i<n;i++){
		this.Q.Insert(C[i][0],C[i][1]);//在优先队列里储存所有c的节点
	}
	for(var j=0;j<n-1;j++){//霍夫曼树的生成
		var z=new HuffmanNode();
		var x=this.Q.delMin();//每次取优先队列内最小值的两个节点进行合并,并将生成的新节点数重新加入优先队列内
		var y=this.Q.delMin();
		z.left=x;
		z.right=y;
		z.item=x.item+y.item;
		this.Q.Insert(z,z.item);//最后当所有的节点都聚集于一棵树上时,霍夫曼树生成完成,此时从顶点开始,左子树记'0',右子树记'1',当霍夫曼树向下生长时,将新的'0'或'1'添加至上一层的字符串以后,最后所有叶子节点的字符串则是其霍夫曼编码
	}
	
	this.getTree = function(){
		return this.Q.delMin();
	}
	
	this.getHuffmanCode = function(){
		var tree=this.Q.delMin();
		var code=new Array();
		var string='';
		this.getHuffmanCode_i(tree,string,code);
		return code;
	}
	
	this.getHuffmanCode_i = function(node,string,code){
		if(_typeof(node.index)!='string'){
			this.getHuffmanCode_i(node.index.left,string+'0',code);
			this.getHuffmanCode_i(node.index.right,string+'1',code);	
		}
		if(_typeof(node.index)=='string'){
			code[node.index]=string;
		}		
	}


//-----------------------判断节点是树节点还是字符型的叶子节点----------------------------//
	var class2type = {} ;
	"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(		function(e,i){
		class2type[ "[object " + e + "]" ] = e.toLowerCase();
	});
	function _typeof(obj){
		if ( obj == null ){
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ class2type.toString.call(obj) ] || "object" :
			typeof obj;
	}		
}


var HuffmanNode = function(left,right){//霍夫曼树节点,拥有左子树,右子树及储存的值item
	this.left=null;
	this.right=null;
	arguments[0]?arguments[0]:null;
	arguments[1]?arguments[1]:null;
	this.Init = function(){  
		this.left=left;
		this.right=right;		
	};  
	this.Init();
}

