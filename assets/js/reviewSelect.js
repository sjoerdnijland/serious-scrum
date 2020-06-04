import React from 'react';
import Dropdown from 'react-dropdown';

class ReviewSelect extends React.Component {
    constructor(props) {
        super(props);

        const selectedOption = { value: 'isApproved', label: 'Approved' };
        this.state = {
            selectedOption: selectedOption
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);

    }

    handleChangeInput(event){
        let {value, label} = event;
        let inputValue = value;

        let selectedOption = [];

        selectedOption['value'] = value;
        selectedOption['label'] = label;

        this.setState({
            selectedOption: selectedOption
        });

        this.props.functions.setReviewOption(inputValue);

        return;

    };

    render() {

        let containerClassName = "inputContainer _mr20 _pl20 _pr20 _mt10 _mb10" ;
        const labelClassName = "label";
        const inputClassName = "select";
        const controlClassName = "selectControl";

        const disabled = this.props.disabled;

        if(disabled){
            containerClassName += " inputDisabled ";
        }

        let options = [
            { value: 'isApproved', label: 'Approved' },
            { value: 'isCurated', label: 'Approved and Curated' }
        ];

        if(this.props.form == "submit"){

            if(!this.props.roles.includes("ROLE_EDITOR") && !this.props.roles.includes("ROLE_ADMIN") && !this.props.roles.includes("ROLE_AMBASSADOR")){
                containerClassName += " hidden";
            }

        }else{
            options.push( {value: "isRejected", label: "Rejected"} );
        }

        return (
            <div className={containerClassName}>
                <div className={labelClassName}>Review:</div>
                <Dropdown options={options} className={inputClassName} controlClassName={controlClassName} onChange={this.handleChangeInput} value={this.state.selectedOption} placeholder="Select an option" />
            </div>
        );
    }
}
window.ReviewSelect = ReviewSelect;