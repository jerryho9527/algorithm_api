//基于拉链法的散列表

var m=13;//M为散列表T的长度(注:m需要根据情况进行修改!!!!!!!!!!!!!!!)

var hash=5381;//hash为散列函数的一个比较好的散列值

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

//---------------------------------------------------------------------//
//散列表的操作方法(插入)(查找)(删除)//此处含删除方法,删除方法以拉链法为佳
//--------------------------------------------------------------------//
function Hash_insert(T,k){
	var j=h1(k);
	var node=new List();
	if(T[j]==null){
		T[j]=node;
		node.Push(k);
	}else{
		T[j].Push(k);
	}
}

function Hash_search(T,k){
	var j=h1(k);
	var m=T[j].first;
	while(m!=null){
		if(m.item==k){
			return true;
		}else{
			m=m.next;
		}
	}
	return false;
}

function Hash_delete(T,k){
	var j=h1(k);
	var m=T[j];
	if(Hash_search(T,k)){
		m.Remove_d(k);
		return true;
	}else{
		return false;
	}
}

function Hash_show(T){
	for(var i=0;i<T.length;i++){
		if(T[i]==null){
			document.write(i+':<br/>elements in save as follows: <br/>null<br/>');
		}else{
			document.write(i+':<br/>');T[i].Print();
		}
		
	}
	document.write('---------------------------------------------------------------<br/>');
}











