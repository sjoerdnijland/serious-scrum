import React from 'react';

class JoinSubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            buttonName: 'Join!'
        }
    }

    handleClick(){

        this.btn.setAttribute("disabled", "disabled");


        this.props.functions.join();


        this.setState({
            buttonName: 'Joining...'
        });

        setTimeout(function() { //re-enable button after 3 seconds
            this.btn.removeAttribute("disabled");
            this.setState({
                buttonName: 'Join!'
            });
        }.bind(this), 3000)

    }

    render() {

        const containerClassName = "buttonContainer joinSubmitButton ";
        const buttonClassName = "button _mr20 _mt20  ";

        return (
            <div className={containerClassName}>
                <button ref={btn => { this.btn = btn; }}  onClick={this.handleClick} className={buttonClassName}>{this.state.buttonName}</button>
            </div>
        );
    }
}
window.JoinSubmitButton = JoinSubmitButton;