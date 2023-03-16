import "./../style/visual.less";
import powerbiVisualsApi from "powerbi-visuals-api";
import "./../style/visual.less";
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbiVisualsApi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbiVisualsApi.extensibility.visual.IVisual;
export declare class Visual implements IVisual {
    private host;
    private svg;
    private container;
    private circle;
    private textValue;
    private textLabel;
    private data;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
}
