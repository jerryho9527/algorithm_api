//贪心算法求解霍夫曼编码(算法导论16.3)
function sortUp(){
	var c=[['a',45],['b',13],['c',12],['d',16],['e',9],['f',5]];
	// var c=[['a',1],['b',1],['c',2],['d',3],['e',5],['f',8],['g',13],['h',21]];//斐波那契数列
	var huff=new Huffman(c);
	var code=huff.getHuffmanCode();
	
	
}