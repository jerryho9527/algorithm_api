function sortUp(){
	// var student=[['Anderson',2],['Brown',3],['Davis',3],['Garcia',4],['Harris',1],['Jackson',3],['Johnson',4],['Jones',3],['Martin',1],['Martinez',2],['Miller',2],['Moore',1],['Robinson',2],['Smith',4],['Taylor',3],['Thomas',4],['Thompson',4],['White',2],['Williams',3],['Wilson',4]];
	// var string=['4PGC938','2IYE230','3CIO720','1ICK750','1OHV845','4JZY524','1ICK750','3CIO720','1OHV845','1OHV845','2RLA629','2RLA629','3ATW723'];//低位优先的字符串排序样例
	var string=['she','sells','seashells','by','the','sea','shore','the','shells','she','sells','are','surely','seashells'];//高位优先的字符串排序样例
	
	// var a=new LSD();
	// a.sort(string,7);//对7位字符串低位排序
	
	// var b=new MSD();
	// b.sort(string);
	
	var c=new Quick3string();
	c.sort(string);
	
	for(var i=0;i<string.length;i++){
		document.write(string[i]+'<br/>');
	}
}
