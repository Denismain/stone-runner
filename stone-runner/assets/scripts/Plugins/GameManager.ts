import {_decorator, Component, View} from 'cc';
import EventManager from './EventManager';
import Events from '../Enums/Events';
import {ScreenInfo} from '../Adaptive/ScreenInfo';
const {ccclass} = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private screenInfo: ScreenInfo = new ScreenInfo();

    private isGameEnd: boolean = false;

    protected start(): void {
        this.windowResized();
    }

    protected onEnable(): void {
        this.subscribeEvents();
    }

    private subscribeEvents(): void {
        View.instance.on('design-resolution-changed', this.windowResized, this);

        EventManager.on(Events.GAMEPLAY_END, this.onGameEnd, this);
    }

    private windowResized(): void {
        if (this.isGameEnd) return;

        this.screenInfo.updateSettings();

        EventManager.emit(Events.WINDOW_RESIZED_CHANGED, this.screenInfo);
    }

    private onGameEnd(): void {
        this.isGameEnd = true;
    }
}


