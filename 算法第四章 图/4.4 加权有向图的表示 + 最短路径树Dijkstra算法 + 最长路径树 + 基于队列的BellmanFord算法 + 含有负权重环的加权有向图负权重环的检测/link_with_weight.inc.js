/*本文件定义了实现单向链表list的类,以及通过链表实现队列queue以及堆栈stack的类*/
//本文件为加权边所特化,node内容值扩展为DirectedEdge 添加了 v,w,weight,该值为边的两个顶点,与边的权重值

//-------定义DirectedEdge(有向边)的类-------------------------------------//
    var DirectedEdge = function(v,w,weight){  
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
		this.from = function(){//有向边的起点
			return this.v;
		}
		this.to = function(v){//有向边的终点
			return this.w;
		}
		// this.toString = function(){
			// document.write(this.w+"|"+this.w+"|"+this.weight+"|<br/>");
		// }
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
            var newNode = new DirectedEdge(v,w,weight);  
            if(this.first == null){  //如果first为空,链表为空,将链表头指向新增的node
                this.first = newNode;  
                return;  
            }  
            var tempNode = this.first; //如果first非空,链表有元素,
            this.first=new DirectedEdge();
			this.first=newNode;              //此段为将新节点从前端插入,将原来的first储存,将
			this.first.next=tempNode;        //新的first初始化,使其等于newNode,将first.next设
        };                                   //置为原来的旧first(tempNode)
		
		//----list类的pop方法,为链表弹出头部节点,并返回该节点储存的item值---------//
		this.Pop = function(){
			this.size--;
			if(this.first == null){          //此段为将节点从头部弹出,并返回该值
				return null;
			}
			var result = this.first.item;
			this.first = this.first.next;
			return result;
			//---------------------------------------------------------------------------//
		}
		
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
				arr.push(tempNode.v);
                tempNode = tempNode.next;  
            } 
			return arr;
		}
		
		//-------------此段为将新节点从后端插入-------------//
		this.backPush = function(newData){  
            this.size += 1;  
            var newNode = new Node(newData);  
            if(this.first == null){  //如果first为空,链表为空,将链表头指向新增的node
                this.first = newNode;  
                return;  
            }  
            var tempNode = this.first; //如果first非空,链表有元素,
            while(tempNode.next != null)  
                tempNode = tempNode.next; //此段为将新节点从后端插入,通过搜索next为null的
            tempNode.next = newNode;      //节点即最后节点,将next设置为newNode即插入
			//---------------------------------------------------------------------------//
		}; 
			
		//----------测试链表是否为空----------------------//
		this.isEmpty = function(){
			if(this.first == null){
				return(1);
			}
			return(0);
		}
    }; 
	
		
//------------------借list定义堆栈stack的类-----------------//	
	var Stack = function(){
		var list = new List();
		this.Push = function(newData){
			list.Push(newData);
		}
		this.Pop = function(){
			return(list.Pop());
		}
		this.Print = function(){
			list.Print();
		}	
		this.getSize = function(){
			return(list.getSize());
		}		
		this.isEmpty = function(){
			return(list.isEmpty());
		}
		this.toArray = function(){
			return(list.toArray());
		}
	}
	
//------------------借list定义队列Queue的类-----------------//	
	var Queue = function(){
		var list = new List();
		this.Push = function(newData){
			list.backPush(newData);
		}
		this.Pop = function(){
			return(list.Pop());
		}
		this.Print = function(){
			list.Print();
		}		
		this.getSize = function(){
			return(list.getSize());
		}		
		this.isEmpty = function(){
			return(list.isEmpty());
		}
		this.toArray = function(){
			return(list.toArray());
		}
	}	

