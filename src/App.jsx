import * as THREE from "three";

/*
THREE JS STEPS : 

1. Create a Scene 
2. Create a Mesh (Actual Object => Geometry + Material)
  a. Create a Geometry
  b. Create a Material
  c. Create the actual object / mesh
3. Add the Mesh On Scene
4. Set Camera with Position
5. Set Renderer and set its size
6. Render the scene and camera

*/

// scene
const scene = new THREE.Scene();

// 3d Object - mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#ff0000" });

const cube = new THREE.Mesh(geometry, material);

// Add Object to scene
scene.add(cube);

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // fov
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near distance
  100, // far distance
);

// set camera position

camera.position.z = 3;
// camera.position.x = -1;
// camera.position.y = -1;

// or

// camera.position.set(1,-2,2);

// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 4;
// cube.rotation.z = Math.PI / 3;

cube.rotation.set(Math.PI / 3, Math.PI / 5, Math.PI / 3);

camera.scale.x = 2 

// renderer
const canvas = document.querySelector("#webgl");
console.log(canvas);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

function App() {
  return null;
}

export default App;
