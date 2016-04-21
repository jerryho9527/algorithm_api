//贪心算法求解活动选择最大兼容活动子集(算法导论16 240页图)

function tanxin_suanfa(s,f,k,n,result){//接受四个参数,数组s,f为各个活动的开始,结束时间,  k为要求解的子问题集S[k](S[k]为在a[k]结束后开始的任务集合,如a[1]结束后,剩下的S[1]为需要求解的子问题集), n为总问题的规模,即所有活动的总数量

//第五个参数result为二维数组,储存最大兼容子问题集中,各个子问题的开始,结束指针

	var m=k+1;//初始状态时k=0,选出最先结束的活动a[1]后,求解余下的问题S[1],并递归实现
	while((m<=n)&&(s[m]<f[k])){
		m=m+1;//求解S[k]的办法为,向右移动a[m]的指针,直至找到一个开始值大于a[k]结束值的a[m],此a[m]与a[k]相兼容
	}
	if(m<=n){//当这个a[m]仍处于子问题集内,则此子问题问题集S[m]最先结束的子问题,并且递归求解S[m]
		var a=Array(s[m],f[m]);
		result[m]=a;
		tanxin_suanfa(s,f,m,n,result);
		return result;
	}else{
		return null;//若a[m]超出子问题集a[n],则返回空集
	}
}
//本题贪心算法思想总结:
//选出所有活动集S中首先结束的活动,即a[1],即所有与a[1]兼容的活动都必须在a[1]结束后开始,然后选出第一个与其兼容的活动a[4],a[4]被看作a[1]的剩余问题集S[1]中首先结束的活动,同理求出下一个与a[4]兼容的子问题a[8].......a[11],直到值m大于总集数量11完成,期间使用result储存a[m]的开始与结束指针



function tanxin_suanfa_2(s,f,k,n,result){//该算法选择最晚开始的活动,并倒推
	var m=k-1;
	while((m>=0)&&(f[m]>s[k])){
		m=m-1;
	}
	if(m>=0){
		var a=Array(s[m],f[m]);
		result[m]=a;
		tanxin_suanfa_2(s,f,m,n,result);
		return result;
	}else{
		return null;
	}
}