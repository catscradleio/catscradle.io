import * as THREE from 'three';
import CatsCradle from 'catscradle';

export const createCatsCradle = (opts = {}) => {
  const { type } = opts;
  switch(type) {
    default:
      return new CatsCradle();
  }
};

export const createThreeObjectFromCradle = opts => {
  const { cradle } = opts;
  const vectors = cradle.coordinates.map(cord => new THREE.Vector3(...cord));
  const curve = new THREE.CatmullRomCurve3(vectors, true);
  const geometry = new THREE.TubeBufferGeometry(curve, 100, 0.01, 10, true);
  const material = createThreeMaterial(opts);
  return new THREE.Mesh(geometry, material);
};

export const createThreeMaterial = params => {
  const opts = Object.assign({
    material: 'lambert',
    color: 0xe200e2
  }, params);
  const { material, color } = opts;

  switch(material) {
    case 'lambert':
      return new THREE.MeshLambertMaterial({ color });
    default:
      return new THREE.MeshBasicMaterial({ color });
  }
};
