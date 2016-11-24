function code() {
	var ine = document.getElementById('textIn');
	var oute = document.getElementById('textOut');
	oute.value = "";
	for(i=0; i<ine.value.length; i++) {
		if(ine.value.charCodeAt(i)  >= 33 && ine.value.charCodeAt(i) <= 126) {
			oute.value += String.fromCharCode(ine.value.charCodeAt(i) + 65248);
		} else if(ine.value.charCodeAt(i) == 32) {
			oute.value += String.fromCharCode(12288);
		}
	}
}

// oute.value += String.fromCharCode(12288);