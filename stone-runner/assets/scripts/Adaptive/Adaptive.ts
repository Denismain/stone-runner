import {_decorator, Component} from 'cc';
import EventManager from '../Plugins/EventManager';
import Events from '../Enums/Events';
import {ScreenInfo} from './ScreenInfo';
const {ccclass, property} = _decorator;

@ccclass('Adaptive')
export class Adaptive extends Component {
    protected onEnable(): void {
        EventManager.on(Events.WINDOW_RESIZED_CHANGED, this.onWindowResizedChanged, this);
    }

    private onWindowResizedChanged(screenInfo: ScreenInfo): void {
        this.setUIProperties(screenInfo);
    }

    private setUIProperties(screenInfo: ScreenInfo): void {
        if (screenInfo.IS_LANDSCAPE) {
            console.log('landscape');
        } else {
            console.log('isportrait');
        }
    }
}


