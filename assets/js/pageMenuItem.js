import React from 'react';

class PageMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "pageMenuItem ";
        if(this.props.slug == this.props.active){
            containerClassName += "activeMenuItem";
        }

        return (

            <div className={containerClassName}>
                <a href={this.props.slug}>{this.props.title}</a>
            </div>

        );
    }
}
window.PageMenuItem = PageMenuItem;
