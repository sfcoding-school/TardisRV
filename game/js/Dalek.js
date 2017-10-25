var vDalek = 0.0005;
var tempvar  = 0;
var tempvar2 = 0;
var inMovimento = false;
var rDalek = 0;
var primaVolta;
var updateLight;

function Dalek(scene, dalek, light, lightD){
	this.scene = scene;
	this.dalek = dalek;
    this.light = light;
    this.lightD = lightD;
    this.manage();
}

Dalek.prototype.manage = function(){
	var scene = this.scene;
	var dalek = this.dalek;

    var audio1 = document.getElementById("audioSound");
    audio1.volume = 0.5;
    audio1.onended = function(){
        console.log('fine musica!');
        audio1.load();
        audio1.play();
    };
    audio1.load();
    audio1.play();

    
    var audio2 = document.getElementById("audioDalek");
    audio2.volume = 1;
    audio2.onended = function(){
        console.log('fine musica!');
        audio2.load();
        audio2.play();
    };
    audio2.load();

	var onKeyDown = function (event) {
		switch ( event.keyCode ) {
			case 72:
				console.log("H");
			 	if (!inMovimento) {
			 		console.log(scene);
			 		console.log("H1");
					scene.add(dalek);
					inMovimento = true;

					tempvar  = Math.floor(Math.random() * 2*Math.PI);
					tempvar2 = Math.floor(Math.random() * 350) + 200;

                    audio1.pause();
                    audio2.play();

				} else {
					console.log("H2");
					scene.remove(dalek);
					inMovimento = false;

                    audio2.pause();
                    audio1.play();
                    
				}
				break;
		}
	};

	document.addEventListener( 'keydown', onKeyDown, false );

	setInterval(function() {
                rDalek = Math.floor(Math.random() * 450) + 180;
            }, 10000);
};

Dalek.prototype.update = function(delta){
    if (inMovimento) {
        
    	tempvar += vDalek*delta;

        if (tempvar2 >= rDalek){
            tempvar2-=vDalek*delta+1;
        }
        else{
            tempvar2+=vDalek*delta+1;
        }

        this.dalek.position.x = Math.sin(tempvar) * tempvar2;
        this.dalek.position.z = Math.cos(tempvar) * tempvar2;
        this.dalek.rotation.y += vDalek*delta;

        if (!primaVolta){
            console.log('!primaVolta');
            this.lightD.forEach(function(entry) {
                //entry.color.setRGB(1,0,0);
                entry.intensity = Math.sin(tempvar*10)+0.5;
            });
        }else {
            console.log('primaVolta');
            this.light.forEach(function(entry) {
                    this.scene.remove(entry);
                    console.log('forEach');
                });
            primaVolta = false;
        }
    }else{
        if (!primaVolta){
            primaVolta = true;
            //clearInterval(updateLight);
            console.log('else' + updateLight);
            this.light.forEach(function(entry) {
                this.scene.add(entry);
            });

            this.lightD.forEach(function(entry) {
                    //entry.color.setRGB(1,0,0);
                    entry.intensity = 0;
            });
        }
    }
};