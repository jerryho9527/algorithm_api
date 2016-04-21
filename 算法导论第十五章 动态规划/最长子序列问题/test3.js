function sortUp(){
	// var m=['A','B','C','B','D','A','B'];
	// var n=['B','D','C','A','B','A'];
	var m=['c','n','b','l','o','g','s'];
	var n=['b','e','l','o','n','g'];
	
	var x=new Array();
	for(var i=0;i<m.length;i++){
		x.push(m[i]);
	}
	x.reverse();
	x.push(0);
	x.reverse();
	
	var p=LCS_length(m,n);
	var c=p[0];
	var b=p[1];
	
	// var d=Print_LCS(c,x,m.length,n.length).reverse();
	var d=Print_LCS_extra(c,x,m.length,n.length).reverse();
	
	
	for(var i=0;i<c.length;i++){
		for(var j=0;j<c[i].length;j++){
			document.write(c[i][j]+'  ');
		}
		document.write('<br/>');
	}
	document.write('<br/>');

	for(var i=1;i<b.length;i++){
		for(var j=1;j<b[i].length;j++){
			document.write(b[i][j]+'  ');
		}
		document.write('<br/>');
	}
	document.write('<br/>');	
	
	document.write(d);
}
