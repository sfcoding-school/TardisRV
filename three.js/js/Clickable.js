var clickMesh = [];
var object;

function Clickable(controls){
	object = controls;
}

Clickable.prototype.addCMesh = function(mesha){
	clickMesh.push(mesha);
};

Clickable.prototype.onDocumentMouseDown = function( event ) {

	//console.log(clickMesh);

	var test = object.getObject().position;
	var raycaster = new THREE.Raycaster();
	var projector = new THREE.Projector();
	var vector = new THREE.Vector3( 0,  0, -5 );

	projector.unprojectVector( vector, camera );
	raycaster.set( test, vector.sub( test ).normalize() );

	var intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length > 0 ) {

		//var manopola_uuid = clickMesh[0].uuid;
		clickMesh.forEach(function(entry) {
			console.log(entry);
			if (intersects[0].object.uuid == entry[0].uuid && intersects[0].distance < 200) {
				entry[1].startAni();
			}
		});
		//if (intersects[0].object.uuid == manopola_uuid && intersects[0].distance < 200) {
		//	manopolaAnimation1.startAni();
		//}
	}
};