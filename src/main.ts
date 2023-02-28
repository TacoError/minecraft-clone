import * as THREE from "three"
import BlockRegistry from "./blocks/block_registry";

let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.Camera;

function initialize() : void {
    BlockRegistry.initialize();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animationLoop() : void {
    requestAnimationFrame(animationLoop);
    renderer.render(scene, camera);
}

initialize();
animationLoop();