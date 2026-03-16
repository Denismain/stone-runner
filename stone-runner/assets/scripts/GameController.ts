import {_decorator, Component} from 'cc';
import {PlayerAnimator} from './Player/PlayerAnimator';
import AnimationTypes from './Enums/AnimationTypes';
const {ccclass, property} = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(PlayerAnimator) playerAnimator: PlayerAnimator = null;

    protected start() :void {
        this.startGame();
    }

    private startGame(): void {
        this.playerAnimator.playPlayerAnimation(AnimationTypes.Run);
    }
}
