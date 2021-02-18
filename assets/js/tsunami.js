import React from 'react';

class Tsunami extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "tsunami row";
        let sponsorClassName = "sponsor";

        if(this.props.label){
            containerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        const sponsorImgSrc = "/images/sponsors.png";

        return (

                <div className={containerClassName}>
                    <div className ={sponsorClassName}>
                        <a href={"https://vamp.io/"} target={"_blank"}><img src={sponsorImgSrc}/></a>
                    </div>
                    <div className={bannerClassName}>
                        <h1>a Tsunami<br/>of Sense!</h1>
                        <div>We are an open global Scrum Community of 5K Scrum Professionals</div>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="http://seriousscrum.com/invite" target="_blank">Join us at Slack!</a></p>

                    </div>
                </div>


        );
    }
}
window.Tsunami = Tsunami;