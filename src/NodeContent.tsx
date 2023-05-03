import * as React from 'react';
import {ITreeNodeData} from "./Chart";
import {HierarchyNode} from "d3";
import {Layout} from "d3-org-chart";

type Props = {
    name: string;
    data?: ITreeNodeData['properties']
};

const renderProperties = (data: ITreeNodeData['properties']) => {
    return data.map(property => {
        if (property.value) {
            return <div className="section">
                <div className="section-title">{property.name.toUpperCase()}</div>
                <span className="section-value">{property.value}</span>
            </div>
        }
    })
}

export const ButtonContent: React.FC<{layout: Layout, nodes: HierarchyNode<ITreeNodeData>[], directSubs: number}> = ({layout, nodes, directSubs}) => {
    const icons = {
        "top": (nodes) => nodes ? <div className="arrow arrow-top--up">ˆ</div> : <div className="arrow arrow-top--down">ˬ</div>
    }

    return <div className="button-content">
        {icons[layout](nodes)}
        {directSubs ? <div className="button-content__number">{directSubs}</div> : null}
    </div>
}

export const NodeContent: React.FC<Props> = ({name, data}) => {
    return <div className="node-content-wrapper">
        <div className="node-content-wrapper__name">{name}</div>
        <div className="node-content-wrapper__info">
            {renderProperties(data)}
        </div>
    </div>
};