//基于开放寻址法的散列表,输入元素的数量N小于等于散列表T的容量M

var m=13;//M为散列表T的长度(注:m需要根据情况进行修改!!!!!!!!!!!!!!!)

var hash=5381;//hash为散列函数的一个比较好的散列值

function Node(k){
	this.key=k;
	this.hash=0;
}

//----------------------------------------------------//
//散列函数两种实现//
//----------------------------------------------------//
//核心:time33 Hash函数

//除法散列法
function h1(k){
	var hash=5381;
	for(var i=0;i<k.length;i++){
	hash=hash*33+k.charCodeAt(i);
	}
	hash=hash%m;
	return hash;
}

//乘法散列法
function h1_1(k){
	var hash=5381;
	for(var i=0;i<k.length;i++){
	hash=hash*33+k.charCodeAt(i);
	}           
	var A=(Math.sqrt(5)-1)/2;
	hash=Math.floor(m*((hash*A)%1));
	return hash;
}

//辅助散列函数,相对于主散列函数h1,均服务于双重散列的探查方法
//(注:为了能查找整个散列表,h2(k)的值要与表的大小 m 互素)
function h2(k){
	var hash=5381;
	var m_2=m-1;
	for(var i=0;i<k.length;i++){
	hash=hash*33+k.charCodeAt(i);
	}
	hash=1+(hash%m_2);
	return hash;
}


//----------------------------------------------------//
//开放寻址法三种实现//
//----------------------------------------------------//
//线性探查
function Linear_Probing(k){//输入的k为散列值数组,待插入散列表T中
	var i = arguments[1] ? arguments[1] : 0;//设置偏移值i的初始值为0,当k对应的T的初始空间已经占用,则通过偏移值的改变移动k在T上最终的存储空间,直至i==m,即检索完成遍历T,若仍无法插入k,则意味插入失败
	
	return ( h1(k) + i ) % m;
}

//二次探查(原理同线性探查,只是偏移值修改为2次变量)
function Quadratic_Probing(k){
	var i = arguments[1] ? arguments[1] : 0;//设置偏移值i的初始值为0,当k对应的T的初始空间已经占用,则通过偏移值的改变移动k在T上最终的存储空间,直至i==m,即检索完成遍历T,若仍无法插入k,则意味插入失败
	
	var c1 = arguments[2] ? arguments[2] : 0;
	var c2 = arguments[3] ? arguments[3] : 0;
	return ( h1(k) + c1*i + c2*i*i ) % m;
}

//双重散列(最优方法)
function Double_Probing(k){
	var i = arguments[1] ? arguments[1] : 0;//设置偏移值i的初始值为0,当k对应的T的初始空间已经占用,则通过偏移值的改变移动k在T上最终的存储空间,直至i==m,即检索完成遍历T,若仍无法插入k,则意味插入失败
	
	return ( h1(k) + i*h2(k) ) % m;
}


//---------------------------------------------------------------------//
//散列表的操作方法(插入)(查找)//此处不含删除方法,删除方法以拉链法为佳
//--------------------------------------------------------------------//
function Hash_insert(T,k){
	var i=0;
	var node=new Node();
	node.key=k;
	node.hash=h1(k);
	do{
		// var j=Linear_Probing(k,i);
		// var j=Quadratic_Probing(k,i);
		var j=Double_Probing(k,i);
		if(T[j]==null){
			T[j]=node;
			return T;
		}else{
			i++;
		}
	}while(i<m)
	return('hash table overflow!');	
}

function Hash_search(T,k){
	var i=0;
	do{
		var j=Double_Probing(k,i);//此处的开放寻址法应与输入的方法相同
		if(T[j].key==k){
			return j;
		}else{
			i++;
		}
	}while((i<m)||(T[j]==null))
	return null;
}

function Hash_show(T){
	for(var i=0;i<T.length;i++){
		if(T[i]==null){
			document.write(' * |');
		}else{
			document.write(' '+T[i].key+' | ');
		}
	}
	document.write('<br/>');
}











