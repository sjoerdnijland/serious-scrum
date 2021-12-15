import React from 'react';
import Dropdown from 'react-dropdown';

class PlaybookFilter extends React.Component {
    constructor(props) {
        super(props);

        let placeholder = "All 4-C";

        if(this.props.type == 'activity'){
            placeholder = "All activity types";
        }

        if(this.props.type == 'type'){
            placeholder = "All sources";
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

        this.props.functions.setFilter(inputValue, this.props.type);

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
            { value: 'connections', label: 'Connections' },
            { value: 'concepts', label: 'Concepts' },
            { value: 'concrete practice', label: 'Concrete Practice' },
            { value: 'conclusions', label: 'Conclusions' },
        ];



        if(this.props.type == 'activity'){
            options = [
                { value: '', label: placeholder },
                { value: 'adapting', label: 'Adapting' },
                { value: 'aligning', label: 'Aligning' },
                { value: 'deciding', label: 'Deciding' },
                { value: 'defining', label: 'Defining' },
                { value: 'coaching', label: 'Coaching' },
                { value: 'concluding', label: 'Concluding' },
                { value: 'context', label: 'Context' },
                { value: 'discovering', label: 'Discovering' },
                { value: 'reflecting', label: 'Reflecting' },
                { value: 'icebreaker', label: 'Icebreaking' },
                { value: 'improving', label: 'Improving' },
                { value: 'inspecting', label: 'Inspecting' },
                { value: 'instructing', label: 'Instructing' },
                { value: 'mapping', label: 'Mapping' },
                { value: 'sharing', label: 'Sharing' },
            ];
        }

        if(this.props.type == 'type'){
            options = [
                { value: '', label: placeholder },
                { value: 'liberating structure', label: 'Liberating Structure' },
                { value: 'pattern', label: 'Pattern' },
                { value: 'playbook', label: 'Playbook' },
                { value: 'tbr', label: 'TBR' },
                { value: 'thinking routine', label: 'Thinking Routine' },
                { value: 'management 3.0', label: 'Management 3.0' },
            ];
        }


        return (
            <div className={containerClassName}>
                <Dropdown options={options} className={inputClassName} controlClassName={controlClassName} onChange={this.handleChangeInput} value={this.state.selectedOption} placeholder={this.placeholder} />
            </div>
        );
    }
}
window.PlaybookFilter = PlaybookFilter;