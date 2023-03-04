import Block from "./block";
import * as THREE from "three";
import TextureLoader from "../utils/textures";

export default class BlockRegistry {

    private static blocks: Block[];

    private static blockIDMap: Map<number, Block>;

    private static blockNameMap: Map<string, Block>;

    static initialize() : void {
        this.blocks = [];
        const defaultBlockGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
        this.blocks.push(new Block(0, "Grass", 1, 1, defaultBlockGeometry, TextureLoader.getTexture("Grass")));

        this.blockIDMap = new Map(this.blocks.map(block => [block.getID(), block]));
        this.blockNameMap = new Map(this.blocks.map(block => [block.getName(), block]));
    }

    static getBlockFromID(id: number) : Block {
        const block: Block | undefined = this.blockIDMap.get(id);
        if (block == undefined) {
            throw new Error(`Block with id "${id}" doesn't exist.`);
        }
        return block;
    }

    static getBlockFromName(name: string) : Block {
        const block: Block | undefined = this.blockNameMap.get(name);
        if (block == undefined) {
            throw new Error(`Block with name "${name}" doesn't exist.`);
        }
        return block;
    }

};