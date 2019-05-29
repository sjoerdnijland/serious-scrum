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
                        <p>Let’s have a serious chat at <a href="https://join.slack.com/t/serious-scrum/shared_invite/enQtMzcxNDQ4NTM4MzI1LTI0ZGU0NjFkZGM2ZDM2MTlhMDQyMjVlMTJkZjk5OTZlZDhkNDczZTIzOTUxYjMyYTk4ZGNhOTNjM2EwZWIyMTc" target="_blank">Slack</a> about Scrum. </p>
                        <p>over <span className="metric">1.800</span> <span>members</span></p>
                        <input type="email" value={this.state.emailValue} onChange={evt => this.updateEmailValue(evt)} className="_mt10" name="email" id="requestInvite_input" placeholder="E-mail" required/>
                        <div className={sentMessageClass} id="requestInvite_confirmed">
                            <p>The invite is sent!</p>
                        </div>
                        <div className={errorMessageClass} id="requestInvite_error">
                            <p id='errorMessage'>{this.state.errorMessage}</p>
                        </div>
                        <p className="_pt10 buttonContainer">
                            <a className="button" id="requestInvite_button" onClick={() => this.sendInvite(this.state.emailValue)}>invite me!</a>
                        </p>
                    </div>
                </div>
            </div>

        );
    }
}
window.Slack = Slack;