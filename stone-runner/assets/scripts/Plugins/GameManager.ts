import {_decorator, Component, View} from 'cc';
import EventManager from './EventManager';
import Events from '../Enums/Events';
import { ScreenInfo } from '../Adaptive/ScreenInfo';
const {ccclass} = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private screenInfo: ScreenInfo = new ScreenInfo();

    protected onLoad(): void {
        this.windowResized();
    }

    protected onEnable(): void {
        this.subscribeEvents();   
    }

    private subscribeEvents(): void {
        View.instance.on('design-resolution-changed', this.windowResized, this);
    }

    private windowResized(): void {
        EventManager.emit(Events.WINDOW_RESIZED_CHANGED, this.screenInfo);
    }
}


