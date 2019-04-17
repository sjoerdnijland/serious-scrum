import React from 'react';

class Slack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var ContainerClassName = "medium container _mt20";
        var slackLogo = "images/slack-logo.svg";

        return (
            <div className={ContainerClassName}>
                <div className="row">
                    <div className="one-third column logo-min-width">
                        <img src={slackLogo}/>
                    </div>
                    <div className="two-thirds column">
                        <p>Let’s have a serious chat at <i>Slack</i> about Scrum. </p>
                        <p>over <span className="metric">1.6k</span> <span>members</span></p>
                        <p>over <span className="metric">2k</span> <span>messages /month</span></p>
                        <p className="_mt20"><a href="https://join.slack.com/t/serious-scrum/shared_invite/enQtMzcxNDQ4NTM4MzI1LTI0ZGU0NjFkZGM2ZDM2MTlhMDQyMjVlMTJkZjk5OTZlZDhkNDczZTIzOTUxYjMyYTk4ZGNhOTNjM2EwZWIyMTc" target="_blank" className="button">You're invited!</a></p>
                    </div>
                </div>
            </div>

        );
    }
}
window.Slack = Slack;