import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

export const initializeCanvas = data => {
  const element = data.element;
  const width = element.clientWidth / 1.1;
  const height = element.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const controls = new OrbitControls(camera, renderer.domElement);
  renderer.setSize(width, height);
  element.appendChild(renderer.domElement);
  initializeOrbits({ controls });
  initializeCamera({ camera });
  initializeLight(scene);
  updateData(data, { scene, camera, renderer });

  const mesh = data.cradle || createPlaceholderMesh();
  scene.add(mesh);
  animate(data)();
};

export const destroyCanvas = data => {
  const { element, frameId, renderer } = data;
  cancelAnimationFrame(frameId);
  element.removeChild(renderer.domElement);
};

const initializeOrbits = fields => {
  const { controls, rotateSpeed = 1, zoomSpeed = 1, panSpeed = 0.8} = fields;
  controls.rotateSpeed = rotateSpeed;
  controls.zoomSpeed = zoomSpeed;
  controls.panSpeed = panSpeed;
};

const initializeCamera = fields => {
  const { camera, x = 0, y = 0, z = 4 } = fields;
  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;
};

const initializeLight = scene => {
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(2, 2, 2);
  const light2 = new THREE.AmbientLight(0x404040);
  scene.add(light, light2);
};

const updateData = (data, fields) => {
  for(const key in fields) {
    data[key] = fields[key];
  }
};

const animate = data => () => {
  data.frameId = requestAnimationFrame(animate(data));
  const width = data.element.clientWidth / 1.1;
  const height = data.element.clientHeight;
  data.renderer.setSize(width, height);
  data.renderer.render(data.scene, data.camera);
};

const createPlaceholderMesh = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
  return new THREE.Mesh(geometry, material);
};
