import React, {ReactNode} from 'react';
type Props = {
    children: ReactNode
}
const PanelLayout = ({children}:Props) => {
    return (
        <div className="panel-layout">
            {children}
        </div>
    );
};

export default PanelLayout;