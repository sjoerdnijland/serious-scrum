import React from 'react';

class Slack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            emailValue: '',
            displaySentMessage: false,
            displayErrorMessage: false,
            errorMessage: ''
        };
    }

    updateEmailValue(evt) {
        this.setState({
            emailValue: evt.target.value
        });
    }

    sendInvite(email){
        fetch("/slack?email="+email)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.ok);
                    if(result.ok){
                        this.setState({
                            isLoaded: true,
                            errorMessage: '',
                            displaySentMessage: true
                        });
                    }else{
                        this.setState({
                            isLoaded: true,
                            errorMessage: 'Oops! '+result.error.replace(/_/g, ' '),
                            displayErrorMessage: true
                        });
                    }

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        errorMessage: 'Oops, we could not connect to Slack!',
                        displayErrorMessage: true
                    });
                }
            )
    }

    render() {

        const ContainerClassName = "medium container _mt40";
        const slackLogo = "images/slack-logo.svg";

        let sentMessageClass = "hidden";
        if(this.state.displaySentMessage){
            sentMessageClass = "success"
        }

        let errorMessageClass = "hidden";
        if(this.state.displayErrorMessage){
            errorMessageClass = "error"
        }

        return (

            <div className={ContainerClassName}>
                <div className="row">
                    <div className="one-third column logo-min-width">
                        <img src={slackLogo}/>
                    </div>
                    <div className="two-thirds column">
                        <p>Let’s have a serious chat at <a href="/invite" target="_blank">Slack</a> about Scrum. </p>
                        <p><span className="metric">2.500</span> <span>members</span></p>
                        <p><span className="metric">3.500</span> <span>messages / month</span></p>
                        <p className="_pt20 buttonContainer">
                            <a className="button" id="requestInvite_button" href="/invite" target="_blank">Invite me!</a>
                        </p>
                    </div>
                </div>
            </div>

        );
    }
}
window.Slack = Slack;

/*
                        */

/*<a className="button" id="requestInvite_button" onClick={() => this.sendInvite(this.state.emailValue)}>invite me!</a>*/
