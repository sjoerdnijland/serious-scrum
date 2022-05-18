import React from 'react';
import Dropdown from 'react-dropdown';

class BackstageFilter extends React.Component {
    constructor(props) {
        super(props);

        let placeholder = "All travelgroups";

        const selectedOption = { value: '', label: placeholder };

        this.state = {
            selectedOption: selectedOption,
            placeholder: placeholder
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

        this.props.functions.setBackstageFilter(inputValue, this.props.type);

        return;

    };

    render() {

        let containerClassName = "inputContainer _mr20 _pl20 _pr20 _mt10 _mb10" ;
        const labelClassName = "label";
        const inputClassName = "select";
        const controlClassName = "selectControl";

        let placeholder = this.state.placeholder;

        let options = [
            { value: '', label: placeholder },
        ];

        let option = {};
        this.props.travelgroups.forEach(travelgroup => {
            option = {};
            option['value'] = travelgroup.id;
            option['label'] = travelgroup.groupname;
            options.push(option);
        });

        return (
            <div className={containerClassName}>
                <Dropdown options={options} className={inputClassName} controlClassName={controlClassName} onChange={this.handleChangeInput} value={this.state.selectedOption} placeholder={this.placeholder} />
            </div>
        );
    }
}
window.BackstageFilter = BackstageFilter;