import * as React from 'react';
import {ITreeNodeData} from "./Chart";

type Props = {
    name: string;
    data?: ITreeNodeData['properties']
};

const renderProperties = (data: ITreeNodeData['properties']) => {
    return data.map(property => {
        if (property.name === "Potential" && property.value) {
            return <div className="node-content-wrapper__info__potential section">
                <div className="section-title">{property.name.toUpperCase()}</div>
                <span className="node-content-wrapper__info__potential__value section-value">{property.value}</span>
            </div>
        }
    })
}

export const NodeContent: React.FC<Props> = ({name, data}) => {
    return <div className="node-content-wrapper">
        <div className="node-content-wrapper__image"></div>
        <div className="node-content-wrapper__info">
            <div className="node-content-wrapper__info__name section">{name}</div>
            {renderProperties(data)}
        </div>
    </div>
};