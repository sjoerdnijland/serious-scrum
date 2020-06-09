import React from 'react';
import Dropdown from 'react-dropdown';

class CategorySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: false
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    handleChangeInput(event){
        let {value, label} = event;
        let inputValue = value;

        if(this.props.formType == 'submit'){
            this.props.functions.setSubmitCategory(inputValue);
        }else{
            this.props.functions.setReviewCategory(inputValue);
            let selectedOption = [];
            selectedOption['value'] = value;
            selectedOption['label'] = label;

            this.setState({
                selectedOption: selectedOption
            });
        }

        return;

    };

    render() {

        let containerClassName = "inputContainer _mr20 _pl20 _pr20";
        const labelClassName = "label";
        const inputClassName = "select";
        const controlClassName = "selectControl";

        const disabled = this.props.disabled;

        if(disabled){
            containerClassName += " inputDisabled ";
        }

        const categories = this.props.categories;

        let options = [];

        let selectedOption = [];

        if(this.props.categories.length > 1){
            for (var i in categories) {
                if(categories[i].isSeries){
                    continue;
                }
                let option= [];
                option['value'] = categories[i].id;
                option['label'] = categories[i].name;

                options.push(option);

                for (var j in categories[i].subCategories) {
                    let option= [];
                    option['value'] = categories[i].subCategories[j].id;
                    option['label'] = categories[i].subCategories[j].name;
                    options.push(option);
                }
            }
            if(!this.state.selectedOption) {
                selectedOption = options[0];
            }
        }

        if(!this.state.selectedOption){
            for (var i in options) {
                if(options[i]['value'] == this.props.category){
                    selectedOption = options[i];
                }
            }
        }else{
            selectedOption = this.state.selectedOption;
        }

        return (
            <div className={containerClassName}>
                <div className={labelClassName}>Choose main category:</div>
                <Dropdown options={options} className={inputClassName} controlClassName={controlClassName} onChange={this.handleChangeInput} value={selectedOption} placeholder="Select a category" />
            </div>
        );
    }
}
window.CategorySelect = CategorySelect;