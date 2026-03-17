import {_decorator, Component, game, Node, Vec3} from 'cc';
const {ccclass, property} = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(Node) private target: Node = null;

   private offset: Vec3 = new Vec3();
   private targetOffsetPos: Vec3 = new Vec3();

    protected start(): void {
       this.calculateOffset();
   }

    protected update(): void {
        this.move();
    }

   private calculateOffset(): void {
       Vec3.subtract(this.offset, this.node.worldPosition, this.target.worldPosition);
   }

   private move(): void {
       Vec3.add(this.targetOffsetPos, this.target.worldPosition, this.offset);

       this.node.setWorldPosition(this.targetOffsetPos.x, this.node.y, this.targetOffsetPos.z);
   }
}
