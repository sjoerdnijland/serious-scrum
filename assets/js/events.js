import React from 'react';

class Events extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "editorialContainer short ";
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
                <div className={titleClassname}>Events</div>
                <a href="https://www.meetup.com/nl-NL/Serious-Scrum/events/270867550/" target="_blank"><div className={itemClassName}>Upcoming events and training at Meetup!</div></a>
                <a href="https://www.meetup.com/nl-NL/Serious-Scrum/events/270867550/" target="_blank"><div className={itemClassName}>Serious Scrum Café</div></a>
                <a href="/docs/Serious-Scrum-Road-To-Mastery-Training.pdf" target="_blank"><div className={itemClassName}>Online Training Program Details (PDF)</div></a>
            </div>

        );
    }
}
window.Events = Events;