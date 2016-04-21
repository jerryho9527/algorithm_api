//5.1.1键索引计数法 (算法(第四版)455页) 姓名被分为若干组1,2,3,通过对组号的排序为姓名作排序
var Node = function(name,key){
	this.name=name;
	this.key=key;
}


//低位优先的字符串排序
var LSD = function(){
	
	this.sort = function(a,W){//a为待排序的字符串,W为通过W位字符进行排序
		var N=a.length;
		var R=256;//固定基数
		var aux=new Array(N);
		
		for(var d=W-1;d>=0;d--){//在从低位起(从右到左)第d个字符用键索引计数法排序
			var count=new Array(R+1);
			for(i=0;i<count.length;i++){
				count[i]=0;
			}
			for(i=0;i<N;i++){
				count[a[i].charCodeAt(d)+1]++;//计算各个字符的出现频率(注:此处将a[]中对应元素 加1 然后存入count[]中,原因参看 算法(第四版)455页)
			}	
			for(i=0;i<R;i++){
				count[i+1]=count[i]+count[i+1];//把频率表转换为首字符指针表
			}			
			for(i=0;i<N;i++){
				aux[count[a[i].charCodeAt(d)]++]=a[i];//按照首字符指针表储存a[]内的字符至aux[]内,每储存一个,该指针右移一格
			}
			for(i=0;i<N;i++){
				a[i]=aux[i];//将aux[]内对当前第d位字符已排好序的数组覆盖回a[]内
			}
		}		
	}
}


//高位优先的字符串排序(本例要求字符串为小写,可扩展)
var MSD = function(){
	var R=256//字母表基数,即为字符串中的所有字符都是由大小为R的集合中选取的
	var M=10;//小数组的切换阈值(阈值的作用为,当待排序的子数组足够小,应用插入排序可提高运行时间,但是插入排序以后不运行以后的递归过程,因此子数组足够小的定义为插入排序后已基本有序,不需要递归对更低位的字符进行排序)
	var aux=new Array();//数据分类的辅助数组
	
	this.charAt = function(s,d){//选择字符串s中的第d个字符
		if(d<s.length){
			return s.charCodeAt(d);
		}else{
			return -1;
		}
	}
	
	this.sort = function(a){
		var N=a.length;
		this.sort_i(a,0,N-1,0);
	}
	
	this.sort_i = function(a,lo,hi,d){//以第d个字符为键将a[lo]至a[hi]排序
	
		var aux=new Array(hi+1);
		
		if(hi<=lo+M){//当当前分割的字符串数组容量很小的时候,转换为插入排序处理,提高效率
			chaRuPaiXu_Up(a,lo,hi,d);//该插入排序为:对前d个字符均相同的字符串执行插入排序
			return;
		}
		var count=new Array(R+2);
		for(var i=0;i<count.length;i++){
			count[i]=0;
		}
		for(i=lo;i<=hi;i++){//计算频率
			count[this.charAt(a[i],d)+2]++;
		}
		for(var r=0;r<R+1;r++){//频率转化为索引
			count[r+1]+=count[r];
		}
		for(i=lo;i<=hi;i++){//数据分类
			aux[count[this.charAt(a[i],d)+1]++]=a[i];
		}
		for(i=lo;i<=hi;i++){//回写
			a[i]=aux[i-lo];
		}
		for(r=0;r<R;r++){//此步将当前第d字符的字符相同的字符串对其第 d+1个字符串递归进行高位优先排序
			this.sort_i(a,lo+count[r],lo+count[r+1]-1,d+1);
		}
	}
	
	
	
}


//三向字符串快速排序
var Quick3string = function(){
	
	this.charAt = function(s,d){//选择字符串s中的第d个字符
		if(d<s.length){
			return s.charCodeAt(d);
		}else{
			return -1;
		}
	}
	
	this.sort = function(a){
		var N=a.length;
		this.sort_i(a,0,N-1,0);
	}
	
	this.sort_i = function(a,lo,hi,d){//以第d个字符为键将a[lo]至a[hi]排序
		if(hi<=lo)return;
		var lt=lo;//lt指针以左储存比 a[lo]在第d位的字符 小的字符串
		var gt=hi;//gt指针以右储存比 a[lo]在第d位的字符 大的字符串//lt gt指针之间储存与a[lo]在第d位字符相同的字符串
		
		var v=this.charAt(a[lo],d); //a[lo]在第d位的字符
		var i=lo+1;
		while(i<=gt){//通过指针i遍历所有字符串
			var t=this.charAt(a[i],d);
			if(t<v){
				exch(a,lt,i);
				lt++;
				i++;
			}
			else if(t>v){
				exch(a,i,gt);
				gt--;
			} 
			else {
				i++;
			}
		}//处理完成以后,a[lo,....lt-1] < v=a[lt,....gt] < a[gt+1,....hi]
		this.sort_i(a,lo,lt-1,d);//
		if(v>=0){
			this.sort_i(a,lt,gt,d+1);//因为中间段在当前第d位皆相同,直至当前位d的字符值v皆存在的时候,递归运行对d+1位进行比较,当v不存在,意味着切分已经到达字符串结尾,结束
		}
		this.sort_i(a,gt+1,hi,d);//因为小于段与大于段内第d位皆不相同,因此直接对其d位进行排序
	}
}





//---------------------(附录)改进的插入排序方法---------------------------//
function chaRuPaiXu_Up(arr,lo,hi,d){
	for(var i=lo;i<=hi;i++){
		for(var j=i;(j>lo)&&(less(arr[j],arr[j-1],d));j--){
			exch(arr,j,j-1);
		}
	}
}
function exch(a,i,j){
	var temp=0;
	temp=a[i];
	a[i]=a[j];
	a[j]=temp;
}
function less(v,w,d){
	if(v.substring(d).localeCompare(w.substring(d))<0){//此段为比较 v与w除去前d位字符以后相比较,若余下的字符串v>w,则返回true
		return true;
	}else{return false;}
}
