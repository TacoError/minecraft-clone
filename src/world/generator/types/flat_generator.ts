import Generator from "../generator";
import Chunk from "../../chunk";
import BlockRegistry from "../../../blocks/block_registry";
import Vector3 from "../../../math/vector3";
import Block from "../../../blocks/block";

export default class FlatGenerator extends Generator {

    constructor() {
        super("flat");
    }

    generateChunk(chunk: Chunk) : void {
        const grass: Block = BlockRegistry.getBlockFromID(0);
        const dirt: Block = BlockRegistry.getBlockFromID(1);
        for (let x: number = 0; x <= Chunk.CHUNK_SIZE; x++) {
            for (let z: number = 0; z <= Chunk.CHUNK_SIZE; z++) {
                chunk.setBlock(new Vector3(x, 6, z), grass);
                for (let y: number = 5; y >= 0; y--) {
                    chunk.setBlock(new Vector3(x, y, z), dirt);
                }
            }
        }
    }

    populateChunk(chunk: Chunk) : void {}

};