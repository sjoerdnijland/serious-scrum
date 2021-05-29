import React from 'react';

class HomeRoad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeRoad row";
        let sponsorClassName = "sponsor";

        if(this.props.label){
            containerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        const sponsorImgSrc = "/images/sponsors.png";

        return (

                <div className={containerClassName}>
                    <div className={bannerClassName}>
                        <h1>Road to Mastery</h1>
                        <div>
                            The Virtual Train-the-Trainer Program!<br/>
                            Exclusive virtual trainer material with over 400 co-active learning activities.
                        </div>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="https://forms.gle/bxiKV1HQ2WA2uZ578" target="_blank">Pre-register now!</a></p>
                    </div>
                </div>


        );
    }
}
window.HomeRoad = HomeRoad;