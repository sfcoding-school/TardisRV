/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera ) {

	var scope = this;
	var collBool = false;
	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	//TEST
	var yawObject;
	var cubeGeometry = new THREE.CubeGeometry(30,30,30,1,1,1);
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
    yawObject = new THREE.Mesh( cubeGeometry, wireMaterial );
    yawObject.add( pitchObject );
	//END TEST

	yawObject.position.set(0, 0, -100);

/*
//original
	var yawObject = new THREE.Object3D();
	yawObject.position.y = 220;
	yawObject.add( pitchObject );
//end  original

	var cubeGeometry = new THREE.CubeGeometry(50,50,50,1,1,1);
            var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
            MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
*/
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

	var prova = new Array(false, false, false, false);
	
	var check2 = false;

	this.update = function ( delta ) {

		if ( scope.enabled === false ) return;

		delta *= 0.1;

		var cost = 0.5;
		
		velocity.x += ( - velocity.x ) * 0.08 * delta;
		velocity.z += ( - velocity.z ) * 0.08 * delta;
		velocity.y -= 0.5 * delta;

		if (moveForward){
			velocity.z -= cost * delta;
			prova[0] = true;
		}
		if (moveBackward){ 
			velocity.z += cost * delta;
			prova[1] = true;
		}
		if (moveLeft){ 
			velocity.x -= cost * delta;
			prova[2] = true;
		}
		if (moveRight){ 
			velocity.x += cost * delta;
			prova[3] = true;
		}
		if ( isOnObject === true ) {
			velocity.y = Math.max( 0, velocity.y );
		}

		////////////////////////////7

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

            // We reset the raycaster to this direction
            caster.set(yawObject.position, rays[i]);
            // Test if we intersect with any obstacle mesh
            collisions = caster.intersectObjects(collidableMeshList);

            // And disable that direction if we do
            if (collisions.length > 0) {
            	if(prova[0]){
            		if(collisions[0].distance - (cost * delta) < 125)
						velocity.z += 1 * delta;
              	}
              	if(prova[1]){
            		if(collisions[0].distance + (cost * delta) < 125)
						velocity.z -= 1 * delta;
              	}
              	if(prova[2]){
            		if(collisions[0].distance - (cost * delta) < 125)
						velocity.x += 1 * delta;
              	}
              	if(prova[3]){
            		if(collisions[0].distance + (cost * delta) < 125)
						velocity.x -= 1 * delta;
              	}
            }

        }
       
		////////////////////////////

		//console.log(yawObject.rotation.z);

		yawObject.translateX( velocity.x );
		yawObject.translateY( velocity.y ); 
		yawObject.translateZ( velocity.z );

		if ( yawObject.position.y < 220 ) {
			velocity.y = 0;
			yawObject.position.y = 220;
			canJump = true;
		}

		 prova[0] = false;prova[1] = false;prova[2] = false;prova[3] = false;
	};


};
/*

	this.update = function ( delta ) {

		if ( scope.enabled === false ) return;

		delta *= 0.1;

		var cost = 0.5;

		velocity.x += ( - velocity.x ) * 0.08 * delta;
		velocity.z += ( - velocity.z ) * 0.08 * delta;

		velocity.y -= 0.5 * delta;

		if (moveForward){
			velocity.z -= cost * delta;
			prova[0] = true;
		}
		if (moveBackward){ 
			velocity.z += cost * delta;
			prova[1] = true;
		}
		if (moveLeft){ 
			velocity.x -= cost * delta;
			prova[2] = true;
		}
		if (moveRight){ 
			velocity.x += cost * delta;
			prova[3] = true;
		}
		if ( isOnObject === true ) {
			velocity.y = Math.max( 0, velocity.y );
		}

		////////////////////////////7

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

            // We reset the raycaster to this direction
            caster.set(yawObject.position, rays[i]);
            // Test if we intersect with any obstacle mesh
            collisions = caster.intersectObjects(collidableMeshList);

            // And disable that direction if we do
            if (collisions.length > 0 && collisions[0].distance < 200) {
            	
                // Yep, this.rays[i] gives us : 0 => up, 1 => up-left, 2 => left, ...
                if ((i === 0 || i === 1 || i === 7)) {
                    if(prova[0]){
                    	velocity.z = 0;
                    }
                } else if ((i === 3 || i === 4 || i === 5)) {
                    if(prova[1]){
                    	velocity.z = 0;
                    }
                }
                if ((i === 1 || i === 2 || i === 3)) {
                     if(prova[2]){
                    	velocity.x = 0;
                    }
                } else if ((i === 5 || i === 6 || i === 7)) {
                    if(prova[3]){
                    	velocity.x = 0;
                    }
                }
            }

        }
       
		////////////////////////////

		//console.log(yawObject.rotation.z);

		yawObject.translateX( velocity.x );
		yawObject.translateY( velocity.y ); 
		yawObject.translateZ( velocity.z );

		if ( yawObject.position.y < 220 ) {
			velocity.y = 0;
			yawObject.position.y = 220;
			canJump = true;
		}

		 prova[0] = false;prova[1] = false;prova[2] = false;prova[3] = false;
	};


};
*/
// this.update = function ( delta ) {

