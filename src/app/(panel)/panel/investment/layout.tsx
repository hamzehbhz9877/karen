import React, {ReactNode} from 'react';
import Header from "app/(panel)/panel/components/header/header";
type Props = {
    children: ReactNode
}
const InvestmentLayout = ({children}:Props) => {
    return (
        <div className="investment-layout m-[20px]">
            <Header/>
            {children}
        </div>
    );
};

export default InvestmentLayout;