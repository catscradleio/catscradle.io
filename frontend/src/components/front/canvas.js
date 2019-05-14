import React from 'react';
import * as THREE from 'three';
import styles from './canvas.module.css';




var OrbitControls = require("three-orbit-controls")(THREE);
class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.addCube = this.addCube.bind(this);
        this.initializeCamera = this.initializeCamera.bind(this);
        this.initializeOrbits = this.initializeOrbits.bind(this);
    }

    addCube(cube) {
        this.scene.add(cube);
    }
    componentDidMount() {
        const width = this.mount.clientWidth/1.1;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);
        this.initializeOrbits();
        this.initializeCamera();

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xFF00FF });
        let cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.animate();
    }
    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }
    initializeOrbits() {
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
    }
    initializeCamera() {
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 4;
    }
    animate(cube) {
        this.frameId = window.requestAnimationFrame(this.animate);

        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div>
                <div className={styles['canvasContainer']}> 
                <h1>Untitled demo</h1>
                <h3>A cradle by anonymous</h3>
                <div className={styles['canvas']}
                    ref={mount => {
                        this.mount = mount;
                    }}
                />
                </div>
            </div>
        );
    }
}
export default Canvas;