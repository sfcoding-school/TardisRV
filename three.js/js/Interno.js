function initInterno() {
    obInterno = new THREE.Object3D();

    //floor
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(1500, 1500, 100, 100),
        new THREE.MeshLambertMaterial({color: 0xc0c0c0})
        );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    plane.receiveShadow = true;
    obInterno.add(plane);

    //SHERMI PICCOLI
    schermo1 = new THREE.Mesh(
        new THREE.CylinderGeometry(3, 3, 30, 100, 100, false), //new THREE.PlaneGeometry(5, 30, 100, 100),
        new THREE.MeshPhongMaterial({color: 0x800000})
        );
    schermo1.rotation.x = -Math.PI / 2;
    schermo1.position.set(60, 155, 4);
    schermo1.rotation.y = Math.PI / 9;
    schermo1.receiveShadow = false;
    obInterno.add(schermo1);  
    

    schermo2 = new THREE.Mesh(
        new THREE.CylinderGeometry(3, 3, 30, 100, 100, false),//new THREE.PlaneGeometry(30, 5, 100, 100),
        new THREE.MeshLambertMaterial({color: 0xCD0000})
    );
    schermo2.rotation.x = -Math.PI / 2 + Math.PI / 16;
    schermo2.position.set(30, 156.8, 53.5);
    schermo2.rotation.z = Math.PI / 2 + Math.PI / 6; //Math.PI / 5 - Math.PI / 25;
    schermo2.rotation.y = Math.PI / 32;
    schermo2.receiveShadow = true;
    obInterno.add(schermo2);

    //cilindri energetici
    cylinder1 = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 60, 100, 100, false),
        new THREE.MeshLambertMaterial({color: 0xCD0000})
    );
    cylinder1.receiveShadow = true;
    cylinder1.overdraw = true;
    cylinder1.position.set(-15,185,-15);
    obInterno.add(cylinder1);
    
    cylinder2 = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 60, 100, 100, false),
        new THREE.MeshLambertMaterial({color: 0xCD0000} )
        );
    cylinder2.receiveShadow = true;
    cylinder2.overdraw = true;
    cylinder2.position.set(15,185,-15);
    obInterno.add(cylinder2);

    cylinder3 = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 60, 100, 100, false),
        new THREE.MeshLambertMaterial({color: 0xCD0000})
        );
    cylinder3.receiveShadow = true;
    cylinder3.overdraw = true;
    cylinder3.position.set(15,185,15);
    obInterno.add(cylinder3);
    
    cylinder4 = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 60, 100, 100, false),
        new THREE.MeshLambertMaterial({color: 0xCD0000})
        );
    cylinder4.receiveShadow = true;
    cylinder4.overdraw = true;
    cylinder4.position.set(-15,185,15);
    obInterno.add(cylinder4);
                
    var importer = new blenderImporter(scene);

    pointLock.addElementLoading();
    importer.import('tardis.js', 50, [0,0,0], [0,0,0], function(geometry, object){
        //console.log('callBack');
        controls.addMesh(object);
        obInterno.add( object );
        pointLock.removeElementLoading();
        console.log('tardis');
    });

    //WALL
    pointLock.addElementLoading();
    importer.import('muro.js', 100, [0,0,0], [0,0,0], function(geometry, object){
        controls.addMesh(object);
        //object.material.emissive.setHex( 0xffffff );
        obInterno.add( object );
        pointLock.removeElementLoading();
        console.log('muro');
    });
    //END WALL
    
    
    //DALEK
    pointLock.addElementLoading();
    importer.import('newdalekparadigm.js', 250, [-400,0,0], [0,0,0], function(geometry, object){
        controls.addMesh(object);
        object.rotation.y += Math.PI/2;

        dalekC = new Dalek(obInterno, object);
        dalekC.manage();
        pointLock.removeElementLoading();
        console.log('dalek');
    });

    pointLock.addElementLoading();
    importer.import('manopola.js', 50, [-27,145,-92], [0, -51.788, 0], function(geometry, object){
        //console.log('callBack');
        object.rotateOnAxis( new THREE.Vector3(1,0,-0.45).normalize(), 0.4 );
        obInterno.add( object );
        manopolaAnimation2 = new ManopolaAnimation(object, new THREE.Vector3(1,0,-0.45), function(){
            var a = Math.floor((Math.random()*100)+1)%4;
            
            if(a === 0){
                schermo1.material.color.setHex(0xff0000);
            }
            if(a == 1){
                schermo1.material.color.setHex( 0x800000 );
            }
            if(a == 2){
                schermo2.material.color.setHex( 0xff0000 );
            }
            if(a == 3){
                schermo2.material.color.setHex( 0x800000 );
            }
            
        }, function(){
            schermo1.material.color.setHex( 0x800000 );
            schermo2.material.color.setHex( 0x800000 );
            //schermo3.material.emissive.setHex( 0x800000 );
        });
        clickable.addCMesh(new Array(object, manopolaAnimation2, true));    
        pointLock.removeElementLoading();  
        console.log('manopola');
    });
    
    pointLock.addElementLoading();
    importer.import('manopola.js', 50, [-68,145,-68], [0, -51.788, 0], function(geometry, object){
        //console.log('callBack');
        object.rotateOnAxis( new THREE.Vector3(1,0,-0.70).normalize(), 0.4 );
        obInterno.add( object );
        manopolaAnimation1 = new ManopolaAnimation(object, new THREE.Vector3(1,0,-0.70), function (){
            var a = Math.floor((Math.random()*100)+1)%8;
            if(a === 0){
                cylinder1.material.emissive.setHex( 0xff0000 );
            }
            if(a == 1){
                cylinder1.material.emissive.setHex( 0x8B0000 );
            }
            if(a == 2){
                cylinder2.material.emissive.setHex( 0xff0000 );
            }
            if(a == 3){
                cylinder2.material.emissive.setHex( 0x8B0000 );
            }
            if(a == 4){
                cylinder3.material.emissive.setHex( 0xff0000 );
            }
            if(a == 5){
                cylinder3.material.emissive.setHex( 0x8B0000 );
            }
            if(a == 6){
                cylinder4.material.emissive.setHex( 0xff0000 );
            }
            if(a == 7){
                cylinder4.material.emissive.setHex( 0x8B0000 );
            }
        }, function(){
            cylinder1.material.emissive.setHex( 0x8B0000 );
            cylinder2.material.emissive.setHex( 0x8B0000 );
            cylinder3.material.emissive.setHex( 0x8B0000 );
            cylinder4.material.emissive.setHex( 0x8B0000 );
            });
        //manapolaAnimation.startAni();
        clickable.addCMesh(new Array(object, manopolaAnimation1, true));
        pointLock.removeElementLoading();
        console.log('manopola');
    });

    var spotlight = new THREE.SpotLight(0xffffff);//(0xffffff);
    spotlight.position.set(0,500,0);
    spotlight.intensity = 0.8;
    spotlight.castShadow = true;
    obInterno.add(spotlight);

    var puntamelo = new THREE.Object3D();
    puntamelo.position.set(0,1000,0);

    spotlight = new THREE.DirectionalLight( 0x8800ff);
    spotlight.position.set(0,400,0);
    spotlight.target = puntamelo;
    spotlight.intensity = 1.5;
    spotlight.castShadow = true;
    obInterno.add(spotlight);

    puntamelo = new THREE.Object3D();
    puntamelo.position.set(0,250,0);

    spotlight = new THREE.DirectionalLight( 0xffffff);
    spotlight.position.set(400,300,400);
    spotlight.target = puntamelo;
    spotlight.intensity = 0.3;
    spotlight.castShadow = true;
    obInterno.add(spotlight);

    spotlight = new THREE.DirectionalLight( 0xffffff);
    spotlight.position.set(-400, 300,-400);
    spotlight.target = puntamelo;
    spotlight.intensity = 0.3;
    spotlight.castShadow = true;
    obInterno.add(spotlight);   

    ///VIDEO 
    pointLock.addElementLoading();
    loadV = new video(obInterno);
    loadV.loadVideo("kideatsdirt.ogv", 30, function(movieScreen){
        movieScreen.position.set(-100, 142, -5);
        movieScreen.rotation.x = -Math.PI / 2;
        movieScreen.rotation.y = -Math.PI / 8;
        movieScreen.rotation.z = -Math.PI / 2;
        pointLock.removeElementLoading();
        console.log('video');
    }, false);

    pointLock.addElementLoading();
    loadV2 = new video(obInterno);
    loadV2.loadVideo("kideatsdirt.ogv", 12, function(movieScreen){
        movieScreen.position.set(-42, 160, 80);
        movieScreen.rotation.x = - Math.PI / 16;
        movieScreen.rotation.y = - Math.PI / 8 - Math.PI / 16;
        movieScreen.rotation.z = - Math.PI / 32;

        //movieScreen.rotateOnAxis(new THREE.Vector3( -1, 0, -0.3 ).normalize(), Math.PI / 16 + Math.PI / 32);
        pointLock.removeElementLoading();
        console.log('video');
    }, true);


    //LANCETTE (DA DECIDERE SE TENERE)
    var material = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 2
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(6, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 6, 0));

    line = new THREE.Line(geometry, material);
    line.position.set(24, 143, -85);
    line.rotation.y = Math.PI / 3;

    obInterno.add(line);

    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3(6, 0, 0));
    geometry2.vertices.push(new THREE.Vector3(0, 6, 0));

    line = new THREE.Line(geometry2, material);
    line.position.set(65, 143, -62);
    line.rotation.y = Math.PI / 3;

    obInterno.add(line);
    //FINE LANCETTE
}


function animateInterno() {                    
    manopolaAnimation1.update();
    manopolaAnimation2.update();

    loadV.update();
    loadV2.update();

    dalekC.update();
}
