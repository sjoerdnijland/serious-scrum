import React from 'react';
import Dropdown from 'react-dropdown';

class BackstageFilter extends React.Component {
    constructor(props) {
        super(props);

        let placeholder = "All travelgroups";

        if(this.props.type == 'program') {
            placeholder = "All programs";
        }

        if(this.props.type == 'contacted') {
            placeholder = "contacted?";
        }

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

        if(this.props.type=='travelgroup'){
            this.props.travelgroups.forEach(travelgroup => {
                option = {};
                option['value'] = travelgroup.id;
                option['label'] = travelgroup.groupname;
                options.push(option);
            });
        }

        if(this.props.type == 'program'){
            options = [
                { value: '', label: placeholder },
                { value: 'traveler', label: 'traveler' },
                { value: 'trailblazer', label: 'trailblazer' },
                { value: 'guide', label: 'guide' },
                { value: 'expedition', label: 'expedition' },
            ];
        }

        if(this.props.type == 'contacted'){
            options = [
                { value: '', label: placeholder },
                { value: 'no', label: 'uncontacted' },
                { value: 'yes', label: 'contacted' }
            ];
        }

        return (
            <div className={containerClassName}>
                <Dropdown options={options} className={inputClassName} controlClassName={controlClassName} onChange={this.handleChangeInput} value={this.state.selectedOption} placeholder={this.placeholder} />
            </div>
        );
    }
}
window.BackstageFilter = BackstageFilter;