import Chunk from "./chunk";
import Block from "../blocks/block";
import Vector2 from "../math/vector2";
import Generator from "./generator/generator";

export default class World {

    private generator: Generator;

    private chunks: Map<string, Chunk>;

    constructor(generator: Generator) {
        this.generator = generator;
        this.chunks = new Map();
    }

    isChunkAt(position: Vector2) : boolean {
        return this.chunks.get(position.toString()) != undefined;
    }

    getChunk(position: Vector2) : Chunk {
        const chunk: Chunk | undefined = this.chunks.get(position.toString());
        if (chunk == undefined) {
            throw new Error(`Tried to get chunk at ${position.toString()}, but there was none.`);
        }
        return chunk;
    }

    generate(x: number, z: number) : void {
        const chunk: Chunk = new Chunk(new Vector2(x, z));
        this.generator.generateChunk(chunk);
        this.chunks.set(chunk.getPosition().toString(), chunk);
    }

};