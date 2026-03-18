import {_decorator, CCFloat, CCInteger, Component, Node, Vec3} from 'cc';
import {PoolManager} from './Plugins/Pool/PoolManager';
const {ccclass, property} = _decorator;

@ccclass('StoneController')
export class StoneController extends Component {
    @property(Node) private stonesParent: Node = null;

    @property(CCFloat) private stoneYOffset: number = 0.4;
    @property(CCInteger) stoneCount: number = 5;

    private offset: Vec3 = new Vec3();
    
    private poolManager: PoolManager = null;

    protected onLoad(): void {
        this.poolManager = PoolManager.getInstance();
    }

    protected start(): void {
        this.spawnStones();
    }

    private spawnStones(): void {
        for (let i: number = 0; i < this.stoneCount; i++) {
            const stone = this.poolManager.getObject(this.offset, this.stonesParent);
            
            stone.node.y = this.stoneYOffset;

            this.offset.z += 10;
        }
    }
}
