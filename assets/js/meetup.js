import React from 'react';

class Meetup extends React.Component {
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
                        <p>June 20th 2019 we will have our first Serious Scrum meetup.<br/>
                        This meetup will be from 18.00 h to 21.00 h in Hoofddorp, the Netherlands.</p>
                        <p>For sign up information, location, route, hotels in the proximity and other information check here.</p>
                        <p>For questions and updates, please join our <a href="https://join.slack.com/t/serious-scrum/shared_invite/enQtMzcxNDQ4NTM4MzI1LTI0ZGU0NjFkZGM2ZDM2MTlhMDQyMjVlMTJkZjk5OTZlZDhkNDczZTIzOTUxYjMyYTk4ZGNhOTNjM2EwZWIyMTc" target="_blank"><b>#meetup</b></a> channel in Slack.</p>
                        <p className="buttonContainer"><a href="https://medium.com/serious-scrum/first-serious-scrum-meetup-june-20-e14c9d1889e2" target="_blank" className="button">Let's meet up!</a></p>
                    </div>
                    <div className="one-half column logo-min-width _ml40 _mt40">
                        <img src={meetupLogo}/>
                    </div>
                </div>
            </div>


        );
    }
}
window.Meetup = Meetup;