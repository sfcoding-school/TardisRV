//costruttore
function PorteAnimation(object1, object2, rotationAxis, funzAccesa, funzSpenta){
    this.object1 = object1;
    this.object2 = object2;
    this.rotationAxis = rotationAxis;
    this.funzAccesa = funzAccesa;
    this.funzSpenta = funzSpenta;

    //variabili d'ambiente
    this.muoviPorte = false;
    this.up = true;
    this.revert = false;
    this.t = 0;
    this.luci_on = false;
}

// metodi
PorteAnimation.prototype.update = function(){
    if (this.muoviPorte){
        if (this.revert){
            if (this.t>=1){
                this.object1.rotateOnAxis( this.rotationAxis.normalize(), 0.05 );
                this.object2.rotateOnAxis( this.rotationAxis.normalize(), -0.05 );
                this.t-=1;
                this.luci_on = false;
            }else{
                muoviPorte=false;
                revert = false;
            }
        }else{
            if (this.t<=42){
                this.object1.rotateOnAxis( this.rotationAxis.normalize(), -0.05 );
                this.object2.rotateOnAxis( this.rotationAxis.normalize(), 0.05 );
                this.t+=1;
                this.luci_on = true;
            }else{
                this.muoviPorte=false;
            }
        }
	}

    if(this.luci_on){
        this.funzAccesa();
    } else {
        this.funzSpenta();
        
    }
};

PorteAnimation.prototype.startAni = function(){
	this.muoviPorte = true;
	if (this.up){
		this.revert = false;
		this.up = false;
	}else{
		this.revert = true;
		this.up = true;
	}
};