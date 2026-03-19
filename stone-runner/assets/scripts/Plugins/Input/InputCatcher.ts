import {_decorator, Component, Enum, EventTouch, Node} from 'cc';
import InputTypes from './InputTypes';
import EventManager from '../EventManager';
import Events from '../../Enums/Events';
const {ccclass, property} = _decorator;

@ccclass('InputCatcher')
export class InputCatcher extends Component {
    @property({type: Enum(InputTypes)}) private inputType: InputTypes = InputTypes.Redirect_Button;

    protected onEnable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    protected onDisable(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    private onTouchStart(event: EventTouch): void {
        if (this.inputType === InputTypes.Redirect_Button) {
            EventManager.emit(Events.REDIRECT);
        }
    }
}


