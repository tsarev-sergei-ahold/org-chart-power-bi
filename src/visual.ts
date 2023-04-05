"use strict";

import powerbiVisualsApi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbiVisualsApi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbiVisualsApi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.IVisualHost;
import * as d3 from "d3";
import { OrgChart } from 'd3-org-chart';
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

interface ITreeNodeData {
    id: string,
    parentId: string,
    name: string,
    properties?: {
      name: string,
      value: string
    }[]
};

export class Visual implements IVisual {
    private container: Selection<HTMLElement>;
    private tree: OrgChart<any>;

    constructor(options: VisualConstructorOptions) {
        this.container = d3.select(options.element).append('div').classed('hierarchicalTreeVisual', true)
    }

    public update(options: VisualUpdateOptions) {
        console.log('Visual update', options);

        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        let dataViews = options.dataViews;

        // if (!dataViews
        //     || !dataViews[0]
        //     || !dataViews[0].table
        //     || !dataViews[0].table.rows
        // ) {
        //     return;
        // }

        // let tableDataView = dataViews[0].table;
        
        // let allData: ITreeNodeData[] = tableDataView.rows.map((row, idx) => (
        //     {
        //         id: row[0].toString(),
        //         parentId: row[1].toString(),
        //         name: row[2].toString()
        //     }
        // ));
        // console.log("All data", allData);

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
        console.log("All data", allData);

      if (options.type == powerbiVisualsApi.VisualUpdateType.Data || options.type.valueOf() == 510) {
        if (!this.tree) {
          console.log("Initialize and render tree");
          this.tree = new OrgChart<any>()
            .container('.hierarchicalTreeVisual')
            .data(allData)
            .svgHeight(height)
            .svgWidth(width)
            .nodeHeight((d) => 200)
            .nodeWidth((d) => 270)
            .childrenMargin((d) => 40)
            .compactMarginBetween((d) => 15)
            .compactMarginPair((d) => 80)
            .nodeContent((d, i, arr, state) => {
              let allProperties = '';
              d.data.properties.forEach(element => {
                allProperties += `
                <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                  <div > ${element.name}</div>  
                  <div > ${element.value}</div>    
                </div>
              `
              });
              return `
                <div style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height
                }px;border-radius:2px;overflow:visible">
                    <div style="height:${d.height - 32
                }px;padding-top:0px;background-color:white;border:1px solid lightgray;">
      
                      <img src=" ${d.data.imageUrl
                }" style="margin-top:-30px;border-radius:100px;width:60px;height:60px;" />
                         
                     <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;border-radius:1px"></div>
      
                     <div style="padding:20px; padding-top:35px;text-align:center">
                         <div style="color:#111672;font-size:16px;font-weight:bold"> ${d.data.name
                } </div>
                     </div> 
                     ${allProperties}
                    </div>     
            </div>
                `;
            })
            .render()
            .fit();
        }
        else {
          console.log("Update data and render tree");
          this.tree
            .data(allData)
            .render()
            .fit();
        }
      }
      else {
        if (!this.tree) return;
        console.log("Just fit tree");
        this.tree
        .fit();
      }
    }
}