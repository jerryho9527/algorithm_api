//原始自顶向下法
function cut_rod(p,n){
	if(n==0)return 0;
	var q=-Infinity;
	for(var i=1;i<=n;i++){                //原始法效率低下的原因:
		q=Math.max(q,p[i]+cut_rod(p,n-i));//以n=4为例,在递归过程中,会反复求解n=3,n=2,n=1时的cut_rod()的结果,因此造成n增长时,运行时间大幅度上升.
	}
	return q;
}

//带备忘的自顶向下法,修改自原始自顶向下法
function cut_rod_memo(p,n){
	var r=new Array();
	var s=new Array();
	for(var i=0;i<=n;i++){
		r[i]=-Infinity;//带备忘法的改进:额外增加了数组r作为存储cut_rod(n)的结果,因此当进行下一次调用时,如果r[n]已经存在,则优先使用已存储的值,因此节省了时间
	}
	return cut_rod_memo_aux(p,n,r,s);
}

function cut_rod_memo_aux(p,n,r,s){
	var result=new Array();
	if(r[n]>=0){
		return r[n];
	}
	if(n==0)return 0;
	var q=-Infinity;
	for(var i=1;i<=n;i++){
		// q=Math.max(q,p[i]+cut_rod_memo_aux(p,n-i,r));//原不包含切割方案的程序
		if(q < p[i]+ cut_rod_memo_aux(p,n-i,r,s)){
				q = p[i]+cut_rod_memo_aux(p,n-i,r,s);//原理同下面的方法,都为额外设置数组s作为储存最佳切割方案
				s[n]=i;
			}
	}
	r[n]=q;
	result[0]=r[n];result[1]=s[n];
	return result;
}


//自底向上法,先解决比输入的n更小的子问题,r[0]=0为最小的问题,然后逐渐向上解决规模更大的问题
function cut_rod_bottom_to_top(p,n){
	var r=new Array();//数组r存储对应n的切割方案的最大利润
	var s=new Array();//数组s存储最优值方案中,切割点与最左初始点的距离
	var result=new Array();//数组rusult作为打包返回值
	r[0]=0;
	for(var j=1;j<=n;j++){//自底向上法的思想为:先从r[0]=0的基础上求解r[1]并储存,而后递归求解r[2],r[3],....r[n],最后返回r[n]得解
		var q=-Infinity;
		for(var i=1;i<=j;i++){
			// q=Math.max(q,p[i]+r[j-i]);//注释部分为原自底向上法采用的方法,只能返回对应n的最优解,但是没办法返回实现最优解的方案,因此进行改进
			if(q < p[i]+r[j-i]){
				q = p[i]+r[j-i];
				s[j]=i;
			}
		}
		r[j]=q;
	}
	result[0]=r[n];result[1]=s[n];
	return result;
}
