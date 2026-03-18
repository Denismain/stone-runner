import {_decorator, Component, View} from 'cc';
import EventManager from '../Plugins/EventManager';
import Events from '../Enums/Events';
const {ccclass} = _decorator;

@ccclass('ScreenInfo')
export class ScreenInfo extends Component {
    private isLandscape: boolean = false;

    public get IS_LANDSCAPE() : boolean {
        return this.isLandscape;
    }

    private gameWidth: number = 0;
    private gameHeight: number = 0;

    public updateSettings(): void {
        const canvasSize = View.instance.getVisibleSize();

        this.gameHeight = canvasSize.height;
        this.gameWidth = canvasSize.width;

        this.isLandscape = this.gameWidth > this.gameHeight ? true : false;
    }
}


