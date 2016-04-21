function sortUp(){
	// var trie=new TrieST();
	// trie.put('sea',1);//例:向单词查找树中插入字符串'sea',其值为1,树中的结构为:根节点中的第19条链接(next[18],即指向所有以s开头的键组成的子单词查找树)非空, 其指向的下一个节点的中的第5条链接(next[4],即指向所有以se开头的键组成的子单词查找树)非空,其指向的下一个节点的中的第1条链接(next[0],即指向所有以sea开头的键组成的子单词查找树)非空,其指向的下一个节点的val值设置为1
	
	
	var string=['she','sells','seashells','by','the','sea','shore','the','shells','she','sells','are','surely','seashells'];
	
	//-----------------------------------------------------------------------------//
	// var trie=new TrieST();//R向单词查找树
	// for(var i=0;i<string.length;i++){
		// trie.put(string[i],i);
	// }
	// var a=trie.get('sea');//取字符
		
	// var a=trie.keys();
	// var b=a.toArray();	
	// var c=trie.keysWithPrefix('sh');//取前缀为'sh'的字符
	// var d=c.toArray();
	
	// var e=trie.keyThatMatch('s..');//匹配开头为s的三位字符
	// var f=e.toArray();
	
	// trie.delete('shells');//删除'shells'
	// var a=trie.keys();
	// var b=a.toArray();
	
	//------------------------------------------------------------------------------//
	var tst=new TST()//三向单词查找树
	for(var i=0;i<string.length;i++){
		tst.put(string[i],i);
	}
	var a=tst.get('sea');//取字符
	var a=tst.keys();//取所有字符
	var b=a.toArray();
	var c=tst.keysWithPrefix('sh');//取前缀为'sh'的字符
	var d=c.toArray();
	
	var e=tst.keyThatMatch('s..');//匹配开头为s的三位字符
	var f=e.toArray();
	
}
