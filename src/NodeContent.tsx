import * as React from 'react';

type Props = {
    name: string;
    potential?: string
};

export const NodeContent: React.FC<Props> = ({name, potential}) => {
    return <div className="node-content-wrapper">
        <div className="node-content-wrapper__image"></div>
        <div className="node-content-wrapper__info">
            <div className="node-content-wrapper__info__name">{name}</div>
            {potential ? <div className="node-content-wrapper__info__potential">{potential}</div> : null}
        </div>
    </div>
};