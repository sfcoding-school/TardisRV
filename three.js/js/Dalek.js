var vDalek = 0.01;
var dio  = 0;
var dio2 = 0;
var inMovimento = false;
var rDalek = 0;

function Dalek(scene, dalek){
	this.scene = scene;
	this.dalek = dalek;
}

Dalek.prototype.manage = function(){
	var scene = this.scene;
	var dalek = this.dalek;
	var onKeyDown = function (event) {
		switch ( event.keyCode ) {
			case 72:
				console.log("H");
			 	if (!inMovimento) {
			 		console.log(scene);
			 		console.log("H1");
					scene.add(dalek);
					inMovimento = true;

					dio  = Math.floor(Math.random() * 2*Math.PI);
					dio2 = Math.floor(Math.random() * 350) + 200;

				} else {
					console.log("H2");
					scene.remove(dalek);
					inMovimento = false;
				}
				break;
		}
	};

	document.addEventListener( 'keydown', onKeyDown, false );

	setInterval(function() {
                rDalek = Math.floor(Math.random() * 450) + 180;
            }, 10000);
}

Dalek.prototype.update = function(){
	    if (inMovimento) {
	    	dio += vDalek;

            if (dio2 >= rDalek){
                dio2-=vDalek+1;
            }
            else{
                dio2+=vDalek+1;
            }

            this.dalek.position.x = Math.sin(dio) * dio2;
            this.dalek.position.z = Math.cos(dio) * dio2;
            this.dalek.rotation.y += vDalek;
        }
}

