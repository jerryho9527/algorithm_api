function input_array(arrayName){
	var count=0;
	var oneElement=0;
	while(oneElement!=999){
		oneElement=prompt('please input num ' + (count+1) + ' until input 999',999);
		if(oneElement==999){
			break;
		}else{
			arrayName[count]=parseFloat(oneElement);
			count++;
		}
	}
}

function bubbleUp(arrayName){
	var temp=0;
	var flag=0;
	while(flag==0){
		flag=1;
		for(var i=0;i<arrayName.length-1;i++){
			if(arrayName[i]>arrayName[i+1]){
				temp=arrayName[i];
				arrayName[i]=arrayName[i+1];
				arrayName[i+1]=temp;
				flag=0;
			}
		}
	}
	return(arrayName);
}

function bubbleDown(arrayName){
	var temp=0;
	var flag=0;
	while(flag==0){
		flag=1;
		for(var i=0;i<arrayName.length-1;i++){
			if(arrayName[i]<arrayName[i+1]){
				temp=arrayName[i];
				arrayName[i]=arrayName[i+1];
				arrayName[i+1]=temp;
				flag=0;
			}
		}
	}
	return(arrayName);
}


function examScores(){
	var scores=new Array();
	input_array(scores);
	document.write('origin array:<br/>');
	for(var i=0;i<scores.length;i++){
		document.write(scores[i]+' ');
	}
	document.write('<br/>');
	var flag=prompt('choose sort up 1 or sort down 2','1');
	if(flag==1){
		bubbleUp(scores);
	}else if(flag==2){
		bubbleDown(scores);
	}else{
		alert('wrong!');
		return;
	}
	document.write('sorted array:<br/>');
	for(var i=0;i<scores.length;i++){
		document.write(scores[i]+' ');
	}
}