import {_decorator, CCBoolean, Component, math, size, Size, v3, Vec2, Vec3} from 'cc';
import EventManager from '../Plugins/EventManager';
import Events from '../Enums/Events';
import {ScreenInfo} from './ScreenInfo';
const {ccclass, property} = _decorator;

@ccclass('Adaptive')
export class Adaptive extends Component {
    @property(CCBoolean) private isActive: boolean = false;

    @property(Vec3) private landscapeScale: Vec3 = new Vec3();
    @property(Vec3) private portraitScale: Vec3 = new Vec3();

    @property(Vec3) private landscapePosition: Vec3 = new Vec3();
    @property(Vec3) private portraitPosition: Vec3 = new Vec3();

    protected onLoad(): void {
        EventManager.on(Events.WINDOW_RESIZED_CHANGED, this.onWindowResizedChanged, this);
    }

    private setUIProperties(screenInfo: ScreenInfo): void {
        if (!this.isActive) return;

        screenInfo.IS_LANDSCAPE ? this.setLandscape(screenInfo) : this.setPortrait(screenInfo);
    }

    private setLandscape(screenInfo: ScreenInfo): void {
        this.applyScale(this.landscapeScale);
        this.applyPosition(this.landscapePosition, screenInfo);
    }

    private setPortrait(screenInfo: ScreenInfo): void {
        this.applyScale(this.portraitScale);
        this.applyPosition(this.portraitPosition, screenInfo);
    }

    private applyScale(scale): void {
        this.node.scale = scale;
    }

    private applyPosition(position, screenInfo: ScreenInfo): void {
        let targetPosition = position;

        let referenceSize = this.calculateReferenceSize(screenInfo);

        let newPosition = this.calculatePositionByRefSize(targetPosition, referenceSize);

        this.node.setPosition(newPosition.x, newPosition.y, 0);
    }

    private calculateReferenceSize(screenInfo: ScreenInfo): Size {
        let referenceSize = size(screenInfo.GAME_WIDTH, screenInfo.GAME_HEIGHT);

        return referenceSize;
    }

    private calculatePositionByRefSize(relativePosition: Vec2, referenceSize: Size) {
        return math.v2(referenceSize.width * relativePosition.x, referenceSize.height * relativePosition.y);
    }

    private onWindowResizedChanged(screenInfo: ScreenInfo): void {
        this.setUIProperties(screenInfo);
    }
}
