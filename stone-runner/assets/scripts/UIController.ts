import {_decorator, CCFloat, Component, Enum, Node, tween, UIOpacity, v3, TweenEasing} from 'cc';
import EventManager from './Plugins/EventManager';
import Events from './Enums/Events';
import Easings from './Enums/Easings';
const {ccclass, property} = _decorator;

@ccclass('UIController')
export class UIController extends Component {
    @property(Node) private gameLogoNode: Node = null;
    @property(Node) private installButtonNode: Node = null;
    @property({type: Enum(Easings)}) private hideEasingType: Easings = Easings.backIn;
    @property(CCFloat) private hideDelay: number = 0.3;

    @property(UIOpacity) private shadowOpacity: UIOpacity = null;
    @property({type: Enum(Easings)}) private shadowEasingType: Easings = Easings.sineInOut;
    @property(CCFloat) private shadowShowDelay: number = 0.2;

    @property(Node) private endScreenLogoNode: Node = null;
    @property({type: Enum(Easings)}) private endScreenEasingType: Easings = Easings.backOut;
    @property(CCFloat) private endScreenShowDelay: number = 0.3;

    protected onEnable(): void {
        EventManager.on(Events.GAMEPLAY_END, this.onGameplayEnd, this);  
    }

    protected onDisable(): void {
        EventManager.on(Events.GAMEPLAY_END, this.onGameplayEnd, this);
    }

    private async hideUI(): Promise<void> {
        this.executeTweenHide(this.gameLogoNode);

        await this.executeTweenHide(this.installButtonNode);
    }

    private async executeTweenHide(node: Node): Promise<void> {
        const easingType: TweenEasing = this.hideEasingType.toString() as TweenEasing;

        return new Promise<void>((resolve) => {
            tween(node)
                .to(this.hideDelay, 
                    {scale: v3}, 
                    {easing: easingType}
                )
                .call(() => {
                    resolve();
                })
                .start();
        });
    }

    private async showEndScreen(): Promise<void> {
        await this.showShadow();

        this.endLogoShow();
    }

    private async showShadow(): Promise<void> {
        const easingType: TweenEasing = this.shadowEasingType.toString() as TweenEasing;

        return new Promise<void>((resolve) => {
            tween(this.shadowOpacity)
                .to(this.shadowShowDelay, 
                    {opacity: 255}, 
                    {easing: easingType}
                )
                .call(() => {
                    resolve();
                })
                .start();
        });
    }

    private endLogoShow(): void {
        const easingType: TweenEasing = this.endScreenEasingType.toString() as TweenEasing;

        tween(this.endScreenLogoNode)
            .to(this.endScreenShowDelay,
                {scale: v3(1, 1, 1)},
                {easing: easingType}
            )
            .start();
    }

    private async onGameplayEnd(): Promise<void> {
        await this.hideUI();

        this.showEndScreen();
    }
}
