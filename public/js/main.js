import * as THREE from "../node_modules/three/build/three.module.js";


const scale = document.querySelector('#scale');
const light_ox = document.querySelector('#light_ox');
const light_oy = document.querySelector('#light_oy');
const light_oz = document.querySelector('#light_oz');
const light_intensity = document.querySelector('#light_intensity');
const rotate_ox = document.querySelector('#rotate_ox');
const rotate_oy = document.querySelector('#rotate_oy');
const rotate_oz = document.querySelector('#rotate_oz');
const obj_ox = document.querySelector('#obj_ox');
const obj_oy = document.querySelector('#obj_oy');
const obj_oz = document.querySelector('#obj_oz');
const obj_oz_step = document.querySelector('#obj_oz_step');
const obj_ox_step = document.querySelector('#obj_ox_step');
const obj_oy_step = document.querySelector('#obj_oy_step');

obj_ox.step = obj_ox_step.step;
obj_oy.step = obj_oy_step.step;
obj_oz.step = obj_oz_step.step;







const canvas = document.querySelector('#webgl');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const loader = new THREE.TextureLoader();

const upperMaterials = [
   new THREE.MeshStandardMaterial({ map: loader.load("../assets/img/wood.jpg"), roughness: 1, metalness: 0 }),
   new THREE.MeshStandardMaterial({ map: loader.load("../assets/img/wood.jpg"), roughness: 1, metalness: 0 }),
   new THREE.MeshStandardMaterial({ map: loader.load("../assets/img/chessboard2.jpg") }),
   new THREE.MeshStandardMaterial({ map: loader.load("../assets/img/wood.jpg"), roughness: 1, metalness: 0 }),
   new THREE.MeshStandardMaterial({ map: loader.load("../assets/img/wood.jpg"), roughness: 1, metalness: 0 }),
   new THREE.MeshStandardMaterial({ map: loader.load("../assets/img/wood.jpg"), roughness: 1, metalness: 0 }),
];

const woodTexture = loader.load("../assets/img/wood.jpg");
woodTexture.wrapS = woodTexture.w = THREE.RepeatWrapping;
woodTexture.repeat.set(2, 1).multiplyScalar(1);

const group = new THREE.Group();

scene.add(group);

const upperCubeGeometry = new THREE.BoxGeometry(1.2, 0.01, 1.2);
const upperCube = new THREE.Mesh(upperCubeGeometry, upperMaterials);

upperCube.position.y = -0.005;

group.add(upperCube);

const rightCubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 1.2);
const rightCubeMaterial = new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 1, metalness: 0 });
const rightCube = new THREE.Mesh(rightCubeGeometry, rightCubeMaterial);
rightCube.position.x = 0.5;
rightCube.position.y = -0.11;

group.add(rightCube);

const leftCubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 1.2);
const leftCubeMaterial = new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 1, metalness: 0 });
const leftCube = new THREE.Mesh(leftCubeGeometry, leftCubeMaterial);
leftCube.position.x = -0.5;
leftCube.position.y = -0.11;

group.add(leftCube);

const frontCubeGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.2);
const frontCubeMaterial = new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 1, metalness: 0 });
const frontCube = new THREE.Mesh(frontCubeGeometry, frontCubeMaterial);
frontCube.position.z = 0.5;
frontCube.position.y = -0.11;

group.add(frontCube);

const backCubeGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.2);
const backCubeMaterial = new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 1, metalness: 0 });
const backCube = new THREE.Mesh(backCubeGeometry, backCubeMaterial);
backCube.position.z = -0.5;
backCube.position.y = -0.11;

group.add(backCube);

const light = new THREE.PointLight('white', 0.1);
light.position.set(+light_ox.value, +light_oy.value, +light_oz.value);
scene.add(light);

renderer.setClearColor(0xe6e6e6, 0.1);

camera.position.z = +scale.value;


scale.addEventListener('change', (event) => {
   camera.position.z = +event.currentTarget.value;
});

light_ox.addEventListener('change', (event) => {
   light.position.x = +event.currentTarget.value;
});

light_oy.addEventListener('change', (event) => {
   light.position.y = +event.currentTarget.value;
});

light_oz.addEventListener('change', (event) => {
   light.position.z = +event.currentTarget.value;
});

light_intensity.addEventListener('change', (event) => {
   light.intensity = +event.currentTarget.value;
});

rotate_ox.addEventListener('change', (event) => {
   group.rotation.x = 1 / 360 * event.currentTarget.value * 2 * Math.PI;
});

rotate_oy.addEventListener('change', (event) => {
   group.rotation.y = 1 / 360 * event.currentTarget.value * 2 * Math.PI;
});

rotate_oz.addEventListener('change', (event) => {
   group.rotation.z = 1 / 360 * event.currentTarget.value * 2 * Math.PI;
});

obj_oy_step.addEventListener('change', (event) => {
   obj_oy.step = event.currentTarget.value;
});

obj_ox_step.addEventListener('change', (event) => {
   obj_ox.step = event.currentTarget.value;
});

obj_oz_step.addEventListener('change', (event) => {
   obj_oz.step = event.currentTarget.value;
});

obj_ox.addEventListener('change', (event) => {
   group.position.x = +event.currentTarget.value;
});

obj_oy.addEventListener('change', (event) => {
   group.position.y = +event.currentTarget.value;
});

obj_oz.addEventListener('change', (event) => {
   group.position.z = +event.currentTarget.value;
});


group.rotation.x = 1 / 360 * rotate_ox.value * 2 * Math.PI;

const animate = function () {
   requestAnimationFrame(animate);


   renderer.render(scene, camera);
};

animate();