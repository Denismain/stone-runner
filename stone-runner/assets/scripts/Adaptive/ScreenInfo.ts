import {_decorator, Component, View} from 'cc';
const {ccclass} = _decorator;

@ccclass('ScreenInfo')
export class ScreenInfo extends Component {
    private isLandscape: boolean = false;

    public get IS_LANDSCAPE() : boolean {
        return this.isLandscape;
    }

    private gameWidth: number = 0;
    private gameHeight: number = 0;

    public get GAME_WIDTH(): number {
        return this.gameWidth;
    }

    public get GAME_HEIGHT(): number {
        return this.gameHeight;
    }

    public updateSettings(): void {
        const canvasSize = View.instance.getVisibleSize();

        this.gameHeight = canvasSize.height;
        this.gameWidth = canvasSize.width;

        this.isLandscape = this.gameWidth > this.gameHeight ? true : false;
    }
}


