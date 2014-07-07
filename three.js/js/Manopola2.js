var muoviManopola = false;
var up = true;
var revert = false;
var t = 0;
var luci_on = false;

//costruttore
function Manopola2(object){
    this.object = object;
    //console.log(this.object);
}

// metodi
Manopola2.prototype.update = function(){
    if (muoviManopola){
        if (revert){
            if (t>=0){
                this.object.rotateOnAxis( new THREE.Vector3(1,0,-0.70).normalize(), 0.05 );
                t-=1;
                 luci_on = false;
            }else{
                muoviManopola=false;
                revert = false;
            }
        }else{
            if (t<=30){
                this.object.rotateOnAxis( new THREE.Vector3(1,0,-0.70).normalize(), -0.05 );
                t+=1;
                luci_on = true;
            }else{
                muoviManopola=false;
            }
        }
	}

    if(luci_on){
        
        var a = Math.floor((Math.random()*100)+1)%8;

        if(a === 0){
            cylinder1.material.emissive.setHex( 0xff0000 );
        }
        if(a == 1){
            cylinder1.material.emissive.setHex( 0x8B0000 );
        }
        if(a == 2){
            cylinder2.material.emissive.setHex( 0xff0000 );
        }
        if(a == 3){
            cylinder2.material.emissive.setHex( 0x8B0000 );
        }
        if(a == 4){
            cylinder3.material.emissive.setHex( 0xff0000 );
        }
        if(a == 5){
            cylinder3.material.emissive.setHex( 0x8B0000 );
        }
        if(a == 6){
            cylinder4.material.emissive.setHex( 0xff0000 );
        }
        if(a == 7){
            cylinder4.material.emissive.setHex( 0x8B0000 );
        }
    
    /*Math.floor((Math.random()*1500)+1);*/
    } else {
        cylinder1.material.emissive.setHex( 0x8B0000 );
        cylinder2.material.emissive.setHex( 0x8B0000 );
        cylinder3.material.emissive.setHex( 0x8B0000 );
        cylinder4.material.emissive.setHex( 0x8B0000 );
    }
};

Manopola2.prototype.startAni = function(){
	muoviManopola = true;
	if (up){
		revert = false;
		up = false;
	}else{
		revert = true;
		up = true;
	}
};