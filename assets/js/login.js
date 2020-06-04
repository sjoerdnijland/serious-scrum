import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const containerClassName = "loginContainer buttonContainer _mr20";
        const loginUrl = "/connect/google";

        let loginClassName = "button";
        let avatarClass = "hidden";
        let trigger = 'login';

        if(this.props.user.username != ""){
            trigger = '';
            avatarClass = "avatar";
            loginClassName = "hidden";
        }

        return (
            <div className={containerClassName}>
                <a href={loginUrl} target="_blank" className="_mr20"><div className={loginClassName}>{trigger}</div><img className={avatarClass} referrerPolicy="no-referrer" src={this.props.user.avatar}/></a>
            </div>
        );
    }
}
window.Login = Login;