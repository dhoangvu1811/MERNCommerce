import React from 'react';

const LikeBtnComponent = (props) => {
    const { dataHref } = props;
    return (
        <div
            style={{ marginTop: '10px' }}
            class='fb-like'
            data-href={dataHref}
            data-width=''
            data-layout=''
            data-action=''
            data-size=''
            data-share='true'
        ></div>
    );
};

export default LikeBtnComponent;
