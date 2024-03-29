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
                            The Virtual Training Program!<br/>
                            Exclusive virtual material with over 500 co-active learning activities.
                        </div>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="/r2m" target="_blank">Explore</a></p>
                    </div>
                </div>
        );
    }
}
window.HomeRoad = HomeRoad;