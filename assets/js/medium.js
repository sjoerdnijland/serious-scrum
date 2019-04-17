import React from 'react';

class Medium extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var ContainerClassName = "medium container _mt20";
        var mediumLogo = "images/medium-logo.svg";

        return (
            <div className={ContainerClassName}>
                <div className="row ">
                    <div className="one-third column logo-min-width">
                        <img src={mediumLogo}/>
                    </div>
                    <div className="two-thirds column">
                        <p>Follow and join us and other Scrum practitioners on <i>Medium</i>.</p>
                        <p>over <span className="metric">111k</span> <span>minutes read /month</span></p>
                        <p>over <span className="metric">70k</span> <span>views /month</span></p>
                        <p className="_mt20"><a href="https:/medium.com/serious-scrum" target="_blank" className="button">Tune in!</a></p>
                    </div>
                </div>
            </div>

        );
    }
}
window.Medium = Medium;