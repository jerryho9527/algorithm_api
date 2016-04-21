/*本文件定义了实现单向链表list的类,以及通过链表实现队列queue以及堆栈stack的类*/
//本文件为加权边所特化,node内容值扩展为Edge 添加了 v,w,weight,该值为边的两个顶点,与边的权重值

//-------定义Edge的类-----------------------------------------//
    var Edge = function(v,w,weight){  
		this.next = null;  
		this.v = null;
		this.w = null;
		this.weight = null;		
		this.Init = function(){  
			this.v = v;  
			this.w = w; 
			this.weight = weight; 
		};  
		this.Init();
		
		this.get_weight = function(){
			return this.weight;
		}
		this.either = function(){
			return this.v;
		}
		this.other = function(v){
			if(this.v==v){
				return this.w;
			}else if(this.w==v){
				return this.v;
			}else{
				return 'Inconsistent edge';
			}
		}
		
		this.compareTo = function(that){
			if(this.weight()<that.weight()){
				return -1;
			}else if(this.weight()>that.weight()){
				return 1;
			}else{
				return 0;
			}			
		}
		
		this.toString = function(){
			document.write(this.w+"|"+this.w+"|"+this.weight+"|");
		}
	} 
	
//-------定义list的类-----------------------------------------//  
    var List = function(){  
        this.first = null;  
        this.size = 0;  
        this.Init = function(){  
            this.first = null; 		
            this.size = 0;  
        }  //定义一个list类型,当以 var m= new List()进行实例化时,将List.first以及List.size
        this.Init();  //初始化为0;
		
		//-----list类的Push方法-插入至链表头部(或尾部),参数为需要加入的node的item----------//
        this.Push = function(v,w,weight){  
            this.size += 1;  
            var newNode = new Edge(v,w,weight);  
            if(this.first == null){  //如果first为空,链表为空,将链表头指向新增的node
                this.first = newNode;  
                return;  
            }  
            var tempNode = this.first; //如果first非空,链表有元素,
            this.first=new Edge();
			this.first=newNode;              //此段为将新节点从前端插入,将原来的first储存,将
			this.first.next=tempNode;        //新的first初始化,使其等于newNode,将first.next设
        };                                   //置为原来的旧first(tempNode)
		
		
		//-------------打印链表中的元素--------------------//
        this.Print = function(){  
            document.write("elements in save as follows: <br> ");  
            tempNode = this.first;  
            while(tempNode != null){  
                document.write("|"+tempNode.v+"|"+tempNode.w+"|"+tempNode.weight+"| -> ");  
                tempNode = tempNode.next;  
            }  
            document.write("<br>");  
        }; 
		
		
		this.toArray = function(){//转变为数组形式
			tempNode = this.first; 
			var arr=new Array();
            while(tempNode != null){ 
				arr.push([tempNode.v,tempNode.w,tempNode.weight]);
                tempNode = tempNode.next;  
            } 
			return arr;
		}
			
    }; 
