import Vector3 from "../math/vector3";
import Vector2 from "../math/vector2";
import Block, {VoxelSide} from "../blocks/block";
import * as THREE from "three";

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

    isBlockAt(position: Vector3) : boolean {
        return this.blocks.get(position.toString()) != undefined;
    }

    getBlock(position: Vector3) : Block {
        const block = this.blocks.get(position.toString());
        if (block == undefined) {
            throw new Error(`Tried to get block, but block doesn't exist. ${position.toString()}`)
        }
        return block;
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

    // Culled mesher, takes the chunk and makes a mesh out of blocks that are visible.
    mesh() : THREE.Mesh {
        const positions: number[] = [];
        const normals: number[] = [];
        const indices: number[] = [];
        const uvs: number[] = [];
        let block: Block | undefined;
        let sidePosition: Vector3;
        let blockPosition: Vector3;
        let index: number;
        for (let x: number = 0; x <= Chunk.CHUNK_SIZE; x++) {
            for (let y: number = 0; y <= Chunk.MAX_HEIGHT; y++) {
                for (let z: number = 0; z <= Chunk.CHUNK_SIZE; z++) {
                    blockPosition = new Vector3(x, y, z);
                    if (!this.isBlockAt(blockPosition)) {
                        continue;
                    }
                    block = this.getBlock(blockPosition);
                    for (const side of Object.values(Block.VOXEL_SIDES)) {
                        sidePosition = new Vector3(x + side.sideOffset.getX(), y + side.sideOffset.getY(), z + side.sideOffset.getZ());
                        if (this.isInBounds(sidePosition) && this.isBlockAt(sidePosition)) {
                            continue;
                        }
                        for (const vertice of side.vertices) {
                            positions.push(x + vertice[0], y + vertice[1], z + vertice[2]);
                            normals.push(...side.sideOffset.toArray());
                        }
                        index = positions.length / 3;
                        indices.push(index, index + 1, index + 2, index + 2, index + 1, index + 3);
                    }
                }
            }
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
        geometry.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(normals), 3));
        geometry.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(uvs), 2));
        return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({color: "#00FF00"}));
    }

};