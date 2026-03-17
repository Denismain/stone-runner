import {_decorator, BoxCollider, Component, ICollisionEvent} from 'cc';
import { Road } from '../Road';
import { PlayerController } from './PlayerController';
const {ccclass, property} = _decorator;

@ccclass('PlayerCollisionDetected')
export class PlayerCollisionDetected extends Component {
    @property(PlayerController) playerController: PlayerController = null;

    @property(BoxCollider) private playerBoxCollider: BoxCollider = null;

    protected onEnable(): void {
        this.playerBoxCollider.on('onCollisionEnter', this.onCollisionEnter, this);
    }

    protected onDisable(): void {
        this.playerBoxCollider.off('onCollisionEnter', this.onCollisionEnter, this);
    }

    private onCollisionEnter(event: ICollisionEvent): void {
        const road = event.otherCollider.node.getComponent(Road);

        if (road) {
            if (this.playerController._canJump === false) {
                this.playerController.playerOnGround();
            }
        }
    }
}


