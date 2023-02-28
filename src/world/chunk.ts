import Vector3 from "../math/vector3";
import Vector2 from "../math/vector2";
import Block from "../blocks/block";

export default class Chunk {

    // Defines the width and length of the chunk
    static CHUNK_SIZE = 16;

    // Used for getting chunk -> world position
    static CHUNK_SIZE_ROOT = 4;

    static MAX_HEIGHT = 64;

    private position: Vector2;

    private blocks: Map<string, Block>;

    constructor(position: Vector2) {
        this.position = position;
        this.blocks = new Map();
    }

    isInBounds(position: Vector3) : boolean {
        return position.getX() >= 0 && position.getX() <= Chunk.CHUNK_SIZE &&
        position.getZ() >= 0 && position.getZ() <= Chunk.CHUNK_SIZE &&
        position.getY() >= 0 && position.getY() <= Chunk.MAX_HEIGHT;
    }

    getBlock(position: Vector3) : Block | undefined {
        return this.blocks.get(position.toString());
    }

    setBlock(position: Vector3, block: Block) : void {
        if (!this.isInBounds(position)) {
            throw new Error(`Position out of chunk bounds. ${position.toString()}`);
        }
        this.blocks.set(position.toString(), block);
    }

    removeBlock(position: Vector3) : void {
        if (!this.isInBounds(position)) {
            throw new Error(`Position out of bounds. ${position.toString()}`);
        }
        this.blocks.delete(position.toString());
    }

    getPosition() : Vector2 {
        return this.position;
    }

};