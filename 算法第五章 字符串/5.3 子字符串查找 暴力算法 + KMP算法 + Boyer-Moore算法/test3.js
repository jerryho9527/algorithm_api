function sortUp(){
	// var pat='ABRA';
	// var txt='ABABRACBABRAAAD';	
	// KMP_matcher(txt,pat);//KMP算法的实现
	
	
	var pat='NEEDLE';
	var txt='FINDINAHAYSTACKNEEDLEINA';
	
	Boyer_Moore_matcher(txt,pat);//Boyer-Moore算法的实现
	
}
