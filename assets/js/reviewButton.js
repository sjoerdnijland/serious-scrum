import React from 'react';

class ReviewButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.functions.setReviewCategory(this.props.category);
        this.props.functions.toggleReviewForm(this.props.articleId);

    }

    render() {

        const containerClassName = "buttonContainer publishButton ";
        const buttonClassName = "button _mr20 _mt10 ";

        return (
            <div className={containerClassName}>
                <div ref={btn => { this.btn = btn; }}  onClick={this.handleClick} className={buttonClassName}>Review!</div>
            </div>
        );
    }
}
window.ReviewButton = ReviewButton;