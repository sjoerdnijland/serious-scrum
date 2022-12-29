import React from 'react';

class R2MJoin extends React.Component {
    constructor(props) {
        super(props);
        let random = Math.floor(Math.random() * 2);

        console.log(random)

        let passport = 'male';
        if(random){
            passport = 'female'
        }

        this.state = {
            value: null,
            passport: passport
        };
    }

    render() {


        let containerClassName = "homeR2M row join-"+this.state.passport;

        if(this.props.label){
            containerClassName += " hidden";
        }else if(this.props.module){
            if(this.props.module == 'backstage' || this.props.module == 'play_blanks'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";

        let messageClassName = 'hidden';
        let errorClassName = 'hidden';
        let errorMessage = 'Please complete the form...';

        let formClassName = "joinForm";

        if(this.props.submitResponse == "success"){
            formClassName = " hidden";
            errorClassName = " hidden";
            messageClassName = 'submitMessage'
        }else if(this.props.submitResponse == "error"){
            errorClassName = "errorMessage";
            errorMessage = this.props.submitData;
        }


        return (

            <div className={containerClassName} >
                <div className={bannerClassName}>
                    <h1>Join the Road!</h1>
                    <div className={'_pl40'}>
                        Master true Scrum and Agile leadership.<br/>
                        Experience how to foster a truly collaborative environment.<br/>
                        <br/> 
                        <div className={errorClassName}>
                            {errorMessage}
                        </div>
                        <div className={formClassName}>

                            <JoinFirstname firstname={this.props.firstname} functions={this.props.functions} />
                            <JoinLastname lastname={this.props.lastname} functions={this.props.functions} />
                            <JoinEmail email={this.props.email} functions={this.props.functions} />
                            <JoinLinkedIn linkedIn={this.props.linkedIn} functions={this.props.functions} />
                            <TravelgroupSelect functions={this.props.functions} travelgroups={this.props.travelgroups} travelgroup={this.props.travelgroup} formType="travelgroup"/>
                            <JoinTerms terms={this.props.terms} functions={this.props.functions} />
                            <JoinSubmitButton functions={this.props.functions} />

                        </div>
                        <div className={messageClassName}>
                            Thank you for joining the Road to Mastery!<br/><br/>
                            <img src='/images/adventure.jpg'/><br/><br/>
                            We will contact you to schedule the training.<br/>
                            The subscription will begin on the first day of your training.<br/><br/>
                            Would you like to learn more? <br/>
                            <a href="https://calendly.com/seriousscrum/intake" target="_blank">Schedule a 30-minute conversation here.</a><br/><br/>
                            <strong>Safe travels.</strong>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}
window.R2MJoin = R2MJoin;
