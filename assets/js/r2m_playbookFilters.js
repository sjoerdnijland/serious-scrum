import React from 'react';

class PlaybookFilters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "filtersContainer";

        return (
            <div className={containerClassName}>
                <PlaybookFilter functions={this.props.functions} value={this.props.c} type="c"/>
                <PlaybookFilter functions={this.props.functions} value={this.props.type} type="type"/>
                <PlaybookFilter functions={this.props.functions} value={this.props.activity} type="activity"/>
            </div>
        );
    }
}
window.PlaybookFilters = PlaybookFilters;