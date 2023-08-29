import React from 'react';

class HomeJoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeConference row";


        if(this.props.label){
            containerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={containerClassName}>
                    <div className={bannerClassName}>
                        <h1>Join the Community</h1>
                        <div>
                           Share your experience and connect with peers.
                        </div>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="https://join.slack.com/t/serious-scrum/shared_invite/zt-tpyfeaty-~lkfHitvhGtn9fo~1HnwMQ" target="_blank">Join now!</a></p>
                    </div>
                </div>


        );
    }
}
window.HomeJoin = HomeJoin;