import Vector3 from "../math/vector3";

export default class Block {

    private id: number;

    private name: string;

    private width: number;

    private height: number;

    private geometry: THREE.BoxGeometry;
    
    private material: THREE.Material | THREE.Material[];

    constructor(id: number, name: string, width: number, height: number, geometry: THREE.BoxGeometry, material: THREE.Material | THREE.Material[]) {
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
        this.geometry = geometry;
        this.material = material;
    }

    getID() : number {
        return this.id;
    }

    getName() : string {
        return this.name;
    }

    getWidth() : number {
        return this.width;
    }

    getHeight() : number {
        return this.height;
    }

    getGeometry() : THREE.BoxGeometry {
        return this.geometry;
    }

    getMaterial() : THREE.Material | THREE.Material[] {
        return this.material;
    }

};