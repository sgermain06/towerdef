import { Filter, StrokeInput } from 'pixi.js';
import { type Component } from 'solid-js';
import { Graphics, useApplication } from 'solid-pixi';

interface FieldInterface {
    centered?: boolean;
    x?: number;
    y?: number;
    radius: number;
    filters?: Filter[];
    stroke: StrokeInput;
}

const Field: Component<FieldInterface> = (props) => {

    const app = useApplication();

    const { radius, centered = false, filters = [], stroke } = props;
    let { x = 0, y = 0 } = props;

    if (centered) {
        x = (app!.screen.width / 2);
        y = (app!.screen.height / 2);
    }

    console.log(x, y, radius);

    return (
        <Graphics
            filters={filters}
            ref={g => {
                g.circle(x, y, radius);
                g.stroke(stroke);
            }}
        />
    );
}

export default Field;
