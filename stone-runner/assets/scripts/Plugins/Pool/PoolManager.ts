import {_decorator, CCInteger, Component, instantiate, Node, Prefab, Vec3} from 'cc';
import {PooledComponent} from './PooledComponent';
const {ccclass, property} = _decorator;

@ccclass('PoolConfig')
class PoolConfig {
    @property(Prefab) public pooledObject: Prefab = null;
    @property(CCInteger) public count: number = 0;
}

@ccclass('PoolManager')
export class PoolManager extends Component {
    @property(PoolConfig) private poolConfig: PoolConfig = null;

    private pooledList: Node[] = [];

    private static instance: PoolManager = null;

    protected onLoad(): void {
        this.checkSingle();

        this.initPooledList();
    }

    public static getInstance(): PoolManager {
        return PoolManager.instance;
    }

    public getObject(position: Vec3, parent?: Node): PooledComponent {
        let freeNode = this.pooledList.find((node) => node.getComponent(PooledComponent)?.IsFree);
 
        if (!freeNode) { 
            freeNode = this.createPoolNode(this.poolConfig.pooledObject);
            this.pooledList.push(freeNode);
        }
 
        if (parent) {
            freeNode.parent = parent;
        }
 
        freeNode.position = position;
 
        freeNode.active = true;
 
        const pooledComponent = freeNode.getComponent(PooledComponent);
 
        pooledComponent?.spawnFromPool();
 
        return pooledComponent;
    }

    private checkSingle(): void {
        if (PoolManager.instance !== null) {
            return;
        } else {
            PoolManager.instance = this;
        }
    }

    private initPooledList(): void {
        for (let i = 0; i < this.poolConfig.count; i++) {
            this.pooledList.push(this.createPoolNode(this.poolConfig.pooledObject));
        }
    }
	
    private createPoolNode(pooledPrefab: Prefab): Node {
        const newNode = instantiate(pooledPrefab);
        const pooledComponent = newNode.getComponent(PooledComponent);
 
        if (pooledComponent) {
            pooledComponent.returnToPool();
        }
    
        newNode.active = false; 
        newNode.parent = this.node;
    
        return newNode;
    }
}


