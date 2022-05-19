import React from 'react';

class BackstageFilters extends React.Component {
    constructor(props) {
        super(props);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
    }

    toggleCheckBox(){
        this.props.functions.toggleIsContacted();
        return;
    };

    render() {

        let containerClassName = "filtersContainer";

        return (
            <div className={containerClassName}>
                <BackstageFilter functions={this.props.functions} value={this.props.data.travelgroup} type="travelgroup" travelgroups={this.props.travelgroups}/>
                <BackstageFilter functions={this.props.functions} value={this.props.data.program} type="program" />
                <BackstageFilter functions={this.props.functions} value={this.props.data.contacted} type="contacted" />
            </div>
        );
    }
}
window.BackstageFilters = BackstageFilters;