// 		if ( scope.enabled === false ) return;

// 		//TEST ///////////////////////////////
// 		collision();
		
//         //end test

// 		delta *= 0.1;

// 		var cost = 0.5;

// 		velocity.x += ( - velocity.x ) * 0.08 * delta;
// 		velocity.z += ( - velocity.z ) * 0.08 * delta;

// 		velocity.y -= 0.5 * delta;

// 		if (moveForward && !prova[0]){
// 			velocity.z -= cost * delta;
// 		}
// 		if ( moveBackward && !prova[1]){ 
// 			velocity.z += cost * delta;
// 		}
// 		if ( moveLeft && !prova[2]){ 
// 			velocity.x -= cost * delta;
// 		}
// 		if ( moveRight && !prova[3]){ 
// 			velocity.x += cost * delta;
// 		}
// 		if ( isOnObject === true ) {
// 			velocity.y = Math.max( 0, velocity.y );
// 		}

// 		yawObject.translateX( velocity.x );
// 		yawObject.translateY( velocity.y ); 
// 		yawObject.translateZ( velocity.z );

// 		if ( yawObject.position.y < 220 ) {

// 			velocity.y = 0;
// 			yawObject.position.y = 220;

// 			canJump = true;

// 		}

		

		
// 	};//questo serve

// function collision(  )
//         {
        	
//             // /*send rays from center of person to each vertex in bounding geometry*/
//             // for (var vertexIndex = 0; vertexIndex < yawObject.geometry.vertices.length; vertexIndex++)
//             // {       
//             //     var localVertex = yawObject.geometry.vertices[vertexIndex].clone();
//             //     var globalVertex = localVertex.applyMatrix4( yawObject.matrix );
//             //     var directionVector = globalVertex.sub( yawObject.position );
                
//             //     var ray = new THREE.Raycaster( yawObject.position, directionVector.clone().normalize() );
//             //     var collisionResults = ray.intersectObjects( collidableMeshList );

//             //      if ( collisionResults.length > 0 /*&& collisionResults[0].distance < (directionVector.length() + 75)*/) {
//             //      	console.log(check);
//             //      	prova[check] = true;
//             //      	return true;
//             //     } else {
//             //     	return false;               	
//             //     }
                         
//             // }

//            var rays = [
//                 new THREE.Vector3(0, 0, 1),
//                 new THREE.Vector3(1, 0, 1),
//                 new THREE.Vector3(1, 0, 0),
//                 new THREE.Vector3(1, 0, -1),
//                 new THREE.Vector3(0, 0, -1),
//                 new THREE.Vector3(-1, 0, -1),
//                 new THREE.Vector3(-1, 0, 0),
//                 new THREE.Vector3(-1, 0, 1)
//         	]; 
//             var collisions, i;
//             // Maximum distance from the origin before we consider collision
//            var distance = 150;
//            var caster = new THREE.Raycaster();
//             // Get the obstacles array from our world       
//             // For each ray
//             var bool = false;
//         for (i = 0; i < rays.length; i += 1) {

//             // We reset the raycaster to this direction
//             caster.set(yawObject.position, rays[i]);
//             // Test if we intersect with any obstacle mesh
//             collisions = caster.intersectObjects(collidableMeshList);

//             // And disable that direction if we do
//             if (collisions.length > 0 && collisions[0].distance < 200) {
//             	console.log(collisions[0].distance);
//             	bool = true;
//                 // Yep, this.rays[i] gives us : 0 => up, 1 => up-left, 2 => left, ...
//                 if ((i === 0 || i === 1 || i === 7)) {
//                     prova[0] = true;prova[1] = false;prova[2] = false;prova[3] = false;
//                 } else if ((i === 3 || i === 4 || i === 5)) {
//                     prova[0] = false;prova[1] = true;prova[2] = false;prova[3] = false;
//                 }
//                 if ((i === 1 || i === 2 || i === 3)) {
//                      prova[0] = false;prova[1] = false;prova[2] = true;prova[3] = false;
//                 } else if ((i === 5 || i === 6 || i === 7)) {
//                      prova[0] = false;prova[1] = false;prova[2] = false;prova[3] = true;
//                 }
//             }

//         }
//         if(bool)
//         {prova[0] = false;prova[1] = false;prova[2] = false;prova[3] = false;}
//     }
// //////////// FINE TEST ////////////////////////
// };
