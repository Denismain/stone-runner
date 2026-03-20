import {_decorator, CCInteger, Component} from 'cc';
import {PlayerAnimator} from './Player/PlayerAnimator';
import AnimationTypes from './Enums/AnimationTypes';
import EventManager from './Plugins/EventManager';
import Events from './Enums/Events';
const {ccclass, property} = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(PlayerAnimator) playerAnimator: PlayerAnimator = null;

    @property({
        type: CCInteger,
        tooltip: 'Количество прыжков для появления финального экрана'
    }) private jumpsNumber: number = 5;

    private currentJumpCounts: number = 0;

    private isFirstTap: boolean = false;

    protected onEnable(): void {
        EventManager.on(Events.JUMP, this.onJump, this);
        EventManager.on(Events.TOUCH, this.onTouch, this);
    }

    protected onDisable(): void {
        EventManager.off(Events.JUMP, this.onJump, this);
        EventManager.off(Events.TOUCH, this.onTouch, this);
    }

    public fall(): void {
        this.currentJumpCounts = 0;

        this.playerAnimator.playPlayerAnimation(AnimationTypes.Idle);

        EventManager.emit(Events.FALL);
    }

    private startGame(): void {
        this.playerAnimator.playPlayerAnimation(AnimationTypes.Run);
    }

    private gameEnd(): void {
        EventManager.emit(Events.GAMEPLAY_END);
    }

    private onJump(): void {
        this.currentJumpCounts++;

        if (this.currentJumpCounts >= this.jumpsNumber) {
            this.gameEnd();
        }
    }

    private onTouch(): void {
        if (!this.isFirstTap) {
            this.isFirstTap = true;

            this.startGame();

            return;
        }

        EventManager.emit(Events.START_GAMEPLAY);
    }
}
