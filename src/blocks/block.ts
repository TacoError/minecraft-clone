import Vector3 from "../math/vector3";

export interface VoxelSide {
    sideOffset: Vector3;
    vertices: number[][];
}

export default class Block {

    static VOXEL_SIDES: {[name: string]: VoxelSide} = {
        top: {
            sideOffset: new Vector3(0, 1, 0),
            vertices: [
                [0, 1, 1, 1, 1],
                [1, 1, 1, 0, 1],
                [0, 1, 0, 1, 0],
                [1, 1, 0, 0, 0]
            ]
        },
        bottom: {
            sideOffset: new Vector3(0, -1, 0),
            vertices: [
                [1, 0, 1, 1, 0],
                [0, 0, 1, 0, 0],
                [1, 0, 0, 1, 1],
                [0, 0, 0, 0, 1]
            ]
        },
        back: {
            sideOffset: new Vector3(0, 0, -1),
            vertices: [
                [1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0],
                [1, 1, 0, 0, 1],
                [0, 1, 0, 1, 1]
            ]
        },
        front: {
            sideOffset: new Vector3(0, 0, 1),
            vertices: [
                [0, 0, 1, 0, 0],
                [1, 0, 1, 0, 0],
                [0, 1, 1, 0, 1],
                [1, 1, 1, 1, 1]
            ]
        },
        right: {
            sideOffset: new Vector3(1, 0, 0),
            vertices: [
                [1, 1, 1, 0, 1],
                [1, 0, 1, 0, 0],
                [1, 1, 0, 1, 1],
                [1, 0, 0, 1, 0]
            ]
        },
        left: {
            sideOffset: new Vector3(-1, 0, 0),
            vertices: [
                [0, 1, 0, 0, 1],
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1],
                [0, 0, 1, 1, 0]
            ]
        }
    };

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