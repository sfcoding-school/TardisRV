/*
 * @author by Ulisse
 * This class is based on PointerLockControl(by mrdoob / http://mrdoob.com/)
 */

THREE.PointerLockControls = function ( camera ) {

	/** VARIABLES **/
	var collidableMeshList = [];
	var scope = this;
	camera.rotation.set( 0, 0, 0 );

	//Puntatore
	var puntatore = new THREE.BoxGeometry(0.1,0.1,0.1);
    var material = new THREE.MeshBasicMaterial( { color: "blue" });
    puntatore.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, -5) );
    puntatore = new THREE.Mesh(puntatore, material);
    camera.add(puntatore);

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject;
	var cubeGeometry = new THREE.CubeGeometry(30,30,30,1,1,1);
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:false } );
    yawObject = new THREE.Mesh( cubeGeometry, wireMaterial );
    yawObject.add( pitchObject );
	yawObject.position.set(0, 200, -800);
    yawObject.rotation.y = Math.PI;

	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
	var isOnObject = false;
	var canJump = false;
	var velocity = new THREE.Vector3();
	var PI_2 = Math.PI / 2;
	var bool = true; 
	var last;
	var whichy = new Array(true, true, true, true);

	/** Functions **/
	var onMouseMove = function ( event ) {

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;
		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};

	var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true; 
				break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;

			case 32: // space
				if ( canJump === true ) velocity.y += 11;
				canJump = false;
				break;

		}

	};

	var onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;

		}

	};

	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

	this.enabled = false;

	this.getObject = function () {

		return yawObject;

	};

	this.isOnObject = function ( boolean ) {

		isOnObject = boolean;
		canJump = boolean;

	};

	this.getDirection = function() {
		/* it is useful for class Clickable */
		return pitchObject;

	};

	this.update = function ( delta ) {

		if ( scope.enabled === false ) return;

		delta *= 0.1;
		var cost = 0.5;
		
		velocity.x += ( - velocity.x ) * 0.08 * delta;
		velocity.z += ( - velocity.z ) * 0.08 * delta;
		velocity.y -= 0.5 * delta;

		if (moveForward && whichy[0]){
			velocity.z -= cost * delta;
			last = 0;
		}
		if (moveBackward && whichy[1]){ 
			velocity.z += cost * delta;
			last = 1;
		}
		if (moveLeft && whichy[2]){ 
			velocity.x -= cost * delta;
			last = 2;
		}
		if (moveRight && whichy[3]){ 
			velocity.x += cost * delta;
			last = 3;
		}
		if ( isOnObject === true ) {
			velocity.y = Math.max( 0, velocity.y );
		}
		
		/*** check collision ***/
		/*
		var rays = [
                new THREE.Vector3(0, 0, 1),
                new THREE.Vector3(1, 0, 1),
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(1, 0, -1),
                new THREE.Vector3(0, 0, -1),
                new THREE.Vector3(-1, 0, -1),
                new THREE.Vector3(-1, 0, 0),
                new THREE.Vector3(-1, 0, 1)
        	]; 
        var collisions, i;         
        var caster = new THREE.Raycaster();
        var count = 0;

        for (i = 0; i < rays.length; i += 1) {
        	
            caster.set(yawObject.position, rays[i]);

            // Test if we intersect with any obstacle mesh
            collisions = caster.intersectObjects(collidableMeshList);

            // And disable that direction with 
            if (collisions.length > 0) {
            	if((collisions[0].distance + (cost * delta ))< 200 || (collisions[0].distance -( cost * delta) )< 200 ){
	            	if (bool) {

	            		bool = false;

	            		if(last == 0){
	            			whichy[0] = false; whichy[1] = true; whichy[2] = false; whichy[3] = false;
	            			velocity.z += cost * delta;
	            		}
	            		if(last == 1){
	            			whichy[0] = true; whichy[1] = false; whichy[2] = false; whichy[3] = false;
	            			velocity.z -= cost * delta;
	            		}
	            		if(last == 2){
	            			whichy[0] = false; whichy[1] = false; whichy[2] = false; whichy[3] = true;
	            			velocity.z += cost * delta;
	            		}
	            		if(last == 3){
	            			whichy[0] = false; whichy[1] = false; whichy[2] = true; whichy[3] = false;
	            			velocity.z -= cost * delta;
	            		}
	            	}
	           	}             
            } else {
            	count++;
            }
        }

        if(count == rays.length-1){
        	bool = true;
        	whichy[0] = true; whichy[1] = true; whichy[2] = true; whichy[3] = true;
        }
*/
		yawObject.translateX( velocity.x );
		yawObject.translateY( velocity.y ); 
		yawObject.translateZ( velocity.z );

		if ( yawObject.position.y < 220 ) {
			velocity.y = 0;
			yawObject.position.y = 220;
			canJump = true;
		}	
	};

	this.addMesh = function(mesha){
		collidableMeshList.push(mesha);
	};
}; 


