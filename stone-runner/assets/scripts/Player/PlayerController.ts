import {_decorator, Component} from 'cc';
import EventManager from '../Plugins/EventManager';
import Events from '../Enums/Events';
import {PlayerMover} from './PlayerMover';
const {ccclass, property} = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(PlayerMover) private playerMover: PlayerMover = null;

    private canJump: boolean = false;

    public set _canJump(canJump: boolean) {
        this.canJump = canJump;
    }

    protected onLoad(): void {
        this.canJump = true;
    }

    protected onEnable(): void {
        EventManager.on(Events.TOUCH, this.onTouch, this);
    }

    protected onDisable(): void {
        EventManager.off(Events.TOUCH, this.onTouch, this);
    }

    private attemptToJump(): void {
        if (this.canJump) {
            this.playerMover.executeJump();

            this.canJump = false;
        }
    }

    private onTouch(): void {
        this.attemptToJump();
    }
}


