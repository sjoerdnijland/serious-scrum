import React from 'react';

class GuideItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "guideItem ";

        return (

            <div className={containerClassName}>
                <a href={this.props.link} target="_blank">{this.props.fullname}</a>
            </div>

        );
    }
}
window.GuideItem = GuideItem;
