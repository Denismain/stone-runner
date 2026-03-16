import {_decorator, AnimationClip, Component, Enum, SkeletalAnimation} from 'cc';
import AnimationTypes from '../Enums/AnimationTypes';
const {ccclass, property} = _decorator;

@ccclass('AnimatorConfig')
class AnimatorConfig {
    @property({type: Enum(AnimationTypes)}) public animationType: AnimationTypes = AnimationTypes.Idle;
    @property(AnimationClip) public animationClip: AnimationClip = null;
}

@ccclass('PlayerAnimator')
export class PlayerAnimator extends Component {
    @property(SkeletalAnimation) private playerSkeletalAnimation: SkeletalAnimation = null;

    @property([AnimatorConfig]) private animatorConfig: AnimatorConfig[] = [];

    private animationMap: Map<AnimationTypes, AnimationClip> = new Map();

    protected onLoad(): void {
        this.initAnimationMap();
    }

    public playPlayerAnimation(animationType: AnimationTypes): void {
        const clip = this.animationMap.get(animationType);

        this.playerSkeletalAnimation.play(clip.name);
    }
    	
    private initAnimationMap(): void {
        for (const config of this.animatorConfig) {
            this.animationMap.set(config.animationType, config.animationClip);
        }
    }
}
