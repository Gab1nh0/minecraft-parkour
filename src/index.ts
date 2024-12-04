import { CharacterControls } from './characterControls.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { plane1, plane2, plane3, plane5,plane8, plane4, plane6, plane7, plane9, plane10, plane11, plane12, plane13, plane14, plane15, plane16} from './geometrias/plano.js';


// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa8def0);

scene.add(plane1, plane2, plane3, plane3, plane5, plane8, plane4, plane7, plane9, plane10, plane11, plane12, plane13, plane14, plane15, plane16);


//posiciones
plane1.position.x = 44.19;
plane1.position.y = 2.6503;
plane1.position.z = 68;

plane2.position.x = 44.19;
plane2.position.y = 3.2;
plane2.position.z = 60;

//Lado izquierdo
plane3.position.x = 44.6;
plane3.position.y = 4.96;
plane3.position.z = 49;

plane5.position.x = 44.19;
plane5.position.y = 6.20;
plane5.position.z = 38;

plane8.position.x = 44.19;
plane8.position.y = 7;
plane8.position.z = 25;


//stage 1
plane4.position.x = 28.2;
plane4.position.y = 8;
plane4.position.z = -20;

plane6.position.x = 33;
plane6.position.y = 10;
plane6.position.z = -35;

plane7.position.x = 49;
plane7.position.y = 10;
plane7.position.z = -34;

plane9.position.x = 49;
plane9.position.y = 11.9;
plane9.position.z = -20.55;

//stage2
plane10.position.x = -46;
plane10.position.y = 9.8;
plane10.position.z = 45;

plane11.position.x = -35;
plane11.position.y = 13;
plane11.position.z = 35;


plane12.position.x = -26;
plane12.position.y = 16;
plane12.position.z = 45;

//stage 3
plane13.position.x = -49.06;
plane13.position.y = 8.10 ;
plane13.position.z = -35.5;

plane14.position.x = -42;
plane14.position.y = 8.10;
plane14.position.z = -22;


plane15.position.x = -30;
plane15.position.y = 10;
plane15.position.z = -18;

plane16.position.x = -28;
plane16.position.y = 12;
plane16.position.z = -33;



//rotaciones
plane1.rotation.x = -Math.PI / 2;

plane2.rotation.x = -Math.PI / 2;

plane3.rotation.x = -Math.PI / 2;

plane5.rotation.x = -Math.PI / 2;

plane8.rotation.x = -Math.PI / 2;



//stage 2 rotaciones
plane4.rotation.x = -Math.PI/2;

plane6.rotation.x = -Math.PI/2;

plane7.rotation.x = -Math.PI/2;

plane9.rotation.x = -Math.PI / 2;

plane10.rotation.x = -Math.PI / 2;

//stage 3 rotaciones
plane11.rotation.x = -Math.PI/2;

plane12.rotation.x = -Math.PI/2;


//stage4 rotaciones
plane13.rotation.x = -Math.PI/2;
plane14.rotation.x = -Math.PI/2;
plane15.rotation.x = -Math.PI/2;
plane16.rotation.x = -Math.PI/2;


//------------------------------------------------------------------------------------------

// Crear el trigger (por ejemplo, un cubo invisible)
const triggerPosition = new THREE.Vector3(48, 14, -23); // Posición del trigger
const triggerPosition1 = new THREE.Vector3(46, 2, 65); // Posición del trigger1


const triggerSize = new THREE.Vector3(1, 1, 1); // Tamaño del trigger

const triggerGeometry = new THREE.BoxGeometry(triggerSize.x, triggerSize.y, triggerSize.z);
const triggerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, visible: true }); // Visible para debug
const triggerMesh = new THREE.Mesh(triggerGeometry, triggerMaterial);
triggerMesh.position.copy(triggerPosition);
scene.add(triggerMesh);

// Crear la caja de colisión del trigger
const triggerBoundingBox = new THREE.Box3().setFromObject(triggerMesh);

//------------------------------------------------------------------------------------------

// Crear el trigger (por ejemplo, un cubo invisible)

const triggerMesh1 = new THREE.Mesh(triggerGeometry, triggerMaterial);
triggerMesh1.position.copy(triggerPosition1);
scene.add(triggerMesh1);

// Crear la caja de colisión del trigger
const triggerBoundingBox1 = new THREE.Box3().setFromObject(triggerMesh1);

//------------------------------------------------------------------------------------------

// CAMERA
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 10;
camera.position.z = 10;
camera.position.x = 10;

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// CONTROLS
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.minDistance = 5;
orbitControls.maxDistance = 15;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
orbitControls.update();

// LIGHTS
light();

const loader = new GLTFLoader();
let characterMesh, characterBoundingBox;

loader.load(
    'mundo2.glb',
    function (gltf) {
        const model = gltf.scene;
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error('Error al cargar el modelo:', error);
    }
);

