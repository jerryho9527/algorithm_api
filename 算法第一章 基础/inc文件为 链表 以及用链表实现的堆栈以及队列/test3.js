//本文件借用已定义的链表类,实现了前移编码的操作
function sortUp(){
	var li=new List();var pointer=0;
	for(var i=0;i<6;i++){
		var a=prompt('input something');
		//----------------------------------------------------//
		if(li.first!=null){
			var tempNode=new Node();
			tempNode=li.first;
			var j=0;
			while(j<li.getSize()){
				if(tempNode.item==a){           //此部分为额外添加的前移编码操作//
					li.Remove(j);
				}
				tempNode=tempNode.next;
				j++;
			}
		}
		//----------------------------------------------------//
		li.Push(a);
		li.Print();
	}
	li.Remove_d(9);
	li.Print();
}