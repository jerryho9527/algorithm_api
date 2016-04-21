//动态规划:钢条切割
function sortUp(){
	var p=new Array();
	// p[0]=0;
	// for(var i=1;i<=30;i++){
		// p[i]=i;
	// }
	var p=[0,1,5,8,10,13,17,18,22,25,30];
	for(n=1;n<=10;n++){
		// var a=cut_rod_bottom_to_top(p,n);
		var a=cut_rod_memo(p,n);
		document.write('情况'+n+' 最大利润为'+a[0]+',切割方法为'+a[1]+'+'+(n-a[1])+'<br/>');
	}
	
	for(n=1;n<=10;n++){
		var a=cut_rod_bottom_to_top(p,n);
		// var a=cut_rod_memo(p,n);
		document.write('情况'+n+' 最大利润为'+a[0]+',切割方法为'+a[1]+'+'+(n-a[1])+'<br/>');
	}
}


