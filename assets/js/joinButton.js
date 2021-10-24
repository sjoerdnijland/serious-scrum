import React from 'react';

class JoinButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.functions.setR2MMenu('join');
        this.props.functions.joinTravelgroup(this.props.travelgroup);
    }

    render() {

        let containerClassName = "buttonContainer joinButton " ;
        const buttonClassName = "button " ;

        if (typeof this.props.visible !== 'undefined') {
            if(!this.props.visible){
                containerClassName += " hidden";
            }
        }

        return (
            <div className={containerClassName}>
                <div ref={btn => { this.btn = btn; }} onClick={this.handleClick} className={buttonClassName}>Join!</div>
            </div>
        );
    }
}
window.JoinButton = JoinButton;