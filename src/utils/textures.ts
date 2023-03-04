import * as THREE from "three";
import {MeshBasicMaterial as MBM} from "three";

export default class TextureLoader {

    private static textures: Map<string, MBM | MBM[]>;

    static initialize() : void {
        const loader: THREE.TextureLoader = new THREE.TextureLoader();
        this.textures = new Map();
        // [url=https://imgbb.com/][img]https://i.ibb.co/grFV2CW/grass-top.png[/img][/url]
// [url=https://imgbb.com/][img]https://i.ibb.co/YkKNRFL/grass-side.png[/img][/url]
        this.textures.set("Grass", [
            new MBM({map:loader.load("https://i.ibb.co/YkKNRFL/grass-side.png")}),
            new MBM({map:loader.load("https://i.ibb.co/YkKNRFL/grass-side.png")}),
            new MBM({map:loader.load("https://i.ibb.co/grFV2CW/grass-top.png")}),
            new MBM({map:loader.load("https://i.ibb.co/YkKNRFL/grass-side.png")}),
            new MBM({map:loader.load("https://i.ibb.co/YkKNRFL/grass-side.png")}),
            new MBM({map:loader.load("https://i.ibb.co/YkKNRFL/grass-side.png")})
        ]);
    }

    static getTexture(name: string) : MBM | MBM[] {
        const texture: MBM | MBM[] | undefined = this.textures.get(name);
        if (texture == undefined) {
            throw new Error(`No texture with name: ${name}`);
        }
        return texture;
    }

};