import React from 'react';

class JoinFirstname extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.state = {
            inputValue: this.props.firstname,
        };
    }

    handleChangeInput(event){
        let {value} = event.target;
        let inputValue = value;

        //this.setState({inputValue: inputValue});
        this.props.functions.setFirstname(inputValue);
        //this.props.functions.setConfigData(this.props.name, parseFloat(value));

        return;

    };

    render() {

        let containerClassName = "inputContainer _mr20 _pr20";
        const labelClassName = "label";
        const inputClassName = "link";

        const disabled = this.props.disabled;

        if(disabled){
            containerClassName += " inputDisabled ";
        }

        return (
            <div className={containerClassName}>
                <div className={labelClassName}>First name:</div>
                <input
                    name={'firstname'}
                    type="text"
                    onChange={this.handleChangeInput}
                    className={inputClassName}
                    value={this.props.firstname}
                    placeholder="My first name is..."
                    disabled={disabled}
                />
            </div>
        );
    }
}
window.JoinFirstname = JoinFirstname;