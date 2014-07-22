function video(scene){
	this.scene = scene;
}

video.prototype.loadVideo = function(source, radius, posizionamento, quale){
	// create the video element
	this.video = document.createElement( 'video' );
	this.video.src = "/media/" + source;
	this.video.load(); // must call after setting/changing source
	this.video.play();


	this.videoImage = document.createElement( 'canvas' );
	this.videoImage.width = 320;
	this.videoImage.height = 240;

	this.videoImageContext = this.videoImage.getContext( '2d' );
	this.videoImageContext.fill();//fillRect( 0, 0, this.videoImage.width, this.videoImage.height + 10);

	this.videoTexture = new THREE.Texture( this.videoImage );
	this.videoTexture.minFilter = THREE.LinearFilter;
	this.videoTexture.magFilter = THREE.LinearFilter;

	var movieMaterial = new THREE.MeshBasicMaterial( { map: this.videoTexture, overdraw: true, side:THREE.DoubleSide } );
	// the geometry on which the movie will be displayed;
	//      movie image will be scaled to fit these dimensions.
	var movieGeometry;
	if (quale) {
		movieGeometry = new THREE.PlaneGeometry( 27, 27);
	}else {
		movieGeometry = new THREE.CircleGeometry( radius, 128 );
	}
	
	var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );

	this.scene.add(movieScreen);

	posizionamento(movieScreen);

}

video.prototype.update = function(){
	if ( this.video.readyState === this.video.HAVE_ENOUGH_DATA ) {
	    this.videoImageContext.drawImage( this.video, 0, 0 );
	    if ( this.videoTexture ) {
	        this.videoTexture.needsUpdate = true;
	        //console.log('videoUpdate');
	    }
	}
}