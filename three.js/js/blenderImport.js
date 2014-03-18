var loader = new THREE.JSONLoader();

function blenderImport (fileName, scale, positionVector, scene){
	//console.log(scale);
	//console.log(positionVector);
	var mesh;
	//var loader = new THREE.JSONLoader();
	loader.load("http://127.0.0.1:8080/modelli/"+fileName, function( geometry, materials ) {
		mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(materials));
        mesh.scale.set( scale, scale, scale );
        mesh.position.x = positionVector[0];
        mesh.position.y = positionVector[1];
        mesh.position.z = positionVector[2];
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    }); 
    
}