import * as THREE from 'three';
import _ from 'lodash';
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

// Refactor this into catscradle engine
export const createThreeObjectsGroupFromCradle = opts => {
  const { cradle } = opts;
  const vectors = cradle.coordinates.map(cord => new THREE.Vector3(...cord));
  
  const nodes = vectors.map(vec => {
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const geometry = new THREE.SphereGeometry(0.03, 32, 32);
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(vec);
    return sphere;
  });
  
  const strings = [];
  const stringMaterial = createThreeMaterial('lambert');
  for(let i = 0; i < vectors.length; i++) {
    const geometry = createStringSegmentGeometry(vectors[i], vectors[(i + 1) % vectors.length]);
    strings.push(new THREE.Mesh(geometry, stringMaterial));
  }

  const group = new THREE.Group();
  group.add(...nodes, ...strings);
  return group;
};

const createStringSegmentGeometry = (start, end) => {
  const vectors = [start, end];
  vectors.splice(1, 0, getDanglePoint(vectors));
  const curve = new THREE.CatmullRomCurve3(vectors);
  const geometry = new THREE.TubeBufferGeometry(curve, 100, 0.01, 10);
  return geometry;
};

const getDanglePoint = points => {
  const midpoint = new THREE.Vector3().addVectors(...points).multiplyScalar(0.5);
  const distance = points[0].distanceTo(points[1]);
  return midpoint.setY(midpoint.y - distance * 0.2);
};

export const createThreeMaterial = params => {
  const opts = Object.assign({
    material: 'lambert',
    color: coolHexColor()
  }, params);
  const { material, color } = opts;

  switch(material) {
    case 'lambert':
      return new THREE.MeshLambertMaterial({ color });
    default:
      return new THREE.MeshBasicMaterial({ color });
  }
};

export const coolHexColor = () => {
  return parseInt(_.shuffle(['e2', 'e2', 'e2', '00', '00']).slice(2).join(''), 16);
};
