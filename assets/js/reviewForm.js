import React from 'react';

class ReviewForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "reviewFormContainer";

        if(!this.props.active){
            containerClassName += " hidden";
        }

        let messageClassName = 'hidden';
        let errorClassName = 'hidden';
        let errorMessage = '';

        let formClassName = "";

        if(this.props.submitResponse == "success"){
            formClassName = " hidden";
            errorClassName = " hidden";
            messageClassName = 'submitMessage'
        }else if(this.props.submitResponse == "error"){
            errorClassName = "errorMessage";
            errorMessage = this.props.submitData;
        }

        return (
            <div className={containerClassName}>
                <div className={errorClassName}>
                    {errorMessage}
                </div>
                <div className={formClassName}>
                    <ReviewSelect functions={this.props.functions} roles={this.props.roles} form="review"/>
                    <CategorySelect functions={this.props.functions} categories={this.props.categories} category={this.props.category} formType="review"/>
                    <SubmitButton functions={this.props.functions} style={'inverse'} article={this.props.article}/>
                </div>
                <div className={messageClassName}>
                    Thank you for reviewing this article!<br/>
                </div>
            </div>

        );
    }
}
window.ReviewForm = ReviewForm;