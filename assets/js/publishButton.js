import React from 'react';

class PublishButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.functions.toggleSubmitForm();
    }

    render() {

        let containerClassName = "buttonContainer publishButton " ;
        const buttonClassName = "button " ;

        if(this.props.user.username == ""){
            containerClassName += " hidden";
        }

        return (
            <div className={containerClassName}>
                <div ref={btn => { this.btn = btn; }}  onClick={this.handleClick} className={buttonClassName}>Publish!</div>
            </div>
        );
    }
}
window.PublishButton = PublishButton;