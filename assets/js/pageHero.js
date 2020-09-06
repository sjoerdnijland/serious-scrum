import React from 'react';

class PageHero extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "pageHero";

        return (

            <div className={containerClassName}>
                <img src={this.props.url}/>
            </div>

        );
    }
}
window.PageHero = PageHero;
