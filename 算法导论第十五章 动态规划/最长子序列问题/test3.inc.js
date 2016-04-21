//动态规划解决最长公共子序列(LCS)问题
//关键公式:定义c[i,j]表示x[i]与y[j]的LCS长度

//           |-- 
//           |   0   (若i=0或j=0)
//           |
//   c[i,j]= |   c[i-1,j-1]+1   (若i,j>0 且 x[i]=y[j])   (表b记 '\')
//           |
//           |   max( c[i-1,j] , c[i,j-1] )   (若i,j>0 且 x[i]!=y[j])   (表b记 '-'或'|')
//           |--


function LCS_length(x,y){
	var m=x.length;
	var n=y.length;
	
	var c=new Array(m+1);
	for(var i=0;i<=m;i++){
		c[i]=new Array(n+1);
	}

	var b=new Array(m);
	for(i=0;i<=m;i++){
		b[i]=new Array(n);
	}
	
	for(i=0;i<=m;i++){
		c[i][0]=0;
	}
	for(var j=0;j<=n;j++){
		c[0][j]=0;
	}
	
	for(i=1;i<=m;i++){
		for(j=1;j<=n;j++){
			if(x[i-1]==y[j-1]){//注意:因为算法导论里面数组是以1开始,而程序中数组是以0开始,因此为了使二维数组c对应x,y数组的元素,对应的元素为x[i-1]与y[j-1]
				c[i][j]=c[i-1][j-1]+1;
				b[i][j]='\\';
			}else if(c[i-1][j]>=c[i][j-1]){
				c[i][j]=c[i-1][j];
				b[i][j]='|';
			}else{
				c[i][j]=c[i][j-1];
				b[i][j]='-';
			}
		}
	}
	
	var x=new Array();
	x[0]=c;x[1]=b;
	return x;
	
}

function Print_LCS(b,x,i,j){
	var result = arguments[4] ? arguments[4] : new Array();
	if((i==0)||(j==0)){
		return;
	}
	if(b[i][j]=='\\'){
		result.push(x[i]);
		Print_LCS(b,x,i-1,j-1,result);
	}else if(b[i][j]=='|'){
		Print_LCS(b,x,i-1,j,result);
	}else{
		Print_LCS(b,x,i,j-1,result);
	}
	return result;
}

function Print_LCS_extra(c,x,i,j){//改进的LCS判断方法,能抛弃表b,能够节省出表格b的空间
	var result = arguments[4] ? arguments[4] : new Array();
	if((i==0)||(j==0)){
		return;
	}
	if((c[i][j]!=c[i-1][j])&&(c[i][j]!=c[i][j-1])){
		result.push(x[i]);
		Print_LCS_extra(c,x,i-1,j-1,result);
	}else if(c[i][j]==c[i-1][j]){
		Print_LCS_extra(c,x,i-1,j,result);
	}else{
		Print_LCS_extra(c,x,i,j-1,result);
	}
	return result;
}




