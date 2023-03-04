import * as THREE from "three"
import BlockRegistry from "./blocks/block_registry";
import World from "./world/world";
import FlatGenerator from "./world/generator/types/flat_generator";
import Vector2 from "./math/vector2";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import TextureLoader from "./utils/textures";
 try {
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.Camera;
let world: World;
let controls: OrbitControls;

function initialize() : void {
    TextureLoader.initialize();
    BlockRegistry.initialize();
    world = new World(new FlatGenerator());
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
    for (let x = -5; x <= 5; x++) {
        for (let z = -5; z <= 5; z++) {
            world.generate(x, z);
            world.getChunk(new Vector2(x, z)).addToScene(scene);
        }
    }
}

function animationLoop() : void {
    requestAnimationFrame(animationLoop);
    controls.update();
    renderer.render(scene, camera);
}

initialize();
animationLoop();
}catch(e) {
    alert(e)
}