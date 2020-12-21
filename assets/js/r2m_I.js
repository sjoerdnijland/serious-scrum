import React from 'react';

class R2MI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_I row";

        if(this.props.label != 'down-the-rabbit-hole'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Part I. <br/>Down The Rabbit Hole</h1>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="/pages/Road-to-Mastery-E-Book" target="_blank">Get the E-Book!</a></p>

                    </div>
                </div>


        );
    }
}
window.R2MI = R2MI;