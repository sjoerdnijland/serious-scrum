import React from 'react';

class Slack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var ContainerClassName = "medium container _mt40";
        var slackLogo = "images/slack-logo.svg";

        return (
            <div className={ContainerClassName}>
                <div className="row">
                    <div className="one-third column logo-min-width">
                        <img src={slackLogo}/>
                    </div>
                    <div className="two-thirds column">
                        <p>Let’s have a serious chat at <a href="https://join.slack.com/t/serious-scrum/shared_invite/enQtMzcxNDQ4NTM4MzI1LTI0ZGU0NjFkZGM2ZDM2MTlhMDQyMjVlMTJkZjk5OTZlZDhkNDczZTIzOTUxYjMyYTk4ZGNhOTNjM2EwZWIyMTc" target="_blank">Slack</a> about Scrum. </p>
                        <p>over <span className="metric">1.6k</span> <span>members</span></p>
                        <p>over <span className="metric">2k</span> <span>messages /month</span></p>
                        <p className="_pt20 buttonContainer"><a href="https://join.slack.com/t/serious-scrum/shared_invite/enQtMzcxNDQ4NTM4MzI1LTI0ZGU0NjFkZGM2ZDM2MTlhMDQyMjVlMTJkZjk5OTZlZDhkNDczZTIzOTUxYjMyYTk4ZGNhOTNjM2EwZWIyMTc" target="_blank" className="button">I'm invited!</a></p>
                    </div>
                </div>
            </div>

        );
    }
}
window.Slack = Slack;