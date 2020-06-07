import React from 'react';

class Mastery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "editorialContainer ";
        const itemClassName = "editorialItem _ml40";

        if(!this.props.active){
            containerClassName += " hideMenu";
        }

        const titleClassname = "editorialMenuTitle";

        if(!this.props.expanded){
            containerClassName += " closed";
        }

        return (
            <div className={containerClassName}>
                <div className={titleClassname}>Road to Mastery</div>
                <a href="/docs/Serious-Scrum-Road-To-Mastery-Training.pdf" target="_blank"><div className={itemClassName}>Online Training Program Details (PDF)</div></a>
                <a href="https://www.meetup.com/nl-NL/Serious-Scrum/events/270867550/" target="_blank"><div className={itemClassName}>Upcoming events and training at Meetup!</div></a>
                <a href="https://www.patreon.com/join/seriousscrum/checkout?rid=5198722" target="_blank"><div className={itemClassName}>Sign Up!</div></a>
                <a href="https://medium.com/serious-scrum/psmiii/home" target="_blank"><div className={itemClassName}>Blog Series (Medium)</div></a>
            </div>

        );
    }
}
window.Mastery = Mastery;