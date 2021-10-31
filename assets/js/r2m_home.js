import React from 'react';

class R2MHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        let containerClassName = "homeR2M row home";
        let sponsorClassName = "sponsor";


        if(this.props.label){
            containerClassName += " hidden";
        }else if(this.props.module){
            if(this.props.module != 'home'){
                containerClassName += " hidden";
            }
        }

        const bannerClassName = "homeBanner";

        const sponsorImgSrc = "/images/sponsors.png";

        return (

                <div className={containerClassName}>
                    <div className={bannerClassName}>
                        <h1>Road to Mastery</h1>
                        <div className="title">
                            Master Scrum together with 500 co-active learning formats.
                            <ul>
                                <li>Weekly recurring virtual 2-hour training.</li>
                                <li>A 6-month journey off the beaten track;  </li>
                                <li>Share experiences and explore new ways.</li>
                                <li>Get ready to distinguish yourself preparing for <strong><a href="https://www.scrum.org/professional-scrum-master-iii-certification" target={"_blank"}>PSMIII</a></strong>.</li>
                            </ul>
                        </div>
                        <p className="_pt20 _pl40 buttonContainer joinButton _fl"><a className="button" id="requestInvite_button" href="#join">Join!</a></p>
                        <div className="mirozoom">
                            <div>
                                <img src={'/images/zoom.png'}/>
                            </div>
                            <div>
                                <img src={'/images/miro.png'}/>
                            </div>
                            <div>
                                <img src={'/images/slack.png'}/>
                            </div>
                        </div>
                    </div>

                </div>


        );
    }
}
window.R2MHome = R2MHome;