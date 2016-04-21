function sortUp(){
	var a=['S','E','A','R','C','H','E','X','A','M','P','L'/* ,'E' */];
	
	var s=new Array(13);//s为预设的散列表,长度为m,且需大于输入数据的数量(注:修改该m,需要在inc一并修改)
	
	for(var i=0;i<a.length;i++){
		Hash_insert(s,a[i]);
		Hash_show(s);
	}
}
