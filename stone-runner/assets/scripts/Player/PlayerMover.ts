import {_decorator, CCFloat, Component, RigidBody, tween, v3, Vec3} from 'cc';
import EventManager from '../Plugins/EventManager';
import Events from '../Enums/Events';
import AnimationTypes from '../Enums/AnimationTypes';
import {PlayerAnimator} from './PlayerAnimator';
const {ccclass, property} = _decorator;

@ccclass('PlayerMover')
export class PlayerMover extends Component {
    @property(PlayerAnimator) private playerAnimator: PlayerAnimator = null;
    @property(RigidBody) private playerRigidBody: RigidBody = null;

    @property(CCFloat) private playerSpeed: number = 5;
    @property(CCFloat) private jumpForce: number = 4;
    @property(CCFloat) private fallDelay: number = 0.7;

    private canMove: boolean = false;
    private isGameEnd: boolean = false;
    
    private fallXAngle: number = 90;
    private initialAngle: Vec3 = new Vec3();
    private velocity: Vec3 = new Vec3();
    private initialPos: Vec3 = new Vec3();

    protected onLoad(): void {
        this.initialAngle = this.node.eulerAngles.clone();
        this.initialPos = this.node.position.clone();
    }

    protected onEnable(): void {
        EventManager.on(Events.FALL, this.onFall, this);
        EventManager.on(Events.RESTART, this.onRestart, this);
        EventManager.on(Events.GAMEPLAY_END, this.onGameplayEnd, this);

        EventManager.once(Events.START_GAMEPLAY, this.onStartGameplay, this);
    }

    protected onDisable(): void {
        EventManager.off(Events.FALL, this.onFall, this);
        EventManager.off(Events.RESTART, this.onRestart, this);
        EventManager.off(Events.GAMEPLAY_END, this.onGameplayEnd, this);
    }

    public executeJump(): void {
        if (!this.canMove) return;

        this.playerAnimator.playPlayerAnimation(AnimationTypes.Jump);
        this.playerRigidBody.applyImpulse(v3(0, this.jumpForce, 0));

        EventManager.emit(Events.JUMP);
    }

    protected update(dt: number): void {
        if (!this.canMove || this.isGameEnd) return;

        this.setPlayerSpeed(dt);
    }

    private setPlayerSpeed(dt: number): void {
        this.playerRigidBody.getLinearVelocity(this.velocity);

        this.playerRigidBody.setLinearVelocity(v3(0, this.velocity.y, this.playerSpeed));
    }

    private onFall(): void {
        this.canMove = false;

        tween(this.node)
            .to(this.fallDelay, {eulerAngles: v3(this.fallXAngle, 0, 0)})
            .call(() => {EventManager.emit(Events.RESTART)})
            .start();
    }

    private onStartGameplay(): void {
        this.canMove = true;
    }

    private onRestart(): void {
        this.node.eulerAngles = this.initialAngle;
        //this.node.position = this.initialPos;

        this.canMove = true;
    }

    private onGameplayEnd(): void {
        this.isGameEnd = true;
    }
}
