import Vector3 from "../math/vector3";
import Vector2 from "../math/vector2";
import Block from "../blocks/block";

export default class Chunk {

    // Defines the width and length of the chunk
    static CHUNK_SIZE = 16;

    // Used for getting chunk -> world position
    static CHUNK_SIZE_ROOT = 4;

    private position: Vector2;

    constructor(position: Vector2) {
        this.position = position;
    }

    getPosition() : Vector2 {
        return this.position;
    }




};