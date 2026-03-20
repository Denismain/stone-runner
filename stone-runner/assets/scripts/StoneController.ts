import {_decorator, CCFloat, CCInteger, Component, Node, Vec3} from 'cc';
import {PoolManager} from './Plugins/Pool/PoolManager';
import EventManager from './Plugins/EventManager';
import Events from './Enums/Events';
import { Stone } from './Stone';
const {ccclass, property} = _decorator;

@ccclass('StoneController')
export class StoneController extends Component {
    @property(Node) private stonesParent: Node = null;

    @property(CCFloat) private stoneYOffset: number = 0.4;
    @property(CCInteger) private stoneCount: number = 5;
    @property(CCFloat) private minZOffset: number = 1;
    @property(CCFloat) private maxZOffset: number = 13;

    @property(Vec3) private spawnAngle: Vec3 = new Vec3();

    private offset: Vec3 = new Vec3();
    
    private poolManager: PoolManager = null;

    private stonesArray: Stone[] = [];

    protected onLoad(): void {
        this.poolManager = PoolManager.getInstance();
    }

    protected onEnable(): void {
        EventManager.on(Events.RESTART, this.onRestart, this);
    }

    protected onDisable(): void {
        EventManager.off(Events.RESTART, this.onRestart, this);
    }

    protected start(): void {
        this.spawnStones();
    }

    private spawnStones(): void {
        for (let i: number = 0; i < this.stoneCount; i++) {
            this.createStone();
        }
    }

    private createStone(): void {
        const stone = this.poolManager.getObject(this.offset, this.stonesParent);
         
        stone.node.y = this.stoneYOffset;
        stone.node.setRotationFromEuler(this.spawnAngle);

        const randomOffset = this.minZOffset + Math.random() * (this.maxZOffset - this.minZOffset);
        this.offset.z += randomOffset;        

        this.stonesArray.push(stone);
    }

    private destroyStones(): void {
        for (const item of this.stonesArray) {
            item.returnToPool();
        }        
    }

    private respawnStones(): void {
        this.destroyStones();
        this.spawnStones();
    }

    private onRestart(): void {
        this.respawnStones();
    }
}
