import React from 'react';

class HomeConference extends React.Component {
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
                        <h1>Virtual Conference 2022</h1>
                        <div>
                            Thank you for attending the Serious Scrum 2022 (Un)conference!
                        </div>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="https://www.meetup.com/serious-scrum/events/286825095/" target="_blank">Watch the Recordings</a></p>
                    </div>
                </div>


        );
    }
}
window.HomeConference = HomeConference;