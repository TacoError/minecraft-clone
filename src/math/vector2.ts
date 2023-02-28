export default class Vector2 {

    private x: number;

    private z: number;

    constructor(x: number, z: number) {
        this.x = x;
        this.z = z;
    }

    getX() : number {
        return this.x;
    }

    getZ() : number {
        return this.z;
    }

    setX(x: number) : void {
        this.x = x;
    }

    setZ(z: number) : void {
        this.z = z;
    }

    toString() : string {
        return `${this.x}:${this.z}`;
    }

};