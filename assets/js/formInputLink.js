import React from 'react';

class FormInputLink extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.state = {
            inputValue: this.props.submitUrl,
        };
    }

    handleChangeInput(event){
        let {value} = event.target;
        let inputValue = value;

        //this.setState({inputValue: inputValue});
        this.props.functions.setSubmitUrl(inputValue);
        //this.props.functions.setConfigData(this.props.name, parseFloat(value));

        return;

    };

    render() {

        let containerClassName = "inputContainer _mr20 _pt20 _pl20 _pr20";
        const labelClassName = "label";
        const inputClassName = "link";

        const disabled = this.props.disabled;

        if(disabled){
            containerClassName += " inputDisabled ";
        }

        return (
            <div className={containerClassName}>
                <div className={labelClassName}>Link to article:</div>
                <input
                    name={this.props.name}
                    type="text"
                    onChange={this.handleChangeInput}
                    className={inputClassName}
                    value={this.props.submitUrl}
                    placeholder="Https://"
                    disabled={disabled}
                />
            </div>
        );
    }
}
window.FormInputLink = FormInputLink;