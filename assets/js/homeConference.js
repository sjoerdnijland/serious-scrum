import React from 'react';

class HomeConference extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeConference row";


        if(this.props.label){
            containerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={containerClassName}>
                    <div className={bannerClassName}>
                        <h1>Virtual Conference 2022</h1>
                        <div>
                            The Serious Scrum Virtual Conference 2022 Is Coming! And YOU will determine what we will do!
                        </div>
                        <p className="_pt20 _pl40 buttonContainer"><a className="button" id="requestInvite_button" href="https://medium.com/serious-scrum/the-serious-scrum-virtual-conference-2022-is-coming-2c69901593f0" target="_blank">Learn more!</a></p>
                    </div>
                </div>


        );
    }
}
window.HomeConference = HomeConference;