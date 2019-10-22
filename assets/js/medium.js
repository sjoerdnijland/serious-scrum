import React from 'react';

class Medium extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "medium container _mt40";
        const mediumLogo = "images/medium-logo.svg";

        return (
            <div className={ContainerClassName}>
                <div className="row ">
                    <div className="one-third column logo-min-width">
                        <img src={mediumLogo}/>
                    </div>
                    <div className="two-thirds column">
                        <p>Content by and for Scrum practitioners at <a href="https://medium.com/serious-scrum" target="_blank">Medium</a>.</p>
                        <p>over <span className="metric">5.000</span> <span>followers</span></p>
                        <p>over <span className="metric">100.000</span> <span>reads /month</span></p>
                        <p className="_pt20 buttonContainer"><a href="https://medium.com/serious-scrum" target="_blank" className="button">Tune in!</a></p>
                    </div>
                </div>
            </div>

        );
    }
}
window.Medium = Medium;