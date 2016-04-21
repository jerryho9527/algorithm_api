var count=0;
function sortUp(){//----------<<算法>>快速排序(三向切分,增加a[j]==K的区间)-------------
	var a=[8,19,9,5,13,8,8,7,4,8];
	var lo=0;var hi=a.length-1;
	quick_sort(a,lo,hi);
	
}
function quick_sort(a,lo,hi){
	if(hi<=lo){
		return;
	}
	var j=qiefen(a,lo,hi);//返回边界值后,对左右子数组各进行切分迭代,直至其长度为1
	quick_sort(a,lo,j[0]-1);
	quick_sort(a,j[1]+1,hi);
}

function qiefen(a,p,r){
	var K=a[p];//先取出K=a[p]作为标志值
	var i=p;//以i以及其左边的空间储存比K小的值
	var k=p;//以i~k之间储存与K相等的值
	for(j=p+1;j<=r;j++){//以k与j之间的空间储存比K大的值,当j增长,遇到比K小的值时,使其先与a[k+1]的值
		if(a[j]<K){     //(此时属于k)进行交换,再与a[i+1](此时属于i)进行交换,并且将i++,k++,此时i与k
			exch(a,k+1,j);//区间增长,i区间依然保持皆小于K,k区间为等于K的值
			exch(a,k+1,i+1);
			i++;
			k++;
		}else if(a[j]==K){
			exch(a,k+1,j);
			k++;
		}
	}
	exch(a,p,i);//当j完成p+1至r的扫描时,将标志值K与i,k的边界值进行交换,此时K的左边皆为小于K
	return[i,k];   //的值,k,j边界右边皆为大于K的值,并返回边界值i,k
}
