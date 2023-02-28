import Chunk from "../chunk";

export default class Generator {

    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName() : string {
        return this.name;
    }

    // Places base blocks in chunk
    generateChunk(chunk: Chunk) : void {}

    // Adds trees, ores, grass, etc
    populateChunk(chunk: Chunk) : void {}

};