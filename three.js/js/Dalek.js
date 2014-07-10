var vDalek = 0.01;
var dio  = 0;
var dio2 = Math.floor(Math.random() * 350) + 200;
var dalek;
var inMovimento;

function Dalek(scene, rDalek, dalek){
	this.scene = scene;
	this.rDalek = rDalek;
	this.dalek = dalek;
	inMovimento = false;
}

Dalek.prototype.manage = function(dalek){

	

	var onKeyDown = function ( event ) {
		console.log("click");
		switch ( event.keyCode ) {

			case 72:
				console.log("H");
			 	if (!inMovimento) {
					this.scene.add(dalek);
					inMovimento = true;
				} else {
					this.scene.remove(dalek);
					inMovimento = false;
				}
				break;
	 	};

		document.addEventListener( 'keydown', onKeyDown, false );

	}
}

Dalek.prototype.update = function(){
	    if (inMovimento) {
	    	dio += vDalek;

            if (dio2 >= this.rDalek){
                dio2-=vDalek+1;
            }
            else{
                dio2+=vDalek+1;
            }

            dalek.position.x = Math.sin(dio) * dio2;
            dalek.position.z = Math.cos(dio) * dio2;
            dalek.rotation.y += vDalek;
        }
}

