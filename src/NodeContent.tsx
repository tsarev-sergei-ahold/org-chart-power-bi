import * as React from 'react';
import {ITreeNodeData} from "./Chart";

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

export const NodeContent: React.FC<Props> = ({name, data}) => {
    return <div className="node-content-wrapper">
        <div className="node-content-wrapper__name">{name}</div>
        <div className="node-content-wrapper__info">
            {renderProperties(data)}
        </div>
    </div>
};