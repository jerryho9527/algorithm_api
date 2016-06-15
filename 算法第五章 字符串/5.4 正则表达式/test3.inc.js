//算法(第四版) 5.4正则表达式(算法(第四版) 521页 图5.4.4状态的转移)


var recognize = function(txt){
	var pc=new Array();
	var dfs=new DirectedDFS();
	dfs.DirectedDFS(G,0);
	for(var v=0;v<G.get_V();v++{
		if(dfs.marked[v]){
			pc.push(v);
		}	
	}
	
	for(var i=0;i<txt.length;i++){
		var match=new Array();
		
	}
}






