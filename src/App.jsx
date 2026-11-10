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

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// scene
const scene = new THREE.Scene();

// clock
// const clock = new THREE.Clock(); // Deprecated
const timer = new THREE.Timer(); // Use this for exact same frame of reference of each system

// 3d Object - mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#ff0000" });

const cube = new THREE.Mesh(geometry, material);

// Add Object to scene
scene.add(cube);

// Camera

//! Perspective camera => refer to human eye
const camera = new THREE.PerspectiveCamera(
  75, // fov
  size.width / size.height, // aspect ratio
  0.1, // near distance
  100, // far distance
);

//! Orthographic (90 deg  straight view) Camera => bounds (left,right,top,bottom) , near , far => used in 2d animation
// const camera = new THREE.OrthographicCamera(-2, 2, 2, -1, 0.1, 100);

// set camera position

camera.position.z = 3;
// camera.position.x = -1;
// camera.position.y = -1;

// or

// camera.position.set(1,-2,2);

// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 4;
// cube.rotation.z = Math.PI / 3;

// cube.rotation.set(Math.PI / 3, Math.PI / 5, Math.PI / 3);

camera.scale.x = 2;

// renderer
const canvas = document.querySelector("#webgl");
console.log(canvas);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(size.width, size.height);

// Resize for each screen
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix(); // Update camera
  renderer.setSize(size.width, size.height);
});

const animate = () => {
  // const delta = clock.getElapsedTime; // clock Deprecated
  timer.update();
  const delta = timer.getDelta();
  cube.rotation.y += delta;
  cube.rotation.x += delta;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

function App() {
  return null;
}

export default App;
