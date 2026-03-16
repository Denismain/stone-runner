import {_decorator, Component, Input, input} from 'cc';
import EventManager from './Plugins/EventManager';
import Events from './Enums/Events';
const {ccclass} = _decorator;

@ccclass('TouchController')
export class TouchController extends Component {
    protected onEnable(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    protected onDisable(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    private onTouchStart(): void {
        EventManager.emit(Events.TOUCH);
    }
}


