import React from 'react';

class JoinTerms extends React.Component {
    constructor(props) {
        super(props);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
    }

    toggleCheckBox(){
        this.props.functions.toggleTerms();
        return;
    };

    render() {

        let containerClassName = "inputContainer _mr20  _pr20 _pt10 _fl";
        const labelClassName = "label";
        const inputClassName = "checkbox";

        return (
            <div className={containerClassName}>
                <br/><span className="subscription">Subscription is €175,- p/m, starting from the first training.</span><br/>
                <input type="checkbox" className={"_mr10"} checked={this.props.terms} onChange={this.toggleCheckBox}  />
                I agree to the <a href="/page/terms-and-conditions" target="_blank">terms and conditions</a>.<br/>

            </div>
        );
    }
}
window.JoinTerms = JoinTerms;