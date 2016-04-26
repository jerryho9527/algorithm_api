//算法导论32章 589页 KMP子字符串查找 + 算法第四版 503 B-M子字符串查找
var bao_li_search = function(pat,txt){//暴力子字符串查找
	var M=pat.length;
	var N=txt.length;
	for(var i=0;i<=N-M;i++){
		for(var j=0;j<M;j++){
			var txt_char=txt.charAt(i+j);
			var pat_char=pat.charAt(j);
			if(txt_char!=pat_char){
				break;
			}
			if(j==M-1){
				return i;
			}
		}
	}
	return N;
}

//------------------------------------KMP子字符串查找-------------------------------------//
var KMP_matcher = function(t,p){
	t=' '+t;//按照算法导论,字符串与数组皆从1开始
	p=' '+p;
	var n=t.length;
	var m=p.length;
	var pi=compute_prefix(p);
	var q=0;//已匹配的字符个数
	for(var i=1;i<n;i++){
		while((q>0)&&(p[q+1]!=t[i])){//下一个字符不匹配
			q=pi[q];
		}
		if(p[q+1]==t[i]){//下一个字符匹配
			q++;
		}
		if(q==m-1){//已经匹配完所有pat中所有m个字符吗?
			document.write('匹配于第'+(i-m+2)+'至'+i+'个字符 ');
			q=pi[q];//查找下一个匹配
		}
	}
}

var compute_prefix = function(p){//对pat求解子前后缀,将其储存于数组pi中

//参考http://blog.csdn.net/u011564456/article/details/20862555?utm_source=tuicool&utm_medium=referral
//a、当前面字符的前一个字符的对称程度为0的时候，只要将当前字符与子串第一个字符进行比较。这个很好理解啊，前面都是0，说明都不对称了，如果多加了一个字符，要对称的话最多是当前的和第一个对称。比如agcta这个里面t的是0，那么后面的a的对称程度只需要看它是不是等于第一个字符a了

//b、按照这个推理，我们就可以总结一个规律，不仅前面是0呀，如果前面一个字符的next值是1，那么我们就把当前字符与子串第二个字符进行比较，因为前面的是1，说明前面的字符已经和第一个相等了，如果这个又与第二个相等了，说明对称程度就是2了。有两个字符对称了。比如上面agctag，倒数第二个a的next是1，说明它和第一个a对称了，接着我们就把最后一个g与第二个g比较，又相等，自然对称成都就累加了，就是2了。

//c、如果遇到下一个不相等了，那么说明不能继承前面的对称性了.如果不相同，用一句话来说，就是：从前面来找子前后缀
	//1、如果要存在对称性，那么对称程度肯定比前面这个的对称程度小，所以要找个更小的对称，这个不用解释了吧，如果大那么就继承前面的对称性了.
	//2、要找更小的对称，必然在对称内部还存在子对称，而且这个必须紧接着在子对称之后。	
	var m=p.length;
	var pi=new Array(m);
	pi[1]=0;
	var k=0;
	for(var q=2;q<m;q++){
		while((k>0)&&(p[k+1]!=p[q])){//对于p[q]!=p[k+1],在p不断向前回溯,直至在p重新找到与q位字符相同的字符,或者k(对称度)下降至0(情况c)
			k=pi[k];
		}
		if(p[k+1]==p[q]){//p[k+1]为当当前字符p[q](q=2)时,与第k+1个字符对比(若k=0就是与第一个字符相比),若其相等,设置其对称度为k+1,并在下一个q所对比的对象变为与第二个字符对比
			k=k+1;
		}
		pi[q]=k;
	}
	return pi;	
}

//-----------------------------------B-M 子字符串查找-------------------------------------//
var Boyer_Moore_matcher = function(txt,pat){
	var R=26;//假设字母表为26位大写字母
	var c=pat.length;
	//------------------------------------
	var right=new Array(R);//使用数组right记录字母表中每个可能字符在模式pat中出现的最靠右的地方,若无出现置-1(算法第四版503页图5.3.11)
	for(var i=0;i<right.length;i++){
		right[i]=-1;
	}
	for(var j=0;j<c;j++){
		right[pat.charCodeAt(j)-65]=j;
	}
	//-------------------------------------
	
	var M=pat.length;
	var N=txt.length;
	for(var i=M-1;i<=N;){
		for(var j=M-1;j>=0;j--){
			var txt_char=txt.charAt(i);
			var pat_char=pat.charAt(j);
			if(txt_char!=pat_char){//如果出现不匹配
				if(right[txt_char.charCodeAt(0)-65]!=-1){//txt在i位不匹配的字符存在于pat中
					if((M-1-right[txt_char.charCodeAt(0)-65])>0){//保证txt一定向右移动
						i=i+(M-1-right[txt_char.charCodeAt(0)-65]);
						break;
					}else{
						i=i+M;//若i不能向右移动,强制将i向右移动M个位置
						break;
					}
				}else if(right[txt_char.charCodeAt(0)-65]==-1){//txt在i位不匹配的字符不存在于pat中
					i=i+M;
					break;
				}
			}else{//如果当前字符匹配,则对比txt与pat的前一个字符
				i--;
			}
			if(j==0){//匹配完所有的字符
				document.write('匹配于第'+(i+2)+'至'+(i+M+1)+'个字符 ');
				i=i+M+1;//准备搜索下一个匹配字符串
				break;
			}
		}
	}
	return;
}






