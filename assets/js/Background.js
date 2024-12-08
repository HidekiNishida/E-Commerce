(function() {
    'use strict';
    /* 	'To actually be able to display anything with Three.js, we need three things:
        A scene, a camera, and a renderer so we can render the scene with the camera.' 
               
               - https://threejs.org/docs/#Manual/Introduction/Creating_a_scene 		*/

    var scene, camera, renderer;

    /* We need this stuff too */
    var container, aspectRatio,
        HEIGHT, WIDTH, fieldOfView,
        nearPlane, farPlane,
        mouseX, mouseY, windowHalfX,
        windowHalfY, stats, geometry,
        starStuff, materialOptions, stars,
        scene, camera, renderer, uniforms,
        betaV, gammaV;



  
       
    init();
    animate();

    function isMobileDevice() {
return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
    
    function init() {
        container = document.getElementById('BackgroundStars');
        document.body.style.overflow = 'hidden';

        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        aspectRatio = WIDTH / HEIGHT;
        fieldOfView = 75;
        nearPlane = 1;
        farPlane = 1000;
        mouseX = 0;
        mouseY = 0;
        gammaV = 0;
        betaV = 0;
        windowHalfX = WIDTH / 2;
        windowHalfY = HEIGHT / 2;



    /* 	fieldOfView — Camera frustum vertical field of view.
            aspectRatio — Camera frustum aspect ratio.
            nearPlane — Camera frustum near plane.
            farPlane — Camera frustum far plane.	
            - https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera
             In geometry, a frustum (plural: frusta or frustums) 
             is the portion of a solid (normally a cone or pyramid) 
             that lies between two parallel planes cutting it. - wikipedia.		*/

        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        //Z positioning of camera

        camera.position.z = farPlane / 2;
        
        scene = new THREE.Scene({antialias:true});
        scene.fog = new THREE.FogExp2( 0x000000, 0.0003 );

        // The wizard's about to get busy.
        starForge();
        
        //check for browser Support
        if (webGLSupport()) {
            //yeah?  Right on...
            renderer = new THREE.WebGLRenderer({alpha: true});
            uniforms = { time: { type: "f", value: 1.0 } }; // Adicionamos um uniforme para o tempo
            
            starStuff = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: materialOptions.vertexShader,
        fragmentShader: materialOptions.fragmentShader,
        blending: materialOptions.blending
    });

        } else {
            //No?  Well that's okay.
            renderer = new THREE.CanvasRenderer();
        }


        renderer.setClearColor(0x000000, 0);

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize( WIDTH, HEIGHT);
        container.appendChild(renderer.domElement);

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.right = '0px';
        container.appendChild( stats.domElement );

        window.addEventListener( 'resize', onWindowResize, false );

        if (isMobileDevice()) {
window.addEventListener('deviceorientation', onDeviceMove, false);
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('touchmove', ontouchmove, false )







} else {
document.addEventListener('mousemove', onMouseMove, false);
}

        //document.addEventListener( 'mousemove', onMouseMove, false );
        
    }

    function animate() {
        requestAnimationFrame(animate);
        uniforms.time.value += 0.05;
        render();
        stats.update();
    }


    function render() {

        if (isMobileDevice()) {
camera.position.x += (mouseX + (gammaV * 3) - camera.position.x) * 0.005;
camera.position.y += (-mouseY - ((-betaV) * 3) - camera.position.y) * 0.005;
} else {
camera.position.x += (mouseX - camera.position.x) * 0.005;
camera.position.y += (-mouseY - camera.position.y) * 0.005;

}

camera.position.x += window.scrollX * 0.001;
camera.position.y += window.scrollY * 0.001;

        camera.lookAt( scene.position );
        renderer.render(scene, camera);
    }

    function webGLSupport() {
        /* 	The wizard of webGL only bestows his gifts of power
            to the worthy.  In this case, users with browsers who 'get it'.		*/

        try {
            var canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (
                canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            );
        } catch(e) {
            // console.warn('Hey bro, for some reason we\'re not able to use webGL for this.  No biggie, we\'ll use canvas.');
            return false;
        }
    }

    function onWindowResize() {

        // Everything should resize nicely if it needs to!
          var WIDTH = window.innerWidth,
              HEIGHT = window.innerHeight;

          //camera.aspect = aspectRatio;
          camera.aspect = WIDTH / HEIGHT;
          camera.updateProjectionMatrix();
          renderer.setSize(WIDTH, HEIGHT);
    }

    function starForge() {
        /* 	Yep, it's a Star Wars: Knights of the Old Republic reference,
            are you really surprised at this point? 
                                                    */
        var starQty;

        if (isMobileDevice()) {
        
            starQty = 15000;
        }
        else{

            starQty = 17000;

            }
            //geometry = new THREE.SphereGeometry(1000, 100, 50);
            geometry = new THREE.CircleGeometry(1, 32);
            materialOptions = {
                size: 1.0, //I know this is the default, it's for you.  Play with it if you want.
                transparency: true, 
                opacity: 0.9,
                color: 0x000050, // Altere a cor para branco para que as estrelas brilhem
vertexShader: `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
fragmentShader: `
varying vec2 vUv;
uniform float time;
void main() {
float pulse = sin(time) * 0.5 + 0.5;
float intensity = smoothstep(0.02, 0.04, pulse);

// Adicione variação de brilho com base na posição x da estrela
float positionVariation = sin(gl_Position.x * 0.1) * 0.5 + 0.5;

// Converta as coordenadas para o centro do círculo
vec2 centeredCoords = vUv - 0.5;

// Calcule a distância do ponto central
float distanceToCenter = length(centeredCoords);

// Defina um raio para o círculo
float circleRadius = 0.5;

// Use smoothstep para criar um gradiente suave ao redor do círculo
float circle = smoothstep(circleRadius, circleRadius + 0.01, circleRadius - distanceToCenter);

vec3 color = mix(vec3(1.0), vec3(1.0, 1.0, 0.8), intensity * positionVariation * circle);
gl_FragColor = vec4(color, intensity);
}
`,
blending: THREE.AdditiveBlending
            };

            starStuff = new THREE.PointCloudMaterial(materialOptions);

        // The wizard gaze became stern, his jaw set, he creates the cosmos with a wave of his arms

        for (var i = 0; i < starQty; i++) {		

            var starVertex = new THREE.Vector3();
            starVertex.x = Math.random() * 1000 - 500;
            starVertex.y = Math.random() * 1000 - 500;
            starVertex.z = Math.random() * 1000 - 500;

            geometry.vertices.push(starVertex);

        }


        stars = new THREE.PointCloud(geometry, starStuff);
        scene.add(stars);
    }

    function onMouseMove(e) {

        
        mouseX = e.clientX - windowHalfX;
        mouseY = e.clientY - windowHalfY;
    }
    
    function ontouchmove(e){
        
        var touch = e.touches[0];

        mouseX = touch.clientX - windowHalfX;
        mouseY = touch.clientY - windowHalfY;

    }

    function onDeviceMove(event) {
// Obtenha os valores de rotação
var alpha = event.alpha || 0; // rotação em torno do eixo z
var beta = event.beta || 0;   // rotação em torno do eixo x
var gamma = event.gamma || 0; // rotação em torno do eixo y

// Ajuste os valores conforme necessário
// Aqui, você pode experimentar diferentes ajustes com base na orientação do dispositivo
// Certifique-se de testar em vários dispositivos para obter o comportamento desejado

// Atualize mouseX e mouseY com base nos valores de rotação
gammaV = gamma;
betaV = beta;

}

})();