import React from 'react';

class HeaderMenuItem extends React.Component {
    constructor(props) {
        super(props);
        const target = this.props.target;
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
        let headerMenuItemClassName = "headerMenuItem";

        if (typeof this.props.hidden !== 'undefined') {
            if(this.props.hidden == true){
                headerMenuItemClassName += " hidden";
            }
        }

        return (
            <div className={headerMenuItemClassName}>
                <div onClick={this.handleClick}> {this.props.name}</div>
            </div>
        );
    }
}
window.HeaderMenuItem = HeaderMenuItem;