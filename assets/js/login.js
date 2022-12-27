import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const containerClassName = "loginContainer buttonContainer _mr20";
        const loginUrl = "/connect/google";

        let loginClassName = "";
        let avatarClass = "hidden";
        let trigger = 'login';

        if(this.props.user.username != ""){
            trigger = '';
            avatarClass = "avatar";
            loginClassName = "hidden";
        }
        let communityLoginClass = "button";
        let editorialLoginClass = "hidden";

        if(this.props.type != 'community'){
            communityLoginClass = "hidden";
            editorialLoginClass = "button";
        }

        return (
            <div className={containerClassName}>
                <a className="_mr20" href="https://community.seriousscrum.com/sign_up" target="_blank"><div className={communityLoginClass}>Join!</div></a>
                <a className="_mr20" href={loginUrl} ><div className={editorialLoginClass}>Sign In!</div><img className={avatarClass} referrerPolicy="no-referrer" src={this.props.user.avatar}/></a>
            </div>
        );
    }
}
window.Login = Login;