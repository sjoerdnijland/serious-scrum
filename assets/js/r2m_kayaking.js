import React from 'react';

class R2MKayaking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_kayaking row";

        if(this.props.label != 'kayaking'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Kayaking the Value Stream</h1>
                        <div>
                          Go with the Value Flow!<br/>
                        </div>
                    </div>
                </div>


        );
    }
}
window.R2MKayaking = R2MKayaking;