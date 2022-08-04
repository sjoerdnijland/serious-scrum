import React from 'react';

class JoinButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        if(this.props.registrationLink){
            window.open(this.props.registrationLink);
            return;
        }

        this.props.functions.goToJoin(this.props.direct);
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

        let joinText = "Join!"

        if(this.props.registrationLink){
            joinText += " ("+this.props.host+")";
        }

        return (
            <div className={containerClassName}>
                <div ref={btn => { this.btn = btn; }} onClick={this.handleClick} className={buttonClassName}>{joinText}</div>
            </div>
        );
    }
}
window.JoinButton = JoinButton;