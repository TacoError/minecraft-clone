import * as THREE from "three"
import BlockRegistry from "./blocks/block_registry";
import World from "./world/world";
import FlatGenerator from "./world/generator/types/flat_generator";
import Vector2 from "./math/vector2";
import TextureLoader from "./utils/textures";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls"
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.Camera;
let world: World;
let fpc: FirstPersonControls;

function initialize() : void {
    TextureLoader.initialize();
    BlockRegistry.initialize();
    world = new World(new FlatGenerator());
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    fpc = new FirstPersonControls(camera, renderer.domElement);
    world.generate(0, 0);
    world.getChunk(new Vector2(0, 0)).addToScene(scene);
}

let keysPressed: string[] = [];
document.addEventListener("keydown", (ev: KeyboardEvent) => {
    keysPressed.push(ev.key.toLowerCase());
});
document.addEventListener("keyup", (ev: KeyboardEvent) => {
    keysPressed = keysPressed.filter(key => key !== ev.key.toLowerCase());
});

let direction: THREE.Vector3 = new THREE.Vector3();

function animationLoop() : void {
    requestAnimationFrame(animationLoop);
    fpc.update(1);
    renderer.render(scene, camera);
}

initialize();
animationLoop();