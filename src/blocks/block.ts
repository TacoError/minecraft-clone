export default class Block {

    // used to find texture on atlas
    private id: number;

    private name: string;

    private width: number;

    private height: number;

    constructor(id: number, name: string, width: number, height: number) {
        this.id = id;
        this.name = name;
        this.width = width;
        this.height = height;
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

};