import * as React from "react";
import { OrgChart } from 'd3-org-chart';
import { renderToString } from "react-dom/server";
import { NodeContent, ButtonContent } from "./NodeContent";

export interface State {
    data: ITreeNodeData[];
    width?: number;
    height?: number;
    nodeHeight?: number;
}

export interface ITreeNodeData {
    id: string,
    parentId: string,
    name: string,
    properties?: {
        name: string,
        value: string
    }[]
}

export const initialState: State = {
    data: []
}

export class Chart extends React.Component<{}, State>{
    private static updateCallback: (data: object) => void = null;

    public static UPDATE(newState: State) {
        if(typeof Chart.updateCallback === 'function'){
            Chart.updateCallback(newState);
        }
    }

    public state: State = initialState;
    private chart: OrgChart<ITreeNodeData> = null;

    private node = React.createRef<HTMLDivElement>();

    constructor(props) {
        super(props);
        this.createDiagram = this.createDiagram.bind(this);
        this.state = initialState;
    }

    public componentWillMount() {
        Chart.updateCallback = (newState: State): void => { this.setState(newState); };
    }

    public componentWillUnmount() {
        Chart.updateCallback = null;
    }


    componentDidMount() {
        this.createDiagram();
    }

    componentDidUpdate(prevProps, prevState) {
        this.createDiagram();
    }

    render() {
        return (
            <div>
                <div ref={this.node} className="hierarchicalTreeVisual" />
            </div>
        );
    }

    createDiagram() {
        if(this.state.data.length === 0) {
            return;
        }

        if (!this.chart) {
            this.chart = new OrgChart();
        }

        // @ts-ignore
        this.chart.container(this.node.current)
            .data(this.state.data)
            .svgWidth(this.state.width)
            .svgHeight(this.state.height)
            .nodeHeight(() => this.state.nodeHeight)
            .nodeWidth(() => 270)
            .childrenMargin(() => 40)
            .compactMarginBetween(() => 15)
            .compactMarginPair(() => 80)
            .nodeContent((d) => {
                return renderToString(<NodeContent name={d.data.name} data={d.data.properties} />)
            })
            .buttonContent(({node, state}) => {
                //@ts-ignore
                return renderToString(<ButtonContent layout={state.layout} nodes={node.children} directSubs={node.data._directSubordinates} />)
            })
            .render()
            .fit();
    }
}

export default Chart;