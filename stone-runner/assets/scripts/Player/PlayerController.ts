import {_decorator, Component} from 'cc';
import EventManager from '../Plugins/EventManager';
import Events from '../Enums/Events';
import {PlayerMover} from './PlayerMover';
import { PlayerAnimator } from './PlayerAnimator';
import AnimationTypes from '../Enums/AnimationTypes';
const {ccclass, property} = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(PlayerMover) private playerMover: PlayerMover = null;
    @property(PlayerAnimator) private playerAnimator: PlayerAnimator = null;

    private canJump: boolean = false;
    private isGameEnd: boolean = false;

    public get _canJump(): boolean {
        return this.canJump;
    }

    protected onLoad(): void {
        this.canJump = true;
    }

    protected onEnable(): void {
        EventManager.on(Events.TOUCH, this.onTouch, this);
        EventManager.on(Events.GAMEPLAY_END, this.onGameplayEnd, this);
    }

    protected onDisable(): void {
        EventManager.off(Events.TOUCH, this.onTouch, this);
        EventManager.off(Events.GAMEPLAY_END, this.onGameplayEnd, this);
    }

    public playerOnGround(): void {
        this.playerAnimator.playPlayerAnimation(AnimationTypes.Run);
        this.canJump = true;
    }

    private attemptToJump(): void {
        if (this.canJump) {
            this.playerMover.executeJump();
            this.playerAnimator.playPlayerAnimation(AnimationTypes.Jump);

            this.canJump = false;
        }
    }

    private onTouch(): void {
        if (this.isGameEnd) {
            return;
        }
        
        this.attemptToJump();
    }

    private onGameplayEnd(): void {
        this.isGameEnd = true;
    }
}


