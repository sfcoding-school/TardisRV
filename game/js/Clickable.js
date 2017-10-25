var clickMesh = [];
var object;

function Clickable(controls){
	object = controls;
}

Clickable.prototype.addCMesh = function(mesha){
	clickMesh.push(mesha);
};

Clickable.prototype.onDocumentMouseDown = function( event ) {

	console.log(clickMesh);

	var test = object.getObject().position;
	var raycaster = new THREE.Raycaster();
	var projector = new THREE.Projector();
	var vector = new THREE.Vector3( 0,  0, -5 );

	projector.unprojectVector( vector, camera );
	raycaster.set( test, vector.sub( test ).normalize() );
	var intersects;
	if (interno)
		intersects = raycaster.intersectObjects( obInterno.children );
	else
		intersects = raycaster.intersectObjects( obEsterno.children );
	
	if ( intersects.length > 0 ) {

		//var manopola_uuid = clickMesh[0].uuid;
		clickMesh.forEach(function(entry) {
			//console.log(entry);
			if (intersects[0].object.uuid == entry[0].uuid && intersects[0].distance < 200) {
				//if (entry[1].startAni() === null)
				//entry[1]();
				//else
				console.log(entry[0]);
				if (entry[2])
					entry[1].startAni();
				else
					entry[1]();
			}
		});
		//if (intersects[0].object.uuid == manopola_uuid && intersects[0].distance < 200) {
		//	manopolaAnimation1.startAni();
		//}
	}
};