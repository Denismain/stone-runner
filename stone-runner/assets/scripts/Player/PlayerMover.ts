import { _decorator, CCFloat, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerMover')
export class PlayerMover extends Component {
    @property(CCFloat) playerSpeed: number = 50;

    start() {

    }

    update(deltaTime: number) {
        
    }
}


