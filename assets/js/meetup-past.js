import React from 'react';

class MeetupPast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "meetup row _pt20 _pl40";
        const meetupLogo = "images/meetup-logo.svg";

        return (
            <div className={ContainerClassName}>
                <div className="row _ml40 _mt10">
                    <div className="one-half column">
                        <h1>Our First Meetup  —  June 20</h1>
                        <p>42 participants for our very first Meetup!</p>
                        <p>To all those who could make it: thank you for joining us. It was awesome to have finally met you in person!</p>
                        <p><a href="https://medium.com/serious-scrum/serious-scrums-first-meetup-3d39b564bdb4?sk=a1db9a0d5aca810624340a174aaa6591" target='_blank'>Read the Recap.</a></p>
                        </div>
                    <div className="one-half column logo-min-width _ml40 _mt40">
                        <img src={meetupLogo}/>
                    </div>
                </div>
            </div>


        );
    }
}
window.MeetupPast = MeetupPast;