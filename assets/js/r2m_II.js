import React from 'react';

class R2MII extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_II row";

        if(this.props.label != 'the-key-to-wonderland'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>Part II. <br/>The Key to Wonderland</h1>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="/pages/Road-to-Mastery-E-Book" target="_blank">Get the E-Book!</a></p>

                    </div>
                </div>


        );
    }
}
window.R2MII = R2MII;