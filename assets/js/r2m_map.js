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


        const bannerClassName = "homeBanner iframe";

        return (

                <div className={containerClassName}>
                    <div className={bannerClassName}>
                        <iframe height="100%"
                                src="https://miro.com/app/live-embed/o9J_lB0BLm0=/?moveToViewport=-1304,2923,5139,3313&embedAutoplay=true"
                                frameBorder="0"
                                scrolling="no"
                                allowFullScreen>
                        </iframe>
                    </div>
                </div>


        );
    }
}
window.R2MMap = R2MMap;