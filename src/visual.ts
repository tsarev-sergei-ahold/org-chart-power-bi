"use strict";

import powerbiVisualsApi from "powerbi-visuals-api";
import "./../style/visual.less";

import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbiVisualsApi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbiVisualsApi.extensibility.visual.IVisual;
import * as React from "react";
import * as ReactDOM from "react-dom";
import Chart, { ITreeNodeData} from "./Chart";

const DEFAULT_HEIGHT = 40;

const DATA_PROPERTY_HEIGHT = 50;

export class Visual implements IVisual {
    private readonly target: HTMLElement;
    private readonly reactRoot: React.ComponentElement<any, any>;

    constructor(options: VisualConstructorOptions) {
        this.reactRoot = React.createElement(Chart);
        this.target = options.element;

        ReactDOM.render(this.reactRoot, this.target);
    }

    public update(options: VisualUpdateOptions) {
        console.log('Visual update', options);

        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        let dataViews = options.dataViews;

        if (!dataViews
            || !dataViews[0]
            || !dataViews[0].categorical
            || !dataViews[0].categorical.categories
        ) {
            console.log('No data to draw.');
            return;
        }

        let catDataView = dataViews[0].categorical.categories;

        let allData: ITreeNodeData[] = catDataView[0].values.map((val, idx) => (
            {
                id: val.toString(),
                parentId: catDataView[1].values[idx].toString(),
                name: catDataView[2].values[idx].toString(),
                properties: catDataView.filter((prp) => { return prp.source.roles.properties; } ).map((pr) => (
                    {
                        name: pr.source.displayName,
                        value: pr.values[idx].toString()
                    }))
            }
        ));

        const maxProperties = Math.max(...allData.map(d => d.properties.length));

        const nodeHeight = DEFAULT_HEIGHT + (maxProperties * DATA_PROPERTY_HEIGHT);

        console.log("All data", allData);

        Chart.UPDATE({data: allData, width, height, nodeHeight});
    }
}