function sortUp(){
	var pat='ABRA';
	var txt='ABABRACBABRAAAD';
	
	KMP_matcher(txt,pat);//KMP算法的实现
	
	
	var p=' ababac';//测试前缀函数数组
	var pi=compute_prefix(p);
}