// MODEL WITH ANIMATIONS
let characterControls, characterHelper;
loader.load('steveRigV3_3-Gabo.glb', function (gltf) {
    const model = gltf.scene;
    model.traverse(function (object) {
        if (object.isMesh) object.castShadow = true;
    });
    scene.add(model);

    //model.position.set(46, 2, 65); stage1
    //model.position.set(32, 2, -20); //stage2
    model.position.set(-43.06, 2, -38);
    model.scale.set(1, 1, 1);
    

    const gltfAnimations = gltf.animations;
    const mixer = new THREE.AnimationMixer(model);
    const animationsMap = new Map();
    gltfAnimations.filter(a => a.name !== 'TPose').forEach((a) => {
        animationsMap.set(a.name, mixer.clipAction(a));
    });

    characterControls = new CharacterControls(model, mixer, animationsMap, orbitControls, camera, 'IDLE');
    characterMesh = model;

    // Crear la caja de colisión del personaje
    characterBoundingBox = new THREE.Box3().setFromObject(model);
     // Agregar un BoxHelper para visualizar la caja del personaje
     characterHelper = new THREE.BoxHelper(model, 0x00ff00); // Verde para el personaje
     scene.add(characterHelper);

     model.traverse((object) => {
        if (object.isMesh) {
            object.castShadow = true;
        } else if (object.isObject3D && object.children.length === 0) {
            // Eliminar nodos innecesarios
            model.remove(object);
        }
    });  
});

// Crear las cajas de colisión para los planos
const platformBoundingBoxes = [plane1, plane2, plane3,  plane5, plane8, plane4, plane6, plane7, plane10, plane9, plane11, plane12, plane13, plane14, plane15, plane16].map(plane => new THREE.Box3().setFromObject(plane));

const platformHelpers = [plane1, plane2, plane3, plane5,plane8, plane4, plane6, plane7, plane10, plane9, plane11, plane12, plane13, plane14, plane15, plane16 ].map((plane) => {
    const helper = new THREE.BoxHelper(plane, 0xff0000); // Rojo para las cajas de los planos
    scene.add(helper);
    return helper;
});

// CONTROL KEYS
const keysPressed = {};
document.addEventListener('keydown', (event) => {
    keysPressed[event.key.toLowerCase()] = true;
}, false);

document.addEventListener('keyup', (event) => {
    keysPressed[event.key.toLowerCase()] = false;
}, false);

const clock = new THREE.Clock();

// ANIMATE
function animate() {
    const mixerUpdateDelta = clock.getDelta();
    const gravity = 9.8; // Valor de gravedad por segundo
    const fallSpeed = gravity * mixerUpdateDelta; // Velocidad de caída ajustada por deltaTime

    if (characterControls) {
        characterControls.update(mixerUpdateDelta, keysPressed);

        // Actualizar la caja de colisión del personaje
        if (characterMesh) {
            characterBoundingBox.setFromObject(characterMesh);

            // Comprobar si el personaje está sobre una plataforma
            let isOnPlatform = false;
            let platformTopY = characterControls.initialY; // Altura inicial por defecto (suelo)

            platformBoundingBoxes.forEach((platformBoundingBox) => {
                if (
                    characterBoundingBox.min.x >= platformBoundingBox.min.x &&
                    characterBoundingBox.max.x <= platformBoundingBox.max.x &&
                    characterBoundingBox.min.z >= platformBoundingBox.min.z &&
                    characterBoundingBox.max.z <= platformBoundingBox.max.z
                ) {
                    // Si el personaje está completamente dentro de la plataforma
                    isOnPlatform = true;
                    platformTopY = platformBoundingBox.max.y; // Altura de la plataforma
                }
            });

            if (isOnPlatform) {
                // Anclar al nivel superior de la plataforma
                characterMesh.position.y = platformTopY;
            } else {
                // Aplicar gravedad si no está sobre ninguna plataforma
                characterMesh.position.y -= fallSpeed;

                // Evitar atravesar el suelo
                if (characterMesh.position.y < characterControls.initialY) {
                    characterMesh.position.y = characterControls.initialY;
                }
            }

            // Verificar colisión con el trigger
            if (characterBoundingBox.intersectsBox(triggerBoundingBox)) {
                // Teletransportar al personaje
                characterMesh.position.set(32, 3.15, -20); // Nueva posición
                console.log('Teletransportado!');
            }

            // Verificar colisión con el trigger
            if (characterBoundingBox.intersectsBox(triggerBoundingBox1)) {
                // Teletransportar al personaje
                characterMesh.position.set(70, 3.15, 20); // Nueva posición
                console.log('Teletransportado!2');
            }
        }
    }

    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    // Actualizar helpers para debug
    platformBoundingBoxes.forEach((platformBoundingBox, index) => {
        platformHelpers[index].update();
    });
    if (characterHelper) characterHelper.update();
}

document.body.appendChild(renderer.domElement);
animate();

// RESIZE HANDLER
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

function light() {
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
}