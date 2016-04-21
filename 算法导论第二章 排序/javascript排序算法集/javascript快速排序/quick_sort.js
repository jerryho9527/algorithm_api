var count=0;
function sortUp(){//----------<<算法>>快速排序-------------
	var a=[4,6,9,3,5,4,6,2,1,8,9];
	var lo=0;var hi=a.length-1;
	quick_sort(a,lo,hi);
	
}

function quick_sort(a,lo,hi){
	if(hi<=lo){
		return;
	}
	var j=qiefen(a,lo,hi);//返回边界值后,对左右子数组各进行切分迭代,直至其长度为1
	quick_sort(a,lo,j-1);
	quick_sort(a,j+1,hi);
}

function qiefen(a,p,r){
	var K=a[p];//先取出K=a[p]作为标志值
	var i=p;//以i以及其左边的空间储存比K小的值
	for(j=p+1;j<=r;j++){//以i与j之间的空间储存比K大的值,当j增长,遇到比K小的值时,使其与a[i+1]的值
		if(a[j]<K){     //(此时属于i~j)进行交换,并且将i++,此时i区间增长,依然保持皆小于K
			exch(a,i+1,j);
			i++;
		}
	}
	exch(a,p,i);//当j完成p+1至r的扫描时,将标志值K与i,j的边界值进行交换,此时K的左边皆为小于K
	return i;   //的值,右边皆为大于K的值,并返回边界值i
}
