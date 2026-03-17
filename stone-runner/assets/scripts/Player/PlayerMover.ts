import {_decorator, CCFloat, Component, RigidBody, v3, Vec3} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('PlayerMover')
export class PlayerMover extends Component {
    @property(RigidBody) private playerRigidBody: RigidBody = null;

    @property(CCFloat) private playerSpeed: number = 5;
    @property(CCFloat) private jumpForce: number = 4;

    private velocity: Vec3 = new Vec3();

    public executeJump(): void {
        this.playerRigidBody.applyImpulse(v3(0, this.jumpForce, 0));
    }

    protected update(dt: number): void {
        this.setPlayerSpeed(dt);
    }

    private setPlayerSpeed(dt: number): void {
        this.playerRigidBody.getLinearVelocity(this.velocity);

        this.playerRigidBody.setLinearVelocity(v3(0, this.velocity.y, this.playerSpeed));
    }
}
