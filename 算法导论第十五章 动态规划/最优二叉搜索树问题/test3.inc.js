//带权路径的最优二叉搜索树问题 (算法导论15.5)
//假定树上每个关键字k[i],皆有其出现的频率p[i] (1<=i<=n) ,且假定树的叶子节点以下皆有伪关键字d[i'] ,其出现的频率为q[i'] (0<=i'<=n),因此有如下公式
//        ∑(i=1 to n)p[i] + ∑(i=0 to n)q[i] = 1
//并假定depth为关键字在树上的深度,有在树 T(1,n) 上进行一次搜索的期望为
//        E=∑(i=1 to n)(depth(k[i])+1) * p[i] + ∑(i=0 to n)(depth(q[i])+1) * q[i]
//         =1 + ∑(i=1 to n)(depth(k[i])) * p[i] + ∑(i=0 to n)(depth(q[i])) * q[i]


function Optimal_BST(p,q,n){//接收的值为 节点的权数组p 伪节点的权数组q 节点的总数n
	var e=new Array(n+2);
	for(var i=1;i<e.length;i++){
		e[i]=new Array(n+1);//创建表格e e[1..n+1,0..n]
	}
	var w=new Array(n+2);
	for(var i=1;i<w.length;i++){
		w[i]=new Array(n+1);//创建表格w w[1..n+1,0..n]
	}
	var root=new Array(n+1);
	for(var i=1;i<root.length;i++){
		root[i]=new Array(n+1);//创建表格root root[1..n,1..n]
	}
	
	for(i=1;i<=n+1;i++){//当j=i-1  e[i][j]=w[i][j]=q[i-1]  (见递归公式)
		e[i][i-1]=q[i-1];
		w[i][i-1]=q[i-1];
	}
	for(var l=1;l<=n;l++){//l为当i<=j时,子树(i,j)的宽度,不断增长,同时记录子树增长时对应的最优搜索代价以及其树根节点位置,直至l=n即可求出树(1,n)的最优搜索代价以及树的结构
		for(i=1;i<=n-l+1;i++){
			var j=i+l-1;//当i<=j   e[i][j]=Math.min{ e[i][r-1] + e[r+1][j] + w[i][j] }
			//								   左子树代价 右子树代价 子树[i,j]的权之和
			e[i][j]=Infinity;
			w[i][j]=w[i][j-1]+p[j]+q[j];//借助维护的表w所储存的子树权之和 ,树的权之和等于左子树的权之和 加顶点的权 加右伪子节点的权
			
			for(var r=i;r<=j;r++){//从i ~ j选择出根节点r,计算不同的根节点r情况下搜索代价e[i,j]的最小值,并保存最小代价下对应的根节点r在root里面
				var t=e[i][r-1]+e[r+1][j]+w[i][j];
				if(t<e[i][j]){
					e[i][j]=t;
					root[i][j]=r;
				}
			}			
		}
	}
	var result=new Array();
	result[0]=e;//最后可得 树[1,5] 的最优搜索代价为 e[0,6]=2.75
	result[1]=root;//同时 树[1,5] 的最优搜索根节点为 root[1,5]=k[2],同时向下搜索root[1,1]与root[3,5]可得树向下生长时的根节点序号,可知树的结构
	return result;
}



