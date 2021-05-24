import React from 'react';

class PageHero extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "pageHero";
        if(this.props.fill == 'full'){
            containerClassName += " full";
        }

        return (

            <div className={containerClassName}>
                <img src={this.props.url}/>
            </div>

        );
    }
}
window.PageHero = PageHero;
