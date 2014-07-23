var id;
var consoleStartTardis = function(){
    var camera, scene, scene1, renderer;
    var rotation=0;
    var mesh;
    var cameraZ = 100;
    var cameraY = 80; 
    var displayX = window.innerWidth*0.9;
    var displayY = window.innerHeight*0.9;

    init();
    animate();

    function init(){
        scene = new THREE.Scene();
        //scene1 = new THREE.Scene();

        camera = new THREE.PerspectiveCamera ( 75, displayX/displayY, 1, 10000);

        camera.position.z = cameraZ;
        camera.rotation.y = cameraY;
        //camera.applyMatrix( new THREE.Matrix4().makeTranslation(0, 0, 80) );
        //scene.add(camera);

        var importer = new blenderImporter(scene);
        importer.import('cabina.js', 21, [0,0,0], [0,0,0], function(geometry, object){
            scene.add( object );
            camera.lookAt(object.position);
            mesh = object;
        });

        scene.add(camera);

        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(3, 3, 3);
        scene.add(directionalLight);

        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
        renderer.setSize( displayX, displayY );
        //renderer.setClearColor(0xcccccc,1);
        renderer.shadowMapEnabled = true;
        var console = document.getElementById('tardis');
        if (console.hasChildNodes())
            console.removeChild(console.lastChild);
        console.appendChild(renderer.domElement);
    }

    function animate(){
        id = requestAnimationFrame(animate);

        rotation += 0.01;
        //camera.position.y = (Math.sin(rotation)* cameraY/2)+cameraY*1.2;
        camera.position.y = cameraY;
        camera.position.x = Math.sin(rotation) * cameraZ;
        camera.position.z = Math.cos(rotation) * cameraZ;
        camera.lookAt(new THREE.Vector3( 0, 50, 0 ));

        renderer.render(scene, camera);
    }
};

var consoleClearTardis = function() {
    var console = document.getElementById('tardis');
    if (console.hasChildNodes())
        cancelAnimationFrame( id );
        
};