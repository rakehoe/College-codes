
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const width = window.innerWidth,
    height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(150, width / height, 0.01, 1000);
camera.position.y = 30;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a3223);
scene.fog = new THREE.Fog(0x0a3223, 31, 100);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(width, height);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

var axes = new THREE.AxesHelper(50);
scene.add(axes);

const ambient = new THREE.HemisphereLight(0xffffff, 0x080820, 2);
scene.add(ambient);

var cube = {};
var dirlights = {}, helper = {}, dirhelper = {};
for (var i = 0; i < 3; i++) {
    dirlights[i] = new THREE.DirectionalLight(0xffffff, 5);
    dirlights[i].castShadow = true;
    dirlights[i].mapSize = (1080, 1080);

    dirlights[i].position.set(-100, 20, Math.random() * 15 - 10);

    dirlights[i].shadow.camera.left = -100;
    dirlights[i].shadow.camera.right = 100;
    dirlights[i].shadow.camera.top = 100;
    dirlights[i].shadow.camera.bottom = -20;
    scene.add(dirlights[i]);

    helper[i] = new THREE.CameraHelper(dirlights[i].shadow.camera);
    scene.add(helper[i]);
    dirhelper[i] = new THREE.DirectionalLightHelper(dirlights[i], 6);
    scene.add(dirhelper[i]);
    
}

//Creating plane
var planeGeometry = new THREE.PlaneGeometry(250, 200);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xAAAAAA });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, -4, 0);
plane.receiveShadow = true;
scene.add(plane);
//Create sphere
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 2;
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
//scene.add(sphere);
const cubeGeo = new THREE.BoxGeometry(5, 10, 5);
const cubeMats = new THREE.MeshStandardMaterial({ color: 0xAAAAAA });
cube[0] = new THREE.Mesh(cubeGeo, cubeMats);
cube[0].position.y = 1;
cube[0].castShadow = true;
scene.add(cube[0]);

cube[1] = new THREE.Mesh(cubeGeo, cubeMats);
cube[1].position.z = 10;
cube[1].position.y = 1;
cube[1].receiveShadow = true;
cube[1].castShadow = true;
scene.add(cube[1]);

for (var i = 2; i < 5; i++){
    var cubeGeo1 = new THREE.BoxGeometry(5, Math.random()*20+10, 5);
    cube[i] = new THREE.Mesh(cubeGeo1, cubeMats);
    cube[i].castShadow = true;
    cube[i].receiveShadow = true;
    cube[i].position.y = 1;
    cube[i].position.z = Math.random() * 50;
    scene.add(cube[i]);
}
// animation
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 4;
// controls.target(0, 0, 0);
controls.enableZoom = false; //stop the ability to zoom
controls.enablePan = false; //stop the camara from moving left and right
controls.update();

function animation(time) {
    renderer.render(scene, camera);
    controls.update();
}
