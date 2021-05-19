import * as THREE from "../node_modules/three/build/three.module.js";

const canvas = document.querySelector('#webgl');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const texture = new THREE.TextureLoader().load("../assets/img/chessboard.jpg");
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(4, 4);

const geometry = new THREE.BufferGeometry();

const verts = [
   new THREE.Vector3(-1.2, 1.2, 0), //0
   new THREE.Vector3(1.2, -1.2, 0), //1
   new THREE.Vector3(-1.2, -1.2, 0), //2
   new THREE.Vector3(1.2, 1.2, 0), //3
   new THREE.Vector3(-1.2, -1.2, -0.4), //4
   new THREE.Vector3(-1.2, 1.2, -0.4), //5
   new THREE.Vector3(1.2, 1.2, -0.4), //6
   new THREE.Vector3(1.2, -1.2, -0.4), //7
   new THREE.Vector3(1.2, 1.2, -0.4), //8
   new THREE.Vector3(-1.2, 1.2, -0.4), //9
   new THREE.Vector3(1.2, -1.2, -0.4), //10
   new THREE.Vector3(-1.2, -1.2, -0.4), //11
   new THREE.Vector3(-1.0, 1.0, -0.2), //12-1
   new THREE.Vector3(1.0, -1.0, -0.2), //13-2
   new THREE.Vector3(-1.0, -1.0, -0.2), //14-3
   new THREE.Vector3(1.0, 1.0, -0.2), //15-4
   new THREE.Vector3(1.2, -1.0, -0.4), //16
   new THREE.Vector3(-1.2, -1.0, -0.4), //17
   new THREE.Vector3(1.2, 1.0, -0.4), //18
   new THREE.Vector3(-1.2, 1.0, -0.4), //19
   new THREE.Vector3(-1.0, 1.0, -0.4), //20
   new THREE.Vector3(-1.0, -1.0, -0.4), //21
   new THREE.Vector3(1.0, -1.0, -0.4), //22
   new THREE.Vector3(1.0, 1.0, -0.4), //23
];

const vertsArray = new Float32Array(verts.map(p => p.toArray()).flat());
const vertsAttrib = new THREE.BufferAttribute(vertsArray, 3);

geometry.setAttribute("position", vertsAttrib);

const faces = [
   //верх доски
   [0, 1, 2],
   [0, 3, 1],
   //левый борт
   [0, 2, 4],
   [4, 0, 5],
   //правый борт
   [3, 1, 6],
   [6, 7, 1],
   //лоб
   [0, 3, 8],
   [8, 0, 9],
   //корма
   [1, 2, 10],
   [10, 2, 11],
   //низ доски
   [12, 13, 14],
   [12, 15, 13],
   //одна из чатей доски
   [10, 11, 16],
   [16, 11, 17],
   //одна из частей доски противоположная прошлой
   [8, 9, 18],
   [9, 18, 19],
   //одна из частей меньшая чем прошлые 2
   [17, 19, 20],
   [17, 20, 21],
   //одна из частей противоположная прошлой
   [16, 18, 22],
   [18, 22, 23],
   //склеивание низа с частями
   [22, 23, 15],
   [15, 22, 13],
   //склеивание низа с частями прот
   [20, 21, 12],
   [12, 21, 14],
   //склейка вертикальных 1
   [20, 23, 15],
   [15, 20, 12],
   //склейка прот вертикадбной
   [14, 13, 22],
   [22, 14, 21]
];

const facesArray = new Uint16Array(faces.flat());
const facesAttrib = new THREE.BufferAttribute(facesArray, 1);
geometry.setIndex(facesAttrib);

geometry.computeVertexNormals();

const material = new THREE.MeshStandardMaterial({
   side: THREE.DoubleSide,
   map: texture
});






// Create a mesh
const mesh = new THREE.Mesh(geometry, material);

// Add it to the scene
scene.add(mesh);

renderer.setClearColor(0xffffff, 1);

camera.position.z = 5;

const animate = function () {
   requestAnimationFrame(animate);
   // mesh.rotation.x += 0.01;
   // mesh.rotation.y += 0.01;
   mesh.rotateY(0.01);

   renderer.render(scene, camera);
};

animate();