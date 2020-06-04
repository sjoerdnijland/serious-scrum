import React from 'react';

class SubmitForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "submitFormContainer";

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
                    <FormInputLink submitUrl={this.props.submitUrl} functions={this.props.functions} />
                    <ReviewSelect functions={this.props.functions} roles={this.props.roles} form={this.props.form}/>
                    <CategorySelect functions={this.props.functions} categories={this.props.categories} category={this.props.category} formType="submit"/>
                    <SubmitButton functions={this.props.functions} style={'inverse'} article={false}/>
                </div>
                <div className={messageClassName}>
                    Thank you for submitting this article!<br/>It will be reviewed.
                </div>
            </div>

        );
    }
}
window.SubmitForm = SubmitForm;