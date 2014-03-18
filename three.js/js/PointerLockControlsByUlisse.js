/**
 * @author mrdoob / http://mrdoob.com/
 * @Modified by Ulisse
 */

THREE.PointerLockControls = function ( camera ) {

	var collidableMeshList = [];
	var scope = this;
	var collBool = false;
	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject;
	var cubeGeometry = new THREE.CubeGeometry(30,30,30,1,1,1);
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:false } );
    yawObject = new THREE.Mesh( cubeGeometry, wireMaterial );
    yawObject.add( pitchObject );

	yawObject.position.set(0, 200, -250);

	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;

	var isOnObject = false;
	var canJump = false;

	var velocity = new THREE.Vector3();

	var PI_2 = Math.PI / 2;

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

	var onMouseDown = function(event){

	}

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

	getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, -1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		}

	}();

	var which = new Array(false, false, false, false);

	this.update = function ( delta ) {

		if ( scope.enabled === false ) return;

		delta *= 0.1;

		var cost = 0.5;
		
		velocity.x += ( - velocity.x ) * 0.08 * delta;
		velocity.z += ( - velocity.z ) * 0.08 * delta;
		velocity.y -= 0.5 * delta;

		if (moveForward){
			velocity.z -= cost * delta;
			which[0] = true;
		}
		if (moveBackward){ 
			velocity.z += cost * delta;
			which[1] = true;
		}
		if (moveLeft){ 
			velocity.x -= cost * delta;
			which[2] = true;
		}
		if (moveRight){ 
			velocity.x += cost * delta;
			which[3] = true;
		}
		if ( isOnObject === true ) {
			velocity.y = Math.max( 0, velocity.y );
		}

		/*** check collision ***/

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
        // Get the obstacles array from our world       
        // For each ray
            
        for (i = 0; i < rays.length; i += 1) {

            caster.set(yawObject.position, rays[i]);

            // Test if we intersect with any obstacle mesh
            collisions = caster.intersectObjects(collidableMeshList);

            // And disable that direction with 
            if (collisions.length > 0) {
            	if(which[0]){
            		if(collisions[0].distance - (cost * delta) < 150)
						velocity.z += 1 * delta;
              	}
              	if(which[1]){
            		if(collisions[0].distance + (cost * delta) < 150)
						velocity.z -= 1 * delta;
              	}
              	if(which[2]){
            		if(collisions[0].distance - (cost * delta) < 150)
						velocity.x += 1 * delta;
              	}
              	if(which[3]){
            		if(collisions[0].distance + (cost * delta) < 150)
						velocity.x -= 1 * delta;
              	}
            }

        }

		yawObject.translateX( velocity.x );
		yawObject.translateY( velocity.y ); 
		yawObject.translateZ( velocity.z );

		if ( yawObject.position.y < 220 ) {
			velocity.y = 0;
			yawObject.position.y = 220;
			canJump = true;
		}

		 which[0] = false; which[1] = false; which[2] = false; which[3] = false; //reset array which
	};

	this.addMesh = function(mesha){
		collidableMeshList.push(mesha);
	};

	this.onDocumentMouseDown = function( event ) {
            console.log("ciao");
            var projector = new THREE.Projector();
            var raycaster = new THREE.Raycaster();
            var vector = new THREE.Vector3( puntatore.position.x, puntatore.position.y, 1 );
                projector.unprojectVector( vector, camera );

                raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

                var intersects = raycaster.intersectObjects( collidableMeshList );

                if ( intersects.length > 0 ) {

                  console.log("ciao2");

                }
            }

}; 

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