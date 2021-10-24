import React from 'react';

class JoinLinkedIn extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.state = {
            inputValue: this.props.linkedIn,
        };
    }

    handleChangeInput(event){
        let {value} = event.target;
        let inputValue = value;

        //this.setState({inputValue: inputValue});
        this.props.functions.setLinkedIn(inputValue);
        //this.props.functions.setConfigData(this.props.name, parseFloat(value));

        return;

    };

    render() {

        let containerClassName = "inputContainer _mr20  _pr20";
        const labelClassName = "label";
        const inputClassName = "link";

        const disabled = this.props.disabled;

        if(disabled){
            containerClassName += " inputDisabled ";
        }

        return (
            <div className={containerClassName}>
                <div className={labelClassName}>LinkedIn:</div>
                <input
                    name={'email'}
                    type="text"
                    onChange={this.handleChangeInput}
                    className={inputClassName}
                    value={this.props.email}
                    placeholder="My LinkedIn url is..."
                    disabled={disabled}
                />
            </div>
        );
    }
}
window.JoinLinkedIn = JoinLinkedIn;