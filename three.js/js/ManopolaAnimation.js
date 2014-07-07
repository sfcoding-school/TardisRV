
//costruttore
function ManopolaAnimation(object, rotationAxis, funzAccesa, funzSpenta){
    this.object = object;
    this.rotationAxis = rotationAxis;
    this.funzAccesa = funzAccesa;
    this.funzSpenta = funzSpenta;

    //variabili d'ambiente
    this.muoviManopola = false;
    this.up = true;
    this.revert = false;
    this.t = 0;
    this.luci_on = false;
}

// metodi
ManopolaAnimation.prototype.update = function(){
    if (this.muoviManopola){
        if (this.revert){
            if (this.t>=0){
                this.object.rotateOnAxis( this.rotationAxis.normalize(), 0.05 );
                this.t-=1;
                this.luci_on = false;
            }else{
                muoviManopola=false;
                revert = false;
            }
        }else{
            if (this.t<=30){
                this.object.rotateOnAxis( this.rotationAxis.normalize(), -0.05 );
                this.t+=1;
                this.luci_on = true;
            }else{
                this.muoviManopola=false;
            }
        }
	}

    if(this.luci_on){
        
        this.funzAccesa();
        
    
    /*Math.floor((Math.random()*1500)+1);*/
    } else {
        this.funzSpenta();
        
    }
};

ManopolaAnimation.prototype.startAni = function(){
	this.muoviManopola = true;
	if (this.up){
		this.revert = false;
		this.up = false;
	}else{
		this.revert = true;
		this.up = true;
	}
};