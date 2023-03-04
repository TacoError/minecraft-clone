import Vector3 from "../math/vector3";
import Vector2 from "../math/vector2";
import Block from "../blocks/block";
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
            throw new Error(`Position out of chunk bounds. ${position.toString()}`);
        }
        this.blocks.delete(position.toString());
    }

    getPosition() : Vector2 {
        return this.position;
    }

    isFullySurrounded(position: Vector3) : boolean {
        const x: number = position.getX();
        const y: number = position.getY();
        const z: number = position.getZ();
        return this.isBlockAt(new Vector3(x + 1, y, z)) &&
        this.isBlockAt(new Vector3(x - 1, y, z)) &&
        this.isBlockAt(new Vector3(z + 1, y, z)) &&
        this.isBlockAt(new Vector3(z - 1, y, z)) &&
        this.isBlockAt(new Vector3(x, y + 1, z)) &&
        this.isBlockAt(new Vector3(x, y - 1, z));
    }

    // Creates seperate instance meshes for every block.
    addToScene(scene: THREE.Scene) : void {
        // dummy matrix used for setting positin of individual blocks
        const holderMatrix: THREE.Object3D = new THREE.Object3D();
        const chunkToWorldX = this.position.getX() << Chunk.CHUNK_SIZE_ROOT;
        const chunkToWorldZ = this.position.getZ() << Chunk.CHUNK_SIZE_ROOT;
        // to be set with every instanced mesh
        const visibleBlocks: Map<Vector3, Block> = new Map();
        let blockPosHolder: Vector3;
        this.blocks.forEach((block: Block, position: string) => {
            blockPosHolder = Vector3.fromString(position);
            if (this.isFullySurrounded(blockPosHolder)) {
                return;
            }
            visibleBlocks.set(blockPosHolder, block);
        });
        const maxBlocks: number = Array.from(visibleBlocks.values()).length;
        const instancedMeshes: Map<string, THREE.InstancedMesh> = new Map();
        // holds the amount of blocks in every instanced mesh (key is block name)
        const currentBlocksInMesh: Map<string, number> = new Map();
        let blocksInMeshHolder: number;
        visibleBlocks.forEach((block: Block, blockPosition: Vector3) => {
            if (!instancedMeshes.has(block.getName())) {
                instancedMeshes.set(block.getName(), new THREE.InstancedMesh(block.getGeometry(), block.getMaterial(), maxBlocks));
                currentBlocksInMesh.set(block.getName(), 0);
            }
            // should never be udf, because is set above if it doesn't exist yet
            blocksInMeshHolder = currentBlocksInMesh.get(block.getName()) as number;
            holderMatrix.position.set(
                blockPosition.getX() + chunkToWorldX,
                blockPosition.getY(),
                blockPosition.getZ() + chunkToWorldZ
            );
            holderMatrix.updateMatrix();
            // should also never be udf
            instancedMeshes.get(block.getName())?.setMatrixAt(
                blocksInMeshHolder,
                holderMatrix.matrix,
            );
            currentBlocksInMesh.set(block.getName(), blocksInMeshHolder + 1);
        });
        for (const mesh of Array.from(instancedMeshes.values())) {
            mesh.instanceMatrix.needsUpdate = true;
            scene.add(mesh);
        }
    }

};