import {_decorator, Component} from 'cc';
import EventManager from '../Plugins/EventManager';
import Events from '../Enums/Events';
import {PlayerMover} from './PlayerMover';
const {ccclass, property} = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(PlayerMover) private playerMover: PlayerMover = null;

    protected onEnable(): void {
        EventManager.on(Events.TOUCH, this.onTouch, this);
    }

    protected onDisable(): void {
        EventManager.off(Events.TOUCH, this.onTouch, this);
    }

    private onTouch(): void {
        this.attemptToJump();
    }

    private attemptToJump(): void {
        this.playerMover.executeJump();
    }
}


