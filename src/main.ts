import * as THREE from "three"
import BlockRegistry from "./blocks/block_registry";
import World from "./world/world";
import FlatGenerator from "./world/generator/types/flat_generator";
import Vector2 from "./math/vector2";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
try{
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.Camera;
let world: World;
let controls: OrbitControls;

function initialize() : void {
    BlockRegistry.initialize();
    world = new World(new FlatGenerator());
    world.generate(0, 0);
    alert(world.getChunk(new Vector2(0, 0)).)
    scene = new THREE.Scene();
    scene.add(world.getChunk(new Vector2(0, 0)).mesh());
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
}

function animationLoop() : void {
    requestAnimationFrame(animationLoop);
    controls.update();
    renderer.render(scene, camera);
}

initialize();
animationLoop();
}catch(e) {
    alert(e);
}