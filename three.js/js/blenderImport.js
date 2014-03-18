var loader;
var scene;
//costruttorevar 
function blenderImporter(scene){
	this.scene = scene;
	loader = new THREE.JSONLoader();
}

blenderImporter.prototype.import = function(fileName, scale, positionVector, rotationVector, callBack){
	//console.log(scale);
	console.log('importer');
	//var loader = new THREE.JSONLoader();
	var object;
	loader.load("http://127.0.0.1:8080/modelli/"+fileName, function( geometry, materials ) {
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX(rotationVector[0]));
		geometry.applyMatrix( new THREE.Matrix4().makeRotationY(rotationVector[1]));
		geometry.applyMatrix( new THREE.Matrix4().makeRotationZ(rotationVector[3]));
		object = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(materials));
        object.scale.set( scale, scale, scale );
        object.position.x = positionVector[0];
        object.position.y = positionVector[1];
        object.position.z = positionVector[2];
        object.castShadow = true;
        object.receiveShadow = true;
        console.log(object);
        callBack(geometry, object);
        scene.add(object);
    }); 
}