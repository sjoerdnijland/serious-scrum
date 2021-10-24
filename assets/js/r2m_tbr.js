import React from 'react';

class R2MTBR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_tbr row";

        if(this.props.label != 'training-the-guides'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Training the Guides!</h1>
                        <div>
                            The R2M approach to co-active learning and coaching.<br/>
                        </div>
                    </div>
                </div>


        );
    }
}
window.R2MTBR = R2MTBR;