import React, {ReactElement} from 'react';

const NoInformation = ({icon}:{icon:ReactElement}) => {
    return (
        <>
            <div className="table__noinfo text-center">
                {icon}
                <span>مقداری برای نمایش وجود ندارد</span>
            </div>
        </>
    );
};

export default NoInformation;