import React from 'react';

class HeaderMenuItem extends React.Component {
    constructor(props) {
        super(props);
        let target = this.props.name.toLowerCase().replace(/\s/g, "");
        this.state = {
            target: target
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){

        this.props.functions.setR2MMenu(this.state.target);
    }


    render() {

        //active
        const headerMenuItemClassName = "headerMenuItem";

        return (
            <div className={headerMenuItemClassName}>
                <div onClick={this.handleClick}> {this.props.name}</div>
            </div>
        );
    }
}
window.HeaderMenuItem = HeaderMenuItem;