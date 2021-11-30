import React from 'react';

class R2MMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeR2M row map";



        if(this.props.module != 'map'){
            containerClassName += " hidden";
        }


        const bannerClassName = "homeBanner";

        return (

                <div className={containerClassName}>
                    <div className={bannerClassName}>
                        <img src="/images/r2m-map.svg" width="100%"/>
                    </div>
                </div>


        );
    }
}
window.R2MMap = R2MMap;