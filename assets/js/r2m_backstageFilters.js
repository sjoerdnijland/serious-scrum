import React from 'react';

class BackstageFilters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "filtersContainer";

        return (
            <div className={containerClassName}>
                <BackstageFilter functions={this.props.functions} value={this.props.travelgroup} type="travelgroup" travelgroups={this.props.travelgroups}/>
            </div>
        );
    }
}
window.BackstageFilters = BackstageFilters;

