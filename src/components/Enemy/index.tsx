import { type Component } from 'solid-js';
import { Graphics, Point } from 'pixi.js';

import { AnimatedObject, EnemyOptions } from '../../interfaces';

export class Enemy extends Graphics implements AnimatedObject {
  
    private _angle: number;
    private _size: number;
    private _distance: number;
    private _strokeColor: number;
    private _strokeWidth: number;
    private _offset: Point;
  
    constructor(options: EnemyOptions) {
        super(options);
        this._angle = options.angle;
        this._size = options.size;
        this._strokeColor = options.strokeColor || 0xFFFFFF;
        this._strokeWidth = options.strokeWidth || 1;
        this._distance = options.distance;
        this._offset = options.offset || new Point(0, 0);

        const x = Math.round((this._distance * Math.cos(this._angle))) + this._offset.x;
        const y = Math.round((this._distance * Math.sin(this._angle))) + this._offset.y;
        // console.log(x, y);

        this.rect(x, y, this._size, this._size);
        this.stroke({ width: this._strokeWidth, color: this._strokeColor });
    }

    animate(_step: number) {
        const x = Math.round((this._distance * Math.cos(this._angle)) + this._offset.x);
        const y = Math.round((this._distance * Math.sin(this._angle)) + this._offset.y);
        console.log(x, y);
        this.position.set(x, y);
        // const x = ((Math.cos(this._angle) * this._duration) * this._velocity);
        // const y = ((Math.sin(this._angle) * this._duration) * this._velocity);
        // this.position.set(x, y);
    }
    
    shouldRemove(_step: number): boolean {
        // return step > this._duration;
        return false;
    }
}

const EnemyComponent: Component = () => {
    return <div>Enemy</div>;
};

export default EnemyComponent;