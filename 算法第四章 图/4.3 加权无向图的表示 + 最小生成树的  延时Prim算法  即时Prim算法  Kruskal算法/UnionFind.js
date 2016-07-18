//加权union-find算法的实现
var UF = function () {
    this.id=new Array();//以触点为索引的数组表示所有分量,一开始我们有N个分量,每个分量构成了一个只含有他们自己的分量
    this.count=0;//连通分量的数量
    this.sz=new Array();//该触点对应的根节点所控制的分量的大小

    this.UF = function (n) {//以整数标识初始化N个触点
        this.count=n;
        this.id=new Array(n);
        for(var i=0;i<n;i++){
            this.id[i]=i;
        }
        this.sz=new Array(n);
        for(var i=0;i<n;i++){
            this.sz[i]=1;
        }
    }

    this.count = new function () {//连通分量的数量
        return this.count;
    }

    this.connected = function (p,q) {//如果p和q处于同一分量内则返回true
        return this.find(p)==this.find(q);
    }

    this.find = function (p) {//返回p所在分量的根触点
        while(p!=this.id[p]){
            p=this.id[p];
        }
        return p;
    }
    
    this.union = function (p,q) {//将p与q之间添加一条连接,将两者的根节点id值设为相等
        var i=this.find(p);
        var j=this.find(q);
        if(i==j){
            return;
        }
        if(this.sz[i]<this.sz[j]){
            this.id[i]=j;
            this.sz[j]+=this.sz[i];
        }else{
            this.id[j]=i;
            this.sz[i]+=this.sz[j];
        }
        this.count--;
    }
}