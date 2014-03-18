var muoviManopola = false;
var up = true;
var revert = false;
var t = 0;

//costruttore
function Animation(object){
	
   	this.object = object;
   	//console.log(this.object);
}

// metodi
Animation.prototype.update = function(){
    if (muoviManopola){
        if (revert){
            if (t>=0){
                this.object.rotateOnAxis( new THREE.Vector3(1,0,-0.70).normalize(), 0.05 );
                t-=1;
            }else{
                muoviManopola=false;
                revert = false;
            }
        }else{
            if (t<=30){
                this.object.rotateOnAxis( new THREE.Vector3(1,0,-0.70).normalize(), -0.05 );
                t+=1;
            }else{
                muoviManopola=false;
            }
        }
	}
}

Animation.prototype.startAni = function(){
	muoviManopola = true;
	if (up){
		revert = false;
		up = false;
	}else{
		revert = true;
		up = true;
	}

}