import {_decorator, Component} from 'cc';
import EventManager from '../Plugins/EventManager';
import Events from '../Enums/Events';
import {PlayerMover} from './PlayerMover';
import { PlayerAnimator } from './PlayerAnimator';
import AnimationTypes from '../Enums/AnimationTypes';
import { GameController } from '../GameController';
const {ccclass, property} = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(GameController) private gameController: GameController = null;
    @property(PlayerMover) private playerMover: PlayerMover = null;
    @property(PlayerAnimator) private playerAnimator: PlayerAnimator = null;

    private canJump: boolean = false;
    private isGameStart: boolean = false;
    private isGameEnd: boolean = false;

    public get _canJump(): boolean {
        return this.canJump;
    }

    protected onLoad(): void {
        this.canJump = true;
    }

    protected onEnable(): void {
        EventManager.on(Events.TOUCH, this.onTouch, this);
        EventManager.on(Events.RESTART, this.onRestart, this);
        EventManager.on(Events.GAMEPLAY_END, this.onGameplayEnd, this);

        EventManager.once(Events.START_GAMEPLAY, this.onStartGameplay, this);
    }

    protected onDisable(): void {
        EventManager.off(Events.TOUCH, this.onTouch, this);
        EventManager.off(Events.RESTART, this.onRestart, this);
        EventManager.off(Events.GAMEPLAY_END, this.onGameplayEnd, this);
    }

    public playerOnGround(): void {
        this.playerAnimator.playPlayerAnimation(AnimationTypes.Run);
        this.canJump = true;
    }

    public playerFall(): void {
        this.gameController.fall();
    }

    private attemptToJump(): void {
        if (this.canJump) {
            this.playerMover.executeJump();

            this.canJump = false;
        }
    }

    private onTouch(): void {
        if (!this.isGameStart || this.isGameEnd) {
            return;
        }

        this.attemptToJump();
    }

    private onStartGameplay(): void {
        this.isGameStart = true;
    }

    private onRestart(): void {
        this.canJump = false;
    }

    private onGameplayEnd(): void {
        this.isGameEnd = true;
    }
}
