/*本文件定义了实现单向链表list的类,以及通过链表实现队列queue以及堆栈stack的类*/

//-------定义node的类-----------------------------------------//
    var Node = function(newData){  
        this.next = null;  
        this.item = null;  
        this.Init = function(){  
            this.item = newData;  
        };  
        this.Init();  //定义一个node类型,当以 var m= new Node(n)进行实例化时,将n赋值于m.item
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
        this.Push = function(newData){  
            this.size += 1;  
            var newNode = new Node(newData);  
            if(this.first == null){  //如果first为空,链表为空,将链表头指向新增的node
                this.first = newNode;  
                return;  
            }  
            var tempNode = this.first; //如果first非空,链表有元素,
            this.first=new Node();
			this.first=newNode;              //此段为将新节点从前端插入,将原来的first储存,将
			this.first.next=tempNode;        //新的first初始化,使其等于newNode,将first.next设
        };                                   //置为原来的旧first(tempNode)
		
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
		
		//------------------从后端弹出节点并返回键值-----------------//
		this.backPop = function(){
			this.size--;
			if(this.first == null){          //此段为将节点从尾部弹出,并返回该值
				return null;
			}
			var tempNode = this.first;
			while(tempNode.next!=null){
				tempNode=tempNode.next;
			}
			var tempNode_2 = this.first;
			while(tempNode_2.next!=tempNode){
				tempNode_2=tempNode_2.next;
			}
			tempNode_2.next=null;
			return(tempNode.item);		
			//---------------------------------------------------------------------------//
		}
		
        //---------获得该参数位置的item值(链表从0开始)-------------//
        this.GetData = function(pos){  
            if(pos >= this.size || pos < 0)  
                return null;    
            else{  
                tempNode = this.first;  
                for(i = 0;i < pos;i++)    
                    tempNode = tempNode.next;    
                return tempNode.item;    
             }  
        };  
        
        //删除第pos个节点(链表从0开始) 
        this.Remove = function(pos){  
            if(pos >= this.size || pos < 0)  
                return null;      
            this.size -= 1;  
            tempNode = this.first;  
            if(pos == 0){  
                this.first = this.first.next;  
                return this.first;  
            }  
            for(i = 0;i < pos - 1;i++){  
                tempNode = tempNode.next;  
            }  
            var result = tempNode.next;
			tempNode.next = tempNode.next.next;  
            return result.item;                    
        }
						
		//-------------打印链表中的元素--------------------//
        this.Print = function(){  
            document.write("elements in save as follows: <br> ");  
            tempNode = this.first;  
            while(tempNode != null){  
                document.write(tempNode.item + "->");  
                tempNode = tempNode.next;  
            }  
            document.write("<br>");  
        }; 
		
		//-----------获得链表的长度------------------------//
		this.getSize = function(){
			return(this.size);
		}
		
		//----------测试链表是否为空----------------------//
		this.isEmpty = function(){
			if(this.first == null){
				return(1);
			}
			return(0);
		}
		
		//----------删除键值为输入值的所有节点-----------//
		this.Remove_d = function(del){
			var i=0;
			var tempNode = this.first;
			while(i<this.size){
				if(tempNode.item==del){
					this.Remove(i);
					i--;
				}
				tempNode=tempNode.next;
				i++;
			}
		}
		
		//----------找出最大键值的节点序号并返回数组--------//
		this.max = function(){
			var i=0;
			var index=new Array();
			var max=0;
			var tempNode = this.first;
			if(this.first==null){
				return 0;
			}
			for(i=0;i<this.size;i++){
				if(tempNode.item>max){
					max=tempNode.item;
				}
				tempNode=tempNode.next;
			}
			tempNode = this.first;
			for(i=0;i<this.size;i++){
				if(tempNode.item==max){
					index.push(i);
				}
				tempNode=tempNode.next;
			}
			return index;
		}
		
		this.toArray = function(){//转变为数组形式
			tempNode = this.first; 
			var arr=new Array();
            while(tempNode != null){ 
				arr.push(tempNode.item);
                tempNode = tempNode.next;  
            } 
			return arr;
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

//------------------借list定义双向队列Dueue的类-----------------//	
	var Dueue = function(){
		var list = new List();
		this.pushLeft = function(newData){
			list.Push(newData);
		}
		this.pushRight = function(newData){
			list.backPush(newData);
		}
		this.popLeft = function(){
			return(list.Pop());
		}
		this.popRight = function(){
			return(list.backPop());
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
	
	
/* 测试代码
	var list=new List();
	list.Push('je');
	list.Push('has');
	list.Push('kokk');
	list.Push('math');
	list.Push('jeb');
	list.Print();
	console.log(list.GetData(0));
	list.Print();
*/