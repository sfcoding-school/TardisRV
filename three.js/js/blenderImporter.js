//costruttorevar 
function blenderImporter(scene){
	this.scene = scene;
	console.log(scene);
	this.loader = new THREE.JSONLoader();
}

blenderImporter.prototype.import = function(fileName, scale, positionVector, rotationVector, callBack){
	console.log(this.scene);
	//console.log('importer');
	//var loader = new THREE.JSONLoader();
	var object;
	//console.log(loader);
	this.loader.load("/modelli/"+fileName, function( geometry, materials) {
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX(rotationVector[0]) );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationY(rotationVector[1]) );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationZ(rotationVector[2]) );
		object = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(materials) );
        object.scale.set( scale, scale, scale );
        object.position.x = positionVector[0];
        object.position.y = positionVector[1];
        object.position.z = positionVector[2];
        object.castShadow = true;
        object.receiveShadow = true;
        object.name = fileName;

		//console.log(object);
        //this.scene.add(object);

        callBack(geometry, object);  
    }); 
};
