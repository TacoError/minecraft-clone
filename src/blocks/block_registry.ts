import Block from "./block";

export default class BlockRegistry {

    private static blocks: Block[];

    private static blockIDMap: Map<number, Block>;

    private static blockNameMap: Map<string, Block>;

    static initialize() : void {
        this.blocks.push(new Block(0, "Grass", 1, 1));

        this.blockIDMap = new Map(this.blocks.map(block => [block.getID(), block]));
        this.blockNameMap = new Map(this.blocks.map(block => [block.getName(), block]));
    }

    static getBlockFromID(id: number) : Block | undefined {
        return this.blockIDMap.get(id);
    }

    static getBlockFromName(name: string) : Block | undefined {
        return this.blockNameMap.get(name);
    }

};