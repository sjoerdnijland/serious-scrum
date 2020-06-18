import React from 'react';

class Tsunami extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "tsunami row";

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <h1>a Tsunami<br/>of Sense!</h1>
                        <div>We are an open global Scrum Community of 3.5K Scrum Professionals</div>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="http://seriousscrum.com/invite" target="_blank">Join us at Slack!</a></p>

                    </div>
                </div>


        );
    }
}
window.Tsunami = Tsunami;