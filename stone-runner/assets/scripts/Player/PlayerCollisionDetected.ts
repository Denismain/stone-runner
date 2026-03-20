import {_decorator, BoxCollider, Component, ICollisionEvent} from 'cc';
import {Road} from '../Road';
import {PlayerController} from './PlayerController';
import {Stone} from '../Stone';
const {ccclass, property} = _decorator;

@ccclass('PlayerCollisionDetected')
export class PlayerCollisionDetected extends Component {
    @property(PlayerController) private playerController: PlayerController = null;

    @property(BoxCollider) private playerBoxCollider: BoxCollider = null;

    private isLock: boolean = false;

    protected onEnable(): void {
        this.playerBoxCollider.on('onCollisionEnter', this.onCollisionEnter, this);
    }

    protected onDisable(): void {
        this.playerBoxCollider.off('onCollisionEnter', this.onCollisionEnter, this);
    }

    private onCollisionEnter(event: ICollisionEvent): void {
        if (this.isLock) return;

        const road = event.otherCollider.node.getComponent(Road);
        const stone = event.otherCollider.node.getComponent(Stone);

        if (road) {
            if (!this.playerController._canJump) {
                this.playerController.playerOnGround();
            }
        }

        if (stone) {
            this.isLock = true;

            this.playerController.playerFall();
        }
    }
}


