var muoviManopola = false;
var revert = false;
var t = 0;

//costruttore
function Animation(object){
	
   	this.object = object;

   	console.log(this.object);
   
}

// metodi
Animation.prototype.update = function(){
	//console.log(muoviManopola);
    if (muoviManopola){
    	if (revert){
    	    if (t<30){
                this.object.rotateOnAxis( new THREE.Vector3(1,0,-0.70).normalize(), -0.05 );
                t+=1;
            }else{
                t=0;
                muoviManopola=false;
                revert = false;
            }
        }else{
        	if (t<30){
                this.object.rotateOnAxis( new THREE.Vector3(1,0,-0.70).normalize(), 0.05 );
                t+=1;
            }else{
                t=0;
                muoviManopola=false;
            }
        }
        console.log(t);
        t+=1;
	}
}

Animation.prototype.startAni = function(){
	console.log(muoviManopola);
	muoviManopola = true;
}

Animation.prototype.revertAni = function(){
	muoviManopola = true;
}