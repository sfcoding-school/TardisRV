var loadingFinish = false;
var countLoading = 0;

function PointLock(instructions, blocker, animationControll ){
    var img = document.createElement("img");
    img.setAttribute("src", "media/loading-bar.gif");
    img.setAttribute("id", "loading");
    //elem.setAttribute("width", "1024");
    //elem.setAttribute("alt", "Flower");
    var node = instructions.childNodes[3];
    instructions.insertBefore(img, node);
    //instructions.appendChild(img);

    this.instructions = instructions;
    this.blocker = blocker;

    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    if ( havePointerLock ) {

        var element = document.body;

        var pointerlockchange = function ( event ) {

            if ( loadingFinish && (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) ) {

                controls.enabled = true;
                console.log('pointLock- false');
                animationControll(false);

                blocker.style.display = 'none';

            } else {

                animationControll(true);
                console.log('pointLock- true');
                controls.enabled = false;
                /*
                blocker.style.display = '-webkit-box';
                blocker.style.display = '-moz-box';
                blocker.style.display = 'box';*/
                blocker.style.display = 'table';

                instructions.style.display = '';

            }

        };

        var pointerlockerror = function ( event ) {
            instructions.style.display = '';
        };

        // Hook pointer lock state change events
        document.addEventListener( 'pointerlockchange', pointerlockchange, false );
        document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
        document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

        document.addEventListener( 'pointerlockerror', pointerlockerror, false );
        document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
        document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

        instructions.addEventListener( 'click', function ( event ) {

            instructions.style.display = 'none';

            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

            if ( /Firefox/i.test( navigator.userAgent ) ) {

                var fullscreenchange = function ( event ) {

                    if ( loadingFinish && (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) ) {

                        document.removeEventListener( 'fullscreenchange', fullscreenchange );
                        document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

                        element.requestPointerLock();
                    }

                };

                document.addEventListener( 'fullscreenchange', fullscreenchange, false );
                document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

                element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

                element.requestFullscreen();

            } else {

                element.requestPointerLock();

            }

        }, false );

    } else {

        instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

    }

}



PointLock.prototype.addElementLoading = function(){
    countLoading++;
    console.log('add ' + countLoading);
};

PointLock.prototype.removeElementLoading = function(){
    countLoading--;
    console.log('remove ' + countLoading);
    if (countLoading === 0){
        loadingFinish = true;
        this.instructions.removeChild(document.getElementById('loading'));
        console.log('finito ' + countLoading);
    }
};
