window.onload=function(){
	var timeout = 1000;
	var a = 1;
	var action = function() {
	    var d = document.getElementById("test");
	    if(a == 1){
		 		d.setAttribute('emissiveColor', '1.000 0.000 0.000'); 
		 		a = 0;
		 	} else {
		 		d.setAttribute('emissiveColor', '0.000 0.000 0.000'); 
		 		a = 1;
		 	}
	};
	setInterval(action, timeout);
	
	/*Math.floor((Math.random()*1500)+1);*/
};

/*Movimento manopola sinistra*/
var manopola_sx = true;
function prova(){
	var d = document.getElementById("manopola_alta_sx");
	if(manopola_sx){
		d.setAttribute('translation', '0.916773 2.983296 -0.190229');
		d.setAttribute('rotation', '-0.217361 -0.188173 -0.957781 2.863452');
		manopola_sx = false;
	} else {
		d.setAttribute('translation', '0.849840 3.086914 -0.375499');
		d.setAttribute('rotation', '-0.239372 -0.578319 -0.779903 2.807846');
		manopola_sx = true;
	}
}