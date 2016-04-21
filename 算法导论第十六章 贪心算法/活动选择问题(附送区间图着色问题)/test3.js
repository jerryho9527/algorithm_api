//贪心算法求解活动选择最大兼容活动子集(算法导论16 240页图)
function sortUp(){
	//中心思想,递归选择相兼容且最早结束的活动
	var s=['',1,3,0,5,3,5,6,8,8,2,12];//各活动开始时间
	var f=[0,4,5,6,7,9,9,10,11,12,14,16];//各活动结束时间(先将各活动按结束时间单调递增排列)
	var n=11;//活动总数11个
	var result=new Array();//result储存最大兼容子活动的开始结束时间
	result=tanxin_suanfa(s,f,0,s.length-1,result);
	document.write(result);
	document.write('<br/>');
	
	//下面代码为选择最晚开始的活动,原理与源代码相似
	// var s=[0,1,3,0,5,3,5,6,8,8,2,12];//各活动开始时间
	// var f=['',4,5,6,7,9,9,10,11,12,14,16];//各活动结束时间(先将各活动按结束时间单调递增排列)
	// var n=12;//活动总数11个+1为起始指针
	// var result=new Array();//result储存最大兼容子活动的开始结束时间
	// result=tanxin_suanfa_2(s,f,n,0,result);
	// document.write(result);
	// document.write('<br/>');
//----------------------------------------------------------------------------------------//	
	//附带:区间图着色问题:	//对活动进行一轮选择最大兼容子集操作,并对余下的活动循环进行选择最大兼容子集,直至活动次数为0,选择的次数即为最少的颜色数
	while(result!=null){
		for(var i=0;i<=result.length;i++){//此段程序从s,f中剔除上次循环中所包含的最大兼容子集
			if(result[i]!=null){
				s[i]=null;
				f[i]=null;
			}
		}
		for(i=0;i<s.length;i++){
			if(s[i]==null){
				s.splice(i,1);
				i--;
			}
		}
		for(i=0;i<f.length;i++){
			if(f[i]==null){
				f.splice(i,1);
				i--;
			}
		}
		result=new Array();
		result=tanxin_suanfa(s,f,0,s.length-1,result);//对新的s,f重新进行选取最大兼容子集操作,直至子集为空,即所有活动皆取出为止
		document.write(result);
		document.write('<br/>');
	}	
}