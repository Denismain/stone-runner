import {_decorator, CCFloat, Component, RigidBody, v3} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PlayerMover')
export class PlayerMover extends Component {
    @property(CCFloat) playerSpeed: number = 50;
    @property(CCFloat) jumpForce: number = 4;

    @property(RigidBody) private playerRigidBody: RigidBody = null;

    protected start(): void {
        this.scheduleOnce(() => {
            this.executeJump();
        }, 3);
    }

    private executeJump(): void {
        this.playerRigidBody.applyImpulse(v3(0, this.jumpForce, 0));
    }
}


