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

    protected onEnable(): void {
        EventManager.on(Events.JUMP, this.onJump, this);
    }

    protected onDisable(): void {
        EventManager.off(Events.JUMP, this.onJump, this);
    }

    protected start() :void {
        this.startGame();
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
}
