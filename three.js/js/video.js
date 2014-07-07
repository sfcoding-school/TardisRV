var video, videoImage, videoTexture;

function video(scene){
	this.scene = scene;
}

video.prototype.loadVideo = function(){
	// create the video element
	video = document.createElement( 'video' );
	video.src = "http://127.0.0.1:8080/esperimenti/kideatsdirt.ogv";
	video.load(); // must call after setting/changing source
	video.play();


	videoImage = document.createElement( 'canvas' );
	videoImage.width = 320;
	videoImage.height = 240;

	videoImageContext = videoImage.getContext( '2d' );
	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

	videoTexture = new THREE.Texture( videoImage );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;

	var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
	// the geometry on which the movie will be displayed;
	//      movie image will be scaled to fit these dimensions.
	//var movieGeometry = new THREE.PlaneGeometry( 50, 50, 1, 1 );
	var movieGeometry = new THREE.CircleGeometry( 30, 128 );
	var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );

	movieScreen.position.set(-100,142,-5);
	movieScreen.rotation.x = -Math.PI / 2;
	movieScreen.rotation.y = -Math.PI / 8;
	movieScreen.rotation.z = -Math.PI / 2;

	this.scene.add(movieScreen);
}

video.prototype.update = function(){
	if ( video.readyState === video.HAVE_ENOUGH_DATA ) {
	    videoImageContext.drawImage( video, 0, 0 );
	    if ( videoTexture ) {
	        videoTexture.needsUpdate = true;
	        console.log('videoUpdate');
	    }
	}
}