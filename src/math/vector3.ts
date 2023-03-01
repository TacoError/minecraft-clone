export default class Vector3 {

    private x: number;

    private y: number;

    private z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getX() : number {
        return this.x;
    }

    getY() : number {
        return this.y;
    }

    getZ() : number {
        return this.z;
    }

    setX(x: number) : void {
        this.x = x;
    }

    setY(y: number) : void {
        this.y = y;
    }

    setZ(z: number) : void {
        this.z = z;
    }

    toString() : string {
        return `${this.x}:${this.y}:${this.z}`;
    }

    toArray() : number[] {
        return [this.x, this.y, this.z];
    }

};