/*** old correct code ***/
	//var which = new Array(false, false, false, false);
	// this.update = function ( delta ) {

	// 	if ( scope.enabled === false ) return;

	// 	delta *= 0.1;

	// 	var cost = 0.5;
		
	// 	velocity.x += ( - velocity.x ) * 0.08 * delta;
	// 	velocity.z += ( - velocity.z ) * 0.08 * delta;
	// 	velocity.y -= 0.5 * delta;

	// 	if (moveForward){
	// 		velocity.z -= cost * delta;
	// 		which[0] = true;
	// 	}
	// 	if (moveBackward){ 
	// 		velocity.z += cost * delta;
	// 		which[1] = true;
	// 	}
	// 	if (moveLeft){ 
	// 		velocity.x -= cost * delta;
	// 		which[2] = true;
	// 	}
	// 	if (moveRight){ 
	// 		velocity.x += cost * delta;
	// 		which[3] = true;
	// 	}
	// 	if ( isOnObject === true ) {
	// 		velocity.y = Math.max( 0, velocity.y );
	// 	}

	// 	/*** check collision ***/

	// 	var rays = [
 //                new THREE.Vector3(0, 0, 1),
 //                new THREE.Vector3(1, 0, 1),
 //                new THREE.Vector3(1, 0, 0),
 //                new THREE.Vector3(1, 0, -1),
 //                new THREE.Vector3(0, 0, -1),
 //                new THREE.Vector3(-1, 0, -1),
 //                new THREE.Vector3(-1, 0, 0),
 //                new THREE.Vector3(-1, 0, 1)
 //        	]; 
 //        var collisions, i;
           
 //        var caster = new THREE.Raycaster();
 //        // Get the obstacles array from our world       
 //        // For each ray
            
 //        for (i = 0; i < rays.length; i += 1) {

 //            caster.set(yawObject.position, rays[i]);

 //            // Test if we intersect with any obstacle mesh
 //            collisions = caster.intersectObjects(collidableMeshList);

 //            // And disable that direction with 
 //            if (collisions.length > 0) {
            	
 //            	if(which[0]){
 //            		if(collisions[0].distance - (cost * delta) < 150)
	// 					velocity.z += 1 * delta;
 //              	}
 //              	if(which[1]){
 //            		if(collisions[0].distance + (cost * delta) < 150)
	// 					velocity.z -= 1 * delta;
 //              	}
 //              	if(which[2]){
 //            		if(collisions[0].distance - (cost * delta) < 150)
	// 					velocity.x += 1 * delta;
 //              	}
 //              	if(which[3]){
 //            		if(collisions[0].distance + (cost * delta) < 150)
	// 					velocity.x -= 1 * delta;
 //              	}
             
 //            }
 //        }

	// 	yawObject.translateX( velocity.x );
	// 	yawObject.translateY( velocity.y ); 
	// 	yawObject.translateZ( velocity.z );

	// 	if ( yawObject.position.y < 220 ) {
	// 		velocity.y = 0;
	// 		yawObject.position.y = 220;
	// 		canJump = true;
	// 	}
	// 	which[0] = false; which[1] = false; which[2] = false; which[3] = false; //reset array which
	// };

/*** check which ray 
        
        for (i = 0; i < rays.length; i += 1) {

            // We reset the raycaster to this direction
            caster.set(yawObject.position, rays[i]);
            // Test if we intersect with any obstacle mesh
            collisions = caster.intersectObjects(collidableMeshList);

            // And disable that direction if we do
            if (collisions.length > 0 && collisions[0].distance < 200) {
            	
                // Yep, this.rays[i] gives us : 0 => up, 1 => up-left, 2 => left, ...
                if ((i === 0 || i === 1 || i === 7)) {
                    
                } else if ((i === 3 || i === 4 || i === 5)) {
                   
                }
                if ((i === 1 || i === 2 || i === 3)) {
                    
                } else if ((i === 5 || i === 6 || i === 7)) {
                   
                }
            }

        }
*/