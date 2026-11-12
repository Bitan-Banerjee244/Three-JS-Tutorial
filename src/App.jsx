import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

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

const gui = new GUI();
const property = {
  color: "#ff0000",
};

const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = () => {
  console.log("All Texture Loaded");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load(
  import.meta.env.VITE_IMAGE_URL,
  () => console.log("Texture Loaded"),
  () => console.log("Progress"),
  () => console.log("Error"),
);

const texture2 = textureLoader.load("./image.png");
texture2.colorSpace = THREE.SRGBColorSpace;

// Properties
// texture2.repeat.x = 3;
// texture2.repeat.y = 3;
// texture.offset.x = 10;
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

// Filtering 
// texture2.minFilter = THREE.LinearFilter; // blurry effect
// texture2.magFilter = THREE.LinearFilter; // blurry effect
texture2.magFilter = THREE.NearestFilter; // blurry effect

// texture optimization (Mip-Mapping) => must be the resolution of 2 power



// scene
const scene = new THREE.Scene();

// clock
// const clock = new THREE.Clock(); // Deprecated
const timer = new THREE.Timer(); // Use this for exact same frame of reference of each system

// 3d Object - mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: "#ff0000" , wireframe:true });
// const geometry = new THREE.SphereGeometry(1, 32, 16);
// const geometry = new THREE.OctahedronGeometry();

// Custom Geometry
// const geometry = new THREE.BufferGeometry();
// const count = 10;
// const positionArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionArray[i] = (Math.random() - 0.5)*4;
// }

// geometry.setAttribute('position',new THREE.BufferAttribute(positionArray,3))

const material = new THREE.MeshBasicMaterial({
  // color: "#ff0000",
  map: texture2,
  // wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);

// Creating GUI for position change

gui.add(cube, "visible");
gui.add(material, "wireframe");
gui.addColor(property, "color").onChange(() => {
  material.color.set(property.color);
});

const positionFolder = gui.addFolder("Position");

positionFolder
  .add(cube.position, "x")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("Position X");
positionFolder
  .add(cube.position, "y")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("Position Y");
positionFolder
  .add(cube.position, "z")
  .min(-3)
  .max(3)
  .step(0.01)
  .name("Position Z");

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

// camera.position.z = 3;
// camera.position.x = -1;
// camera.position.y = -1;

// or

// camera.position.set(1,-2,2);

// cube.rotation.x = Math.PI / 4;
// cube.rotation.y = Math.PI / 4;
// cube.rotation.z = Math.PI / 3;

// cube.rotation.set(Math.PI / 3, Math.PI / 5, Math.PI / 3);

// camera.scale.x = 2;

camera.position.set(0, 0, 3);
camera.lookAt(0, 0, 0); // camera will always look at center

// renderer
const canvas = document.querySelector("#webgl");
console.log(canvas);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(size.width, size.height);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;

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
  controls.update(); // orbit controls update
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
