"use strict";
import "./../style/visual.less";
import EnumerateVisualObjectInstancesOptions = powerbiVisualsApi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbiVisualsApi.VisualObjectInstance;
import VisualObjectInstanceEnumerationObject = powerbiVisualsApi.VisualObjectInstanceEnumerationObject;
//
// import * as d3select from 'd3-selection';
//
// export class Visual implements IVisual {
//     private container: d3.Selection<any, any, any, any>;
//
//     constructor(options: VisualConstructorOptions) {
//         console.log('Visual constructor', options);
//
//         this.container = d3select.select(options.element)
//             .append('div')
//             .append('table');
//     }
//
//     public update(options: VisualUpdateOptions) {
//         // this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
//
//
//         this.container.selectAll('*').remove();
//
//
//         let dataViews = options.dataViews;
//         console.log(dataViews[0]);
//         console.log('Test 1: Valid data view...');
//         if (!dataViews
//             || !dataViews[0]
//             || !dataViews[0].table
//             || !dataViews[0].table.rows
//             || !dataViews[0].table.columns
//             || !dataViews[0].metadata
//         ) {
//             console.log('Test 1 FAILED. No data to draw table.');
//             return;
//         }
//
//
//         let table = dataViews[0].table;
//
//         let dataFlattened = {};
//
//         table.columns.forEach((col, index) => {
//             dataFlattened[col.displayName] = table.rows[index].toString()
//         });
//
//         console.log(dataFlattened);
//
//
//         console.log('Table rendered!');
//
//     }
// }


import powerbiVisualsApi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbiVisualsApi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbiVisualsApi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import {data} from './data'
import IVisualHost = powerbi.extensibility.IVisualHost;
import * as d3 from "d3";
import { OrgChart } from 'd3-org-chart';
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

export class Visual implements IVisual {
    private host: IVisualHost;
    private svg: Selection<SVGElement>;
    private container: Selection<HTMLElement>;
    private circle: Selection<SVGElement>;
    private textValue: Selection<SVGElement>;
    private textLabel: Selection<SVGElement>;
    private data;

    constructor(options: VisualConstructorOptions) {
        // this.svg = d3.select(options.element)
        //     .append('svg')
        //     .classed('circleCard', true);
        // this.container = this.svg.append("g")
        //     .classed('container', true);
        this.data = data;
        this.container = d3.select(options.element).append('div').classed('circleCard', true)
    }

    public update(options: VisualUpdateOptions) {
        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        let dataView: DataView = options.dataViews[0];

        new OrgChart<any>().container('.circleCard').data(data).nodeWidth((d) => 250)
            .initialZoom(0.7)
            .nodeHeight((d) => 175)
            .nodeWidth((d) => 250)
            .initialZoom(1)
            .childrenMargin((d) => 40)
            .compactMarginBetween((d) => 15)
            .compactMarginPair((d) => 80)
            .nodeContent((d, i, arr, state) => {
                return `
                <div style="padding-top:30px;background-color:transparent;margin-left:1px;height:${d.height}px;border-radius:2px;overflow:visible">
                    <div style="height:${d.height - 32}px;padding-top:0;background-color:white;border:1px solid lightgray;">
                        <img src=" ${d.data.imageUrl}" style="margin-top:-30px;margin-left:${250 / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />
                        <div style="margin-right:10px;margin-top:15px;float:right">${d.data.id}</div>
                        <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${250 - 2}px;border-radius:1px"></div>

                        <div style="padding:20px; padding-top:35px;text-align:center">
                            <div style="color:#111672;font-size:16px;font-weight:bold">${d.data.name}</div>
                            <div style="color:#404040;font-size:16px;margin-top:4px"> ${d.data.positionName}</div>
                        </div> 
                        <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                            <div > Manages:  ${d.data._directSubordinates} 👤</div>  
                            <div > Oversees: ${d.data._totalSubordinates} 👤</div>    
                        </div>
                    </div>     
                </div>
                `;
            })
            .render();
        // console.log(dataView);
        // this.svg.attr("width", width);
        // this.svg.attr("height", height);
        // let radius: number = Math.min(width, height) / 2.2;
        // this.circle
        //     .style("fill", "white")
        //     .style("fill-opacity", 0.5)
        //     .style("stroke", "black")
        //     .style("stroke-width", 2)
        //     .attr("r", radius)
        //     .attr("cx", width / 2)
        //     .attr("cy", height / 2);
        // let fontSizeValue: number = Math.min(width, height) / 5;
        // this.textValue
        //     .text("Value")
        //     .attr("x", "50%")
        //     .attr("y", "50%")
        //     .attr("dy", "0.35em")
        //     .attr("text-anchor", "middle")
        //     .style("font-size", fontSizeValue + "px");
        // let fontSizeLabel: number = fontSizeValue / 4;
        // this.textLabel
        //     .text("Label")
        //     .attr("x", "50%")
        //     .attr("y", height / 2)
        //     .attr("dy", fontSizeValue / 1.2)
        //     .attr("text-anchor", "middle")
        //     .style("font-size", fontSizeLabel + "px");
    }
}