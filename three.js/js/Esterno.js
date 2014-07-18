var porteAnimation;
var smokeParticles;
var smoke;
var delta=0.01;

function initEsterno(){
    obEsterno = new THREE.Object3D();
    obEsterno.position.z = -500;

    //floor
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1500, 1500, 100, 100),
        new THREE.MeshLambertMaterial({color: 0xc0c0c0})
        );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    plane.receiveShadow = true;
    obEsterno.add(plane);                        

    var importer = new blenderImporter(scene);

    importer.import('cabina.js', 80, [0,0,0], [0,Math.PI,0], function(geometry, object){
        console.log('callBack');
        controls.addMesh(object);
        /*clickable.addCMesh(new Array(object, function(){
            console.log("prova");
            initInterno();
            scene.remove(obEsterno);
            scene.add(obInterno);
            interno = true;
        }, false)); */
        obEsterno.add(object);
    });

    importer.import('cabina-porta-sx.js', 70, [70,5,-82], [0,Math.PI,0], function(geometry, object1){
        importer.import('cabina-porta-dx.js', 70, [-70,5,-82], [0,Math.PI,0], function(geometry, object2){
            console.log('callBack');
            porteAnimation = new PorteAnimation(object1, object2, new THREE.Vector3(0,1,0), function(){
                obEsterno.add(smoke);
            }, function(){
                obEsterno.remove(smoke);
            });
            controls.addMesh(object2);
            clickable.addCMesh(new Array(object2, porteAnimation , true)); 
            obEsterno.add(object2);

            clickable.addCMesh(new Array(object1, porteAnimation , true));
        });
        console.log('callBack');
        controls.addMesh(object1);
        
        obEsterno.add(object1);
    });

    smokeParticles = new THREE.Geometry();
    for (var i = 0; i < 500; i++) {
        var particle = new THREE.Vector3(generateRandom(), Math.random() * 300, generateRandom() );
        smokeParticles.vertices.push(particle);
    }

    var smokeTexture = THREE.ImageUtils.loadTexture("http://127.0.0.1:8080/modelli/smoke.png");
    var smokeMaterial = new THREE.ParticleBasicMaterial({ map: smokeTexture, transparent: true, blending: THREE.AdditiveBlending, size: 50, color: 0x111111 });

    smoke = new THREE.ParticleSystem(smokeParticles, smokeMaterial);
    smoke.sortParticles = true;
    smoke.position.z = -100;
 
    

    
/*
    var spotlight = new THREE.SpotLight(0xffffff);//(0xffffff);
    spotlight.position.set(0,500,0);
    spotlight.intensity = 0.8;
    spotlight.castShadow = true;
    obEsterno.add(spotlight);
*//*
    var puntamelo = new THREE.Object3D();
    puntamelo.position.set(0,1000,0);

    spotlight = new THREE.DirectionalLight( 0x8800ff);
    spotlight.position.set(0,400,0);
    spotlight.target = puntamelo;
    spotlight.intensity = 0.8;
    spotlight.castShadow = true;
    obEsterno.add(spotlight);
*/
    puntamelo = new THREE.Object3D();
    puntamelo.position.set(0,0,0);

    spotlight = new THREE.DirectionalLight( 0xffffff);
    spotlight.position.set(400,300,400);
    spotlight.target = puntamelo;
    spotlight.intensity = 5;
    spotlight.castShadow = true;
    obEsterno.add(spotlight);

    spotlight = new THREE.DirectionalLight( 0xffffff);
    spotlight.position.set(-400, 300,-400);
    spotlight.target = puntamelo;
    spotlight.intensity = 0.5;
    spotlight.castShadow = true;
    obEsterno.add(spotlight);
   }

function animateEsterno() {
    porteAnimation.update();

    var particleCount = smokeParticles.vertices.length;
    while (particleCount--) {
        var particle = smokeParticles.vertices[particleCount];
        particle.y += delta * 50;

        /*smoke.position.z += delta * 5;
        if (smoke.position >= 150){
            smoke.position.z = 150;
        }*/

        if (particle.y >= 300) {
            particle.y = Math.random() * 300;
            particle.x = generateRandom();
            particle.z = generateRandom();
        }
    }
    smokeParticles.__dirtyVertices = true;
}

function generateRandom(){
    return Math.random() * 120 - 60;
}
