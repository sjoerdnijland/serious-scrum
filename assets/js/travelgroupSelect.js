import React from 'react';
import Dropdown from 'react-dropdown';

class TravelgroupSelect extends React.Component {
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

        this.props.functions.setTravelgroup(inputValue);
        let selectedOption = [];
        selectedOption['value'] = value;
        selectedOption['label'] = label;

        this.setState({
            selectedOption: selectedOption
        });


        return;

    };

    render() {

        let containerClassName = "inputContainer _mr20  _pr20";
        const labelClassName = "label";
        const inputClassName = "select";
        const controlClassName = "selectControl";

        const disabled = this.props.disabled;

        if(disabled){
            containerClassName += " inputDisabled ";
        }

        const travelgroups = this.props.travelgroups;

        let options = [];

        let selectedOption = [];

        if(this.props.travelgroups.length > 1){
            for (var i in travelgroups) {
                if(i == 0){
                    let option= [];
                    option['value'] = 0;
                    option['label'] = 'Select a travelgroup...';

                    options.push(option);
                }
                if(!travelgroups[i].isFuture || travelgroups[i].isSoldOut || !travelgroups[i].isActive){
                    continue;
                }
                let option= [];
                option['value'] = travelgroups[i].id;
                option['label'] = travelgroups[i].groupname + '. ' +travelgroups[i].launch_at_short;

                options.push(option);
            }
            if(!this.state.selectedOption) {
                selectedOption = options[0];
            }
        }

        if(!this.state.selectedOption){
            for (var i in options) {
                if(options[i]['value'] == this.props.travelgroup){
                    selectedOption = options[i];
                }
            }
        }else{
            selectedOption = this.state.selectedOption;
        }

        return (
            <div className={containerClassName}>
                <div className={labelClassName}>Group:</div>
                <Dropdown options={options} className={inputClassName} controlClassName={controlClassName} onChange={this.handleChangeInput} value={selectedOption} placeholder="Keep me informed about future groups" />
            </div>
        );
    }
}
window.TravelgroupSelect = TravelgroupSelect;