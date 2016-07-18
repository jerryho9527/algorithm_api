/*���ļ�������ʵ�ֵ�������list����,�Լ�ͨ������ʵ�ֶ���queue�Լ���ջstack����*/
//���ļ�Ϊ��Ȩ�����ػ�,node����ֵ��չΪEdge ����� v,w,weight,��ֵΪ�ߵ���������,��ߵ�Ȩ��ֵ

//-------����Edge����-----------------------------------------//
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
	
//-------����list����-----------------------------------------//  
    var List = function(){  
        this.first = null;  
        this.size = 0;  
        this.Init = function(){  
            this.first = null; 		
            this.size = 0;  
        }  //����һ��list����,���� var m= new List()����ʵ����ʱ,��List.first�Լ�List.size
        this.Init();  //��ʼ��Ϊ0;
		
		//-----list���Push����-����������ͷ��(��β��),����Ϊ��Ҫ�����node��item----------//
        this.Push = function(v,w,weight){  
            this.size += 1;  
            var newNode = new Edge(v,w,weight);  
            if(this.first == null){  //���firstΪ��,����Ϊ��,������ͷָ��������node
                this.first = newNode;  
                return;  
            }  
            var tempNode = this.first; //���first�ǿ�,������Ԫ��,
            this.first=new Edge();
			this.first=newNode;              //�˶�Ϊ���½ڵ��ǰ�˲���,��ԭ����first����,��
			this.first.next=tempNode;        //�µ�first��ʼ��,ʹ�����newNode,��first.next��
        };                                   //��Ϊԭ���ľ�first(tempNode)

		//-------------��ӡ�����е�Ԫ��--------------------//
        this.Print = function(){  
            document.write("elements in save as follows: <br> ");  
            tempNode = this.first;  
            while(tempNode != null){  
                document.write("|"+tempNode.v+"|"+tempNode.w+"|"+tempNode.weight+"| -> ");  
                tempNode = tempNode.next;  
            }  
            document.write("<br>");  
        }; 
		
		
		this.toArray = function(){//ת��Ϊ������ʽ
			tempNode = this.first; 
			var arr=new Array();
            while(tempNode != null){ 
				arr.push([tempNode.v,tempNode.w,tempNode.weight]);
                tempNode = tempNode.next;  
            } 
			return arr;
		}
			
    }; 
