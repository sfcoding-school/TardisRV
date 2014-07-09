function dalekC(scene){
	this.scene = scene;
}

dalekC.prototype.manage = function(dalek){

	

	var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			case 72: // up
				console.log("H");
				break;
		}

	};

	document.addEventListener( 'keydown', onKeyDown, false );

}

dalekC.prototype.update = function(){
	
}