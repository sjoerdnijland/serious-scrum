import React from 'react';

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            buttonName: 'Submit!'
        }
    }

    handleClick(){

        this.btn.setAttribute("disabled", "disabled");

        if(!this.props.article){
            this.props.functions.submitArticle();
        }else{
            this.props.functions.reviewArticle(this.props.article);
        }

        this.setState({
            buttonName: 'Submitting...'
        });
        setTimeout(function() { //re-enable button after 3 seconds
            this.btn.removeAttribute("disabled");
            this.setState({
                buttonName: 'Submit!'
            });
        }.bind(this), 3000)

    }

    render() {

        const containerClassName = "buttonContainer publishButton " +this.props.style;
        const buttonClassName = "button _mr20 _mt20 " +this.props.style;



        return (
            <div className={containerClassName}>
                <button ref={btn => { this.btn = btn; }}  onClick={this.handleClick} className={buttonClassName}>{this.state.buttonName}</button>
            </div>
        );
    }
}
window.SubmitButton = SubmitButton